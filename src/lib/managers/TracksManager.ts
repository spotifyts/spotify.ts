import { BaseManager } from './BaseManager';
import { Track } from '../classes';
import { SpotifyTSError } from '../errors/SpotifyTSError';
import type { Client } from '../Client';
import type { APITrack } from '../types';

export class TracksManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'tracks');
	}

	/**
	 * Fetch a Spotify Track by its ID.
	 * @param {string} id The Spotify ID of the track.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code, if specified,  returns only the content available in this market. If this argument is not specified, the market code of the user account will be used.
	 */
	public async fetch(id: string, market?: string): Promise<Track> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'TracksManager', 'fetch', 'id');

		const queryParams = new URLSearchParams();
		if (market) queryParams.append('market', market);

		const data = await super.get<APITrack>(null, `${id}?${queryParams.toString()}`);

		return new Track(this.client, data);
	}

	/**
	 * Fetch multiple Spotify Tracks by their IDs.
	 * @param {string[]} ids The Spotify IDs of the tracks.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code, if specified,  returns only the content available in this market. If this argument is not specified, the market code of the user account will be used.
	 */
	public async fetchSeveral(ids: string[], market?: string): Promise<Track[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'TracksManager', 'fetchSeveral', 'ids');

		const queryParams = new URLSearchParams({ ids: ids.join(',') });
		if (market) queryParams.append('market', market);

		const { tracks } = await super.get<{ tracks: APITrack[] }>(null, `?${queryParams.toString()}`);

		return tracks.map((data) => new Track(this.client, data));
	}
}
