import { BaseManager } from '.';
import { Episode, SpotifyTSError, type Client, type APIEpisode } from '..';

export class EpisodesManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'episodes');
	}

	/**
	 * Fetch an episode by its Spotify ID.
	 * @param {string} id The Spotify ID of the episode.
	 * @param {string} market The ISO 3166-1 alpha-2 market code. This parameter is required due to a bug with the Spotify API not returning a valid response without the market parameter. See more here: https://stackoverflow.com/a/70476680/14950646
	 */
	public async fetch(id: string, market: string): Promise<Episode> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'EpisodesManager', 'fetch', 'id');

		const queryParams = new URLSearchParams();
		if (market) queryParams.append('market', market);

		const data = await super.get<APIEpisode>(null, `${id}?${queryParams.toString()}`);

		return new Episode(this.client, data);
	}

	/**
	 * Fetch several episodes by their Spotify IDs.
	 * @param {Array<string>} ids The Spotify IDs of the episodes.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code, if specified,  returns only the content available in this market. If this argument is not specified, the market code of the user account will be used.
	 */
	public async fetchSeveral(ids: string[], market?: string): Promise<Episode[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'EpisodesManager', 'fetch', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'EpisodesManager', 'fetch', 'ids', 'Array<string>');

		const queryParams = new URLSearchParams({ ids: ids.join(',') });
		if (market) queryParams.append('market', market);

		const data = await super.get<APIEpisode[]>(null, `?${queryParams.toString()}`);

		return data.map((d) => new Episode(this.client, d));
	}
}
