import { BaseManager } from '.';
import { SpotifyTSError, Audiobook, RequestData, type Client, type APIAudiobook } from '../lib';

export class AudiobooksManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'audiobooks');
	}

	/**
	 * Get Spotify catalog information for a single audiobook.
	 * **Note: Audiobooks are only available for the US market.**
	 * @param {string} id: The Spotify ID for the audiobook.
	 * @param {string} [country]: The ISO 3166-1 alpha-2 country code. TIf specified, only the content available in this country will be returned, if not, the country of the current user will be used.
	 * @returns {Promise<Audiobook>} The audiobook.
	 **/
	public async fetch(id: string, country?: string): Promise<Audiobook> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AudiobooksManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AudiobooksManager', 'fetch', 'id', 'string');

		const data = await super.get<APIAudiobook>(undefined, id, country ? new RequestData({ query: { market: country } }) : undefined);
		return new Audiobook(this.client, data);
	}

	/**
	 * Fetch several audiobooks by their Spotify IDs.
	 * @param {Array<string>} ids: The Spotify IDs of the audiobooks.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code, if specified, returns only the content available in this country. If this argument is not specified, the country code of the user account will be used.
	 * @returns {Promise<Audiobook[]>} Array of Episode objects.
	 */
	public async fetchSeveral(ids: string[], country?: string): Promise<Audiobook[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AudiobooksManager', 'fetch', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AudiobooksManager', 'fetch', 'ids', 'Array<string>');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AudiobooksManager', 'fetch', 'country', 'string');

		const query = country
			? new RequestData({ query: { ids: ids.join(','), market: country } })
			: new RequestData({ query: { ids: ids.join(',') } });
		const { audiobooks } = await super.get<{ audiobooks: APIAudiobook[] }>(undefined, undefined, query);
		const parsed = [];
		for (const audiobook of audiobooks) parsed.push(new Audiobook(this.client, audiobook));

		return parsed;
	}
}
