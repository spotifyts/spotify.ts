import { BaseManager } from '.';
import { Playlist, APIPlaylist, RequestData, SpotifyTSError, type Client } from '../lib';

export class PlaylistsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'playlists');
	}

	/**
	 * Fetch a playlist using its Spotify ID.
	 * @param {string} id: The Spotify ID of the playlist.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If specified, only the content available in this country will be returned, if not, the country of the current user will be used.
	 * @returns {Promise<Playlist>} Playlist object
	 */
	public async fetch(id: string, country?: string): Promise<Playlist> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'PlaylistsManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'PlaylistsManager', 'fetch', 'id', 'string');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'PlaylistsManager', 'fetch', 'country', 'string');

		const query = country ? new RequestData({ query: { market: country } }) : undefined;
		const data = query ? await super.get<APIPlaylist>(undefined, id, query) : await super.get<APIPlaylist>(undefined, id);

		return new Playlist(this.client, data);
	}
}
