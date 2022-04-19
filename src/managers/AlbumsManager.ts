import { BaseManager } from '.';
import { RequestData, Album, Track, SpotifyTSError, type Client, type APIAlbum, type APITrack } from '../lib';

export class AlbumsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'albums');
	}

	/**
	 * Returns information for a Spotify album.
	 * @param {string} id: The Spotify ID of the album.
	 * @param {string} [country]: The ISO 3166-1 alpha-2 country code, if specified, returns only the content available in this country. If this argument is not specified, the country code of the user account will be used.
	 * @returns {Promise<Album>}: An album object.
	 */
	public async fetch(id: string, country?: string): Promise<Album> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AlbumsManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'fetch', 'id', 'string');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'fetch', 'AlbumsManager', 'country', 'string');

		const data = country
			? await super.get<APIAlbum>(undefined, id, new RequestData({ query: { market: country } }))
			: await super.get<APIAlbum>(undefined, id);
		return new Album(this.client, data);
	}

	/**
	 * Fetch multiple Spotify Albums.
	 * @param {Array<string>} ids: An array containing the ids to fetch. Maximum allowed is 20.
	 * @param {string} [country]: The ISO 3166-1 alpha-2 country code, if specified, returns only the content available in this country. If this argument is not specified, the country code of the user account will be used.
	 * @returns {Promise<Album[]>}: An array of Album objects.
	 */
	public async fetchSeveral(ids: string[], country?: string): Promise<Album[]> {
		if (!ids || !ids.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AlbumsManager', 'fetchSeveral', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'fetchSeveral', 'ids', 'Array<string>');
		if (ids.length > 20) throw new SpotifyTSError('MANAGER_ARGUMENT_OUT_OF_RANGE', 'AlbumsManager', 'fetchSeveral', 'ids', 20);
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'fetchSeveral', 'country', 'string');

		const query = country
			? new RequestData({ query: { ids: ids.join(','), market: country } })
			: new RequestData({ query: { ids: ids.join(',') } });

		const { albums } = await super.get<{ albums: APIAlbum[] }>(undefined, undefined, query);
		const parsed = [];

		for (const album of albums) parsed.push(new Album(this.client, album));

		return parsed;
	}

	/**
	 * Get information about the tracks of an Album. Optional arguments can be used to limit the number of tracks returned.
	 * @param {string} id: The ID of the album.
	 * @param {number} [limit]: The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. Supply this parameter to limit the response to one particular geographical market.
	 * @param {number} [offset]: The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 * @returns {Promise<Track[]>}: Array of Track objects
	 */
	public async getTracks(id: string, limit?: number, country?: string, offset?: number): Promise<Track[]> {
		limit ??= 20;
		offset ??= 0;

		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AlbumsManager', 'getTracks', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'getTracks', 'id', 'string');
		if (typeof limit !== 'number') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'getTracks', 'limit', 'number');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'getTracks', 'market', 'string');
		if (typeof offset !== 'number') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'getTracks', 'offset', 'number');

		const query = country ? new RequestData({ query: { limit, market: country, offset } }) : new RequestData({ query: { limit, offset } });
		const { items } = await super.get<{ items: APITrack[] }>(undefined, `${id}/tracks`, query);

		const parsed = [];
		for (const item of items) parsed.push(new Track(this.client, item));

		return parsed;
	}

	/**
	 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. Supply this parameter to limit the response to one particular geographical market.
	 * @param {number} [limit]: The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {number} [offset]: The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 * @returns {Promise<Album[]>} Array of Album objects
	 */
	public async getNewReleases(country?: string, limit?: number, offset?: number): Promise<Album[]> {
		limit ??= 20;
		offset ??= 0;

		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'getNewReleases', 'country', 'string');
		if (typeof limit !== 'number')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'getNewReleases', 'limit', 'number');
		if (typeof offset !== 'number')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AlbumsManager', 'getNewReleases', 'offset', 'number');

		const query = country ? new RequestData({ query: { country, limit, offset } }) : new RequestData({ query: { limit, offset } });
		const { albums } = await super.get<{ albums: { items: APIAlbum[] } }>('browse/new-releases', undefined, query);

		const parsed = [];
		for (const album of albums.items) parsed.push(new Album(this.client, album));

		return parsed;
	}
}
