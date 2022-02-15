import { BaseManager } from '.';
import { Artist, Album, Track, RequestData, SpotifyTSError, type Client, type APIArtist, type APIAlbum, type APITrack } from '../lib';

export class ArtistsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'artists');
	}

	/**
	 * Get a Spotify Artist by their ID.
	 * @param {string} id: The ID of the artist.
	 * @returns {Promise<Artist>} The artist.
	 */
	public async fetch(id: string): Promise<Artist> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'fetch', 'id', 'string');

		const data = await super.get<APIArtist>(undefined, id);
		return new Artist(this.client, data);
	}

	/**
	 * Get several Spotify artists by their ID.
	 * @param {Array<String>} ids: The ID(s) of the artists.
	 * @returns {Promise<Artist[]>} An array of artists.
	 */
	public async fetchSeveral(ids: string[]): Promise<Artist[]> {
		if (!ids || !ids.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'fetchSeveral', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'fetchSeveral', 'ids', 'Array<String>');

		const query = new RequestData({ query: { ids: ids.join(',') } });
		const { artists } = await super.get<{ artists: APIArtist[] }>(undefined, undefined, query);

		const parsed = [];
		for (const artist of artists) parsed.push(new Artist(this.client, artist));

		return parsed;
	}

	/**
	 * Get the albums of an Spotify Artist.
	 * @param {string} id: The ID of the artist.
	 * @param {number} [limit]: The number of albums to return. Minimum: 1, Maximum: 50, defaults to 50.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that country will be returned, if not, the country of the user is used.
	 * @param {number} [offset]: The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 * @returns {Promise<Album[]>}: The albums of the artist.
	 */
	public async getAlbums(id: string, limit?: number, country?: string, offset?: number): Promise<Album[]> {
		limit ??= 50;
		offset ??= 0;

		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'getAlbums', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'getAlbums', 'id', 'string');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'getAlbums', 'country', 'string');
		if (typeof limit !== 'number') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'getAlbums', 'limit', 'number');
		if (typeof offset !== 'number') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'getAlbums', 'offset', 'number');

		const query = country ? new RequestData({ query: { limit, market: country, offset } }) : new RequestData({ query: { limit, offset } });
		const { items } = await super.get<{ items: APIAlbum[] }>(undefined, `${id}/albums`, query);

		const parsed = [];
		for (const item of items) parsed.push(new Album(this.client, item));

		return parsed;
	}

	/**
	 * Get the top tracks of a Spotify artist.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that country will be returned, if not, the country of the user is used.
	 * @returns {Promise<Track[]>} Array of top tracks.
	 */
	public async getTopTracks(id: string, country: string): Promise<Track[]> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'getTopTracks', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'getTopTracks', 'id', 'string');
		if (!country) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'getTopTracks', 'country');
		if (typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'getTopTracks', 'country', 'string');

		const query = country ? new RequestData({ query: { market: country } }) : undefined;
		const { tracks } = query
			? await super.get<{ tracks: APITrack[] }>(undefined, `${id}/top-tracks`, query)
			: await super.get<{ tracks: APITrack[] }>(undefined, `${id}/top-tracks`);

		const parsed = [];
		for (const track of tracks) parsed.push(new Track(this.client, track));

		return parsed;
	}

	/**
	 * Get information about artists similar to the given artist.
	 * @param {string} id: The ID of the artist.
	 * @returns {Promise<Artist[]>} Array of similar artists.
	 */
	public async getSimilar(id: string): Promise<Artist[]> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ArtistsManager', 'getSimilar', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ArtistsManager', 'getSimilar', 'id', 'string');

		const { artists } = await super.get<{ artists: APIArtist[] }>(undefined, `${id}/related-artists`);

		const parsed = [];
		for (const artist of artists) parsed.push(new Artist(this.client, artist));

		return parsed;
	}
}
