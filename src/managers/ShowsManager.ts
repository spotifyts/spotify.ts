import { BaseManager } from '.';
import { Show, Episode, RequestData, SpotifyTSError, type Client, type APIShow, type APIEpisode } from '../lib';

export class ShowsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'shows');
	}

	/**
	 * Get a show by its Spotify ID.
	 * @param {string} id: The ID of the show.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. This is required as the Spotify API has a bug due to which a 404 error is returned if no country parameter is specified.
	 * @returns {Promise<Show>} Show object.
	 */
	public async fetch(id: string, country: string): Promise<Show> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ShowsManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ShowsManager', 'fetch', 'id', 'string');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ShowsManager', 'fetch', 'country', 'string');

		const query = country ? new RequestData({ query: { market: country } }) : undefined;
		const data = query ? await super.get<APIShow>(undefined, id, query) : await super.get<APIShow>(undefined, id);

		return new Show(this.client, data);
	}

	/**
	 * Get several shows by their Spotify IDs.
	 * @param {Array<string>} ids: The IDs of the shows.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If specified, only the content available in this country will be returned, if not, the country of the current user will be used.
	 * @returns {Promise<Show[]>} Array of Show objects.
	 */
	public async fetchSeveral(ids: string[], country?: string): Promise<Show[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ShowsManager', 'fetchSeveral', 'ids');
		if (ids.length > 50) throw new SpotifyTSError('MANAGER_ARGUMENT_OUT_OF_RANGE', 'ShowsManager', 'fetchSeveral', 'ids', 50);
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ShowsManager', 'fetchSeveral', 'ids', 'Array<string>');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ShowsManager', 'fetchSeveral', 'country', 'string');

		const query = country
			? new RequestData({ query: { ids: ids.join(','), market: country } })
			: new RequestData({ query: { ids: ids.join(',') } });
		const { shows } = query
			? await super.get<{ shows: APIShow[] }>(undefined, undefined, query)
			: await super.get<{ shows: APIShow[] }>(undefined, undefined, query);

		const parsed = [];
		for (const show of shows) parsed.push(new Show(this.client, show));

		return parsed;
	}

	/**
	 * Get the episodes of a show.
	 * @param {string} id: The Spotify ID of the show.
	 * @param {number} [limit]: The maximum number of episodes to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {number} [offset]: The index of the first episode to return. Default: 0 (the first object). Use with limit to get the next set of episodes.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If specified, only the content available in this country will be returned, if not, the country of the current user will be used.
	 * @returns {Promise<Episode[]>} Array of Episode objects.
	 */
	public async getEpisodes(id: string, limit?: number, offset?: number, country?: string): Promise<Episode[]> {
		limit ??= 20;
		offset ??= 0;

		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ShowsManager', 'getEpisodes', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ShowsManager', 'getEpisodes', 'id', 'string');
		if (typeof limit !== 'number') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ShowsManager', 'getEpisodes', 'limit', 'number');
		if (typeof offset !== 'number') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ShowsManager', 'getEpisodes', 'offset', 'number');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ShowsManager', 'getEpisodes', 'country', 'string');

		const query = country ? new RequestData({ query: { market: country, limit, offset } }) : new RequestData({ query: { limit, offset } });
		const { items } = await super.get<{ items: APIEpisode[] }>(undefined, `${id}/episodes`, query);

		const parsed = [];
		for (const item of items) parsed.push(new Episode(this.client, item));
		return parsed;
	}
}
