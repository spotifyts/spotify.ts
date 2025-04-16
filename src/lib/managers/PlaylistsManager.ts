import { BaseManager } from './BaseManager';
import { Playlist } from '../classes/Playlist';
import { SpotifyTSError } from '../errors/SpotifyTSError';
import type { Client } from '../Client';
import type { APIPlaylist, APIImage, APISimplifiedPlaylist } from '../types';

export class PlaylistsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'playlists');
	}

	/**
	 * Fetch a playlist using its Spotify ID.
	 * @param {string} id The Spotify ID of the playlist.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. If specified, only the content available in this market will be returned, if not, the market of the current user will be used.
	 * @param {string} [fields] Filters for the query: a comma-separated list of the fields to return. For example, to get just the playlist's description and URI: fields=description,uri. Refer to https://developer.spotify.com/documentation/web-api/reference/get-playlist for more information
	 */
	public async fetch(id: string, market?: string, fields?: string) {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'PlaylistsManager', 'fetch', 'id');

		const queryParams = new URLSearchParams();
		if (market) queryParams.append('market', market);
		if (fields) queryParams.append('fields', fields);

		const data = await super.get<APIPlaylist>(null, `${id}/?${queryParams.toString()}`);

		return new Playlist(this.client, data);
	}

	/**
	 * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
	 * @param {string} locale The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code, joined by an underscore. For example: es_MX, meaning "Spanish (Mexico)". Provide this parameter if you want the category strings returned in a particular language. If not specified, the default, en_US (American English) will be used.
	 * @param {number} limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {number} offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 */
	public async fetchFeatured(locale?: string, limit?: number, offset?: number) {
		const queryParams = new URLSearchParams();
		if (locale) queryParams.append('locale', locale);
		if (limit) queryParams.append('limit', limit.toString());
		if (offset) queryParams.append('offset', offset.toString());

		const data: {
			message: string;
			playlists: { items: APISimplifiedPlaylist[] };
		} = await super.get('browse/featured-playlists', queryParams ? `?${queryParams.toString()}` : null);

		return {
			message: data.message,
			playlists: data.playlists.items.map((playlist) => new Playlist<true>(this.client, playlist))
		};
	}

	/**
	 * Get the current image associated with a specific playlist.
	 * @param {string} id The Spotify ID of the playlist.
	 */
	public async fetchCoverImage(id: string) {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'PlaylistsManager', 'fetchCoverImage', 'id');

		const queryParams = new URLSearchParams({ id });
		const data = await super.get<APIImage>(null, `?${queryParams.toString()}/images`);

		return data;
	}
}
