import { BaseManager } from '.';
import { SpotifyTSError, Audiobook, type Client, type APIAudiobook } from '..';

export class AudiobooksManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'audiobooks');
	}

	/**
	 * Get Spotify catalog information for a single audiobook.
	 *
	 * **Note: Audiobooks are only available for the US, UK, Canada, Ireland, New Zealand and Australia markets.**
	 * @param {string} id The Spotify ID for the audiobook.
	 * @param {string} [market] The ISO 3166-1 alpha-2 market code. If specified, only the content available in this market will be returned, if not, the market of the current user will be used.
	 **/
	public async fetch(id: string, market?: string): Promise<Audiobook> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AudiobooksManager', 'fetch', 'id');

		const queryParams = new URLSearchParams();
		if (market) queryParams.append('market', market);
		const data = await super.get<APIAudiobook>(null, `${id}?${queryParams.toString()}`);

		return new Audiobook(this.client, {
			...data,
			chapters: data?.chapters?.items
		});
	}

	/**
	 * Fetch several audiobooks by their Spotify IDs.
	 * @param {Array<string>} ids The Spotify IDs of the audiobooks.
	 * @param {string} [market] An ISO 3166-1 alpha-2 market code, if specified, returns only the content available in this market. If this argument is not specified, the market code of the user account will be used.
	 */
	public async fetchSeveral(ids: string[], market?: string): Promise<Audiobook[]> {
		if (!ids || !ids?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'AudiobooksManager', 'fetch', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'AudiobooksManager', 'fetch', 'ids', 'Array<string>');

		const queryParams = new URLSearchParams({ ids: ids.join(',') });
		if (market) queryParams.append('market', market);
		const { audiobooks } = await super.get<{ audiobooks: APIAudiobook[] }>(null, `?${queryParams.toString()}`);

		return audiobooks.map(
			(data) =>
				new Audiobook(this.client, {
					...data,
					chapters: data?.chapters?.items
				})
		);
	}
}
