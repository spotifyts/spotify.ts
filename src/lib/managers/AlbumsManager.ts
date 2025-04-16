import { BaseManager } from './BaseManager';
import { Album, Track } from '../classes';
import { Client } from '../Client';
import { SpotifyTSError } from '../errors/SpotifyTSError';
import type { APIAlbum, APITrack, APISimplifiedAlbum } from '../types';

export class AlbumsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'albums');
	}

	/**
	 * Returns information for a Spotify album.
	 * @param {string} id The Spotify ID of the album.
	 * @param {string} [market] The ISO 3166-1 alpha-2 market code, if specified, returns only the content available in this market. If this argument is not specified, the market code of the user account will be used.
	 */
	public async fetch(id: string, market?: string): Promise<Album> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AlbumsManager', 'fetch', 'id');

		const data = market ? await super.get<APIAlbum>(null, `${id}?market=${market}`) : await super.get<APIAlbum>(null, id);

		return new Album(this.client, data);
	}

	/**
	 * Fetch multiple Spotify Albums.
	 * @param {Array<string>} ids An array containing the ids to fetch. Maximum allowed is 20.
	 * @param {string} [market] The ISO 3166-1 alpha-2 market code, if specified, returns only the content available in this market. If this argument is not specified, the market code of the user account will be used.
	 */
	public async fetchSeveral(ids: string[], market?: string): Promise<Album[]> {
		if (!ids || !ids.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AlbumsManager', 'fetchSeveral', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'fetchSeveral', 'ids', 'Array<string>');

		const queryParams = new URLSearchParams({ ids: ids.join(',') });
		if (market) queryParams.append('market', market);

		const { albums } = await super.get<{ albums: APIAlbum[] }>(null, `?${queryParams.toString()}`);

		return albums.map((data) => new Album(this.client, data));
	}

	/**
	 * Get information about the tracks of an Album. Optional arguments can be used to limit the number of tracks returned.
	 * @param {string} id The ID of the album.
	 * @param {number} [limit] The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. Supply this parameter to limit the response to one particular geographical market.
	 * @param {number} [offset] The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 */
	public async getTracks(id: string, limit?: number, market?: string, offset?: number): Promise<Track[]> {
		limit ??= 20;
		offset ??= 0;

		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AlbumsManager', 'getTracks', 'id');

		const queryParams = new URLSearchParams({ limit: limit.toString(), offset: offset.toString() });
		if (market) queryParams.append('market', market);
		const { items } = await super.get<{ items: APITrack[] }>(null, `${id}/tracks?${queryParams.toString()}`);

		return items.map((track) => new Track(this.client, track));
	}

	/**
	 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. Supply this parameter to limit the response to one particular geographical market.
	 * @param {number} [limit] The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {number} [offset] The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 */
	public async getNewReleases(market?: string, limit?: number, offset?: number): Promise<APISimplifiedAlbum[]> {
		limit ??= 20;
		offset ??= 0;

		const queryParams = new URLSearchParams({ limit: limit.toString(), offset: offset.toString() });
		if (market) queryParams.append('market', market);

		const { albums } = await super.get<{ albums: { items: APISimplifiedAlbum[] } }>('browse/new-releases', `?${queryParams.toString()}`);

		return albums.items.map((album) => new Album<true>(this.client, album));
	}
}
