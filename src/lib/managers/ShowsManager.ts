import { BaseManager } from '.';
import { Show, Episode, SpotifyTSError, type Client, type APIShow, type APIEpisode } from '..';

export class ShowsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'shows');
	}

	/**
	 * Get a show by its Spotify ID.
	 * @param {string} id The ID of the show.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. This is required as the Spotify API has a bug due to which a 404 error is returned if no market parameter is specified.
	 */
	public async fetch(id: string, market: string): Promise<Show> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ShowsManager', 'fetch', 'id');

		const queryParams = new URLSearchParams();
		if (market) queryParams.append('market', market);

		const data = await super.get<APIShow>(null, `${id}?${queryParams.toString()}`);

		return new Show(this.client, data);
	}

	/**
	 * Get several shows by their Spotify IDs.
	 * @param {Array<string>} ids The IDs of the shows.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. If specified, only the content available in this market will be returned, if not, the market of the current user will be used.
	 */
	public async fetchSeveral(ids: string[], market?: string): Promise<Show<true>[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ShowsManager', 'fetchSeveral', 'ids');

		const queryParams = new URLSearchParams({ ids: ids.join(',') });
		if (market) queryParams.append('market', market);

		const { shows } = await super.get<{ shows: APIShow[] }>(null, `?${queryParams.toString()}`);

		return shows.map((show) => new Show<true>(this.client, show));
	}

	/**
	 * Get the episodes of a show.
	 * @param {string} id: The Spotify ID of the show.
	 * @param {number} [limit] The maximum number of episodes to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {number} [offset] The index of the first episode to return. Default: 0 (the first object). Use with limit to get the next set of episodes.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. If specified, only the content available in this market will be returned, if not, the market of the current user will be used.
	 */
	public async getEpisodes(id: string, limit?: number, offset?: number, market?: string): Promise<Episode<true>[]> {
		limit ??= 20;
		offset ??= 0;

		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ShowsManager', 'getEpisodes', 'id');

		const queryParams = new URLSearchParams({ limit: limit.toString(), offset: offset.toString() });
		if (market) queryParams.append('market', market);

		const { items } = await super.get<{ items: APIEpisode[] }>(null, `${id}/episodes?${queryParams}`);

		return items.map((episode) => new Episode<true>(this.client, episode));
	}
}
