import { BaseManager } from './BaseManager';
import { Artist, Album, Track } from '../classes';
import { SpotifyTSError } from '../errors/SpotifyTSError';
import type { Client } from '../Client';
import type { APIArtist, APITrack, APISimplifiedAlbum } from '../types';

export class ArtistsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'artists');
	}

	/**
	 * Get a Spotify Artist by their ID.
	 * @param {string} id The ID of the artist.
	 */
	public async fetch(id: string): Promise<Artist> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'fetch', 'id');

		const data = await super.get<APIArtist>(null, id);

		return new Artist(this.client, data);
	}

	/**
	 * Get several Spotify artists by their ID.
	 * @param {Array<String>} ids The ID(s) of the artists.
	 */
	public async fetchSeveral(ids: string[]): Promise<Artist[]> {
		if (!ids || !ids.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'fetchSeveral', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'fetchSeveral', 'ids', 'Array<String>');

		const queryParams = new URLSearchParams({ ids: ids.join(',') });
		const { artists } = await super.get<{ artists: APIArtist[] }>(null, `?${queryParams.toString()}`);

		return artists.map((data) => new Artist(this.client, data));
	}

	/**
	 * Get the albums of an Spotify Artist.
	 * @param {string} id The ID of the artist.
	 * @param {string} [include_groups] A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned.
	 * @param {number} [limit] The number of albums to return. Minimum: 1, Maximum: 50, defaults to 50.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. If a market code is specified, only content that is available in that market will be returned, if not, the market of the user is used.
	 * @param {number} [offset] The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 */
	public async getAlbums(
		id: string,
		include_groups?: 'album' | 'single' | 'appears_on' | 'compilation',
		limit?: number,
		market?: string,
		offset?: number
	): Promise<APISimplifiedAlbum[]> {
		limit ??= 50;
		offset ??= 0;

		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'getAlbums', 'id');

		const queryParams = new URLSearchParams({ limit: limit.toString(), offset: offset.toString() });
		if (market) queryParams.append('market', market);
		if (include_groups) queryParams.append('include_groups', include_groups);

		const { items } = await super.get<{ items: APISimplifiedAlbum[] }>(null, `${id}/albums?${queryParams.toString()}`);

		return items.map((album) => new Album<true>(this.client, album));
	}

	/**
	 * Get the top tracks of a Spotify artist.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. If a market code is specified, only content that is available in that market will be returned, if not, the market of the user is used.
	 */
	public async getTopTracks(id: string, market: string): Promise<APITrack[]> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'getTopTracks', 'id');

		const queryParams = market ? new URLSearchParams({ market: market }) : null;
		const { tracks } = queryParams
			? await super.get<{ tracks: APITrack[] }>(null, `${id}/top-tracks?${queryParams.toString()}`)
			: await super.get<{ tracks: APITrack[] }>(null, `${id}/top-tracks`);

		return tracks.map((track) => new Track(this.client, track));
	}

	/**
	 * Get information about artists similar to the given artist.
	 * @param {string} id: The ID of the artist.
	 */
	public async getSimilar(id: string): Promise<Artist[]> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'getSimilar', 'id');

		const { artists } = await super.get<{ artists: APIArtist[] }>(null, `${id}/related-artists`);

		return artists.map((artist) => new Artist(this.client, artist));
	}
}
