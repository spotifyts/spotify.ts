import { BaseManager } from '.';
import { APICategory, Category, SpotifyTSError, type Client, type FetchSeveralOptions } from '../../';

export class CategoriesManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'browse/categories');
	}

	/**
	 * Fetch a category, categories are used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
	 * @param {string} id The ID of the category.
	 * @param {string} [locale] The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 market code, joined by an underscore. For example: es_MX, meaning "Spanish (Mexico)". Provide this parameter if you want the category strings returned in a particular language. If not specified, the default, en_US (American English) will be used.
	 */
	public async fetch(id: string, locale?: string): Promise<Category> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'CategoriesManager', 'fetch', 'id');

		const queryParams = new URLSearchParams({ id });
		if (locale) queryParams.append('locale', locale);

		const data = await super.get<APICategory>(null, `?${queryParams.toString()}`);

		return new Category(this.client, data);
	}

	/**
	 * Fetch several categories.
	 * @param {FetchSeveralOptions} [options] The options for fetching categories.
	 */
	public async fetchSeveral(options?: FetchSeveralOptions): Promise<Category[]> {
		if (options && typeof options !== 'object')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetchSeveral', 'options', 'object');

		const queryParams = new URLSearchParams();

		if (options?.locale) queryParams.append('locale', options.locale);
		if (options?.limit) queryParams.append('limit', options.limit.toString());
		if (options?.offset) queryParams.append('offset', options.offset.toString());

		const {
			categories: { items }
		} = await super.get<{ categories: { items: APICategory[] } }>(null, `?${queryParams.toString()}`);

		return items.map((data) => new Category(this.client, data));
	}
}
