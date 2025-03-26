import { BaseManager } from '.';
import { Chapter, SpotifyTSError, type Client, type APIChapter } from '..';

export class ChaptersManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'chapters');
	}

	/**
	 * Get Spotify catalog information for a single chapter.
	 *
	 * **Note**:  Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
	 * @param {string} id The Spotify ID for the chapter.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. If specified, only the content available in this market will be returned, if not, the market of the current user will be used.
	 */
	public async fetch(id: string, market?: string): Promise<Chapter> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ChaptersManager', 'fetch', 'id');

		const queryParams = new URLSearchParams({ id });
		if (market) queryParams.append('market', market);

		const data = await this.get<APIChapter>(null, `?${queryParams.toString()}`);

		return new Chapter(this.client, data);
	}

	/**
	 * Get Spotify catalog information for multiple chapters based on their Spotify IDs.
	 *
	 * **Note**:  Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
	 * @param {string[]} ids The Spotify IDs for the chapters.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code. If specified, only the content available in this market will be returned, if not, the market of the current user will be used.
	 */
	public async fetchSeveral(ids: string[], market?: string): Promise<Chapter[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'ChaptersManager', 'fetchMany', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'ChaptersManager', 'fetchMany', 'ids', 'array');

		const queryParams = new URLSearchParams({ ids: ids.join(',') });
		if (market) queryParams.append('market', market);

		const data = await this.get<APIChapter[]>(null, `?${queryParams.toString()}`);

		return data.map((chapter) => new Chapter(this.client, chapter));
	}
}
