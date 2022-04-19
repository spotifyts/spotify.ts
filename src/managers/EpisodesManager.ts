import { BaseManager } from '.';
import { Episode, RequestData, SpotifyTSError, type Client, type APIEpisode } from '../lib';

export class EpisodesManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'episodes');
	}

	/**
	 * Fetch an episode by its Spotify ID.
	 * @param {string} id: The Spotify ID of the episode.
	 * @param {string} country: The ISO 3166-1 alpha-2 country code. This parameter is required due to a bug with the Spotify API not returning a valid response without the country parameter. See more here: https://stackoverflow.com/a/70476680/14950646
	 * @returns {Promise<Episode>} Episode object.
	 */
	public async fetch(id: string, country: string): Promise<Episode> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'EpisodesManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'EpisodesManager', 'fetch', 'id', 'string');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'EpisodesManager', 'fetch', 'country', 'string');

		const query = country ? new RequestData({ query: { market: country } }) : undefined;
		const data = query ? await super.get<APIEpisode>(undefined, id, query) : await super.get<APIEpisode>(undefined, id);

		return new Episode(this.client, data);
	}

	/**
	 * Fetch several episodes by their Spotify IDs.
	 * @param {Array<string>} ids: The Spotify IDs of the episodes.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code, if specified,  returns only the content available in this country. If this argument is not specified, the country code of the user account will be used.
	 * @returns {Promise<Episode[]>} Array of Episode objects.
	 */
	public async fetchSeveral(ids: string[], country?: string): Promise<Episode[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'EpisodesManager', 'fetch', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'EpisodesManager', 'fetch', 'ids', 'Array<string>');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'EpisodesManager', 'fetch', 'country', 'string');

		const query = country
			? new RequestData({ query: { ids: ids.join(','), market: country } })
			: new RequestData({ query: { ids: ids.join(',') } });
		const data = query ? await super.get<APIEpisode[]>(undefined, undefined, query) : await super.get<APIEpisode[]>(undefined, undefined, query);

		const parsed = [];
		for (const episode of data) parsed.push(new Episode(this.client, episode));

		return parsed;
	}
}
