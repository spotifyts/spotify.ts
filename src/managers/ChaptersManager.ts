import { BaseManager } from '.';
import { Chapter, RequestData, SpotifyTSError, type Client, type APIChapter } from '../lib';

export class ChaptersManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'chapters');
	}

	/**
	 * Get Spotify catalog information for a single chapter.
	 * **Note**: Chapters are only available in the US market.
	 * @param {string} id: The Spotify ID for the chapter.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If specified, only the content available in this country will be returned, if not, the country of the current user will be used.
	 * @returns {Promise<Chapter>} Chapter object.
	 */
	public async fetch(id: string, country?: string): Promise<Chapter> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ChaptersManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ChaptersManager', 'fetch', 'id', 'string');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ChaptersManager', 'fetch', 'country', 'string');

		const query = new RequestData({ query: { market: country } });
		const data = await this.get<APIChapter>(undefined, id, query);

		return new Chapter(this.client, data);
	}

	/**
	 * Get Spotify catalog information for multiple chapters based on their Spotify IDs.
	 * **Note**: Chapters are only available in the US market.
	 * @param {string[]} ids: The Spotify IDs for the chapters.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If specified, only the content available in this country will be returned, if not, the country of the current user will be used.
	 * @returns {Promise<Chapter[]>} Array of chapter objects.
	 */
	public async fetchSeveral(ids: string[], country?: string): Promise<Chapter[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ChaptersManager', 'fetchMany', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ChaptersManager', 'fetchMany', 'ids', 'array');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ChaptersManager', 'fetchMany', 'country', 'string');

		const query = new RequestData({ query: { market: country } });
		const data = await this.get<APIChapter[]>(undefined, ids.join(), query);

		return data.map((chapter) => new Chapter(this.client, chapter));
	}
}
