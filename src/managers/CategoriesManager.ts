import { BaseManager } from '.';
import { APICategory, Category, RequestData, SpotifyTSError, type Client, type FetchSeveralOptions } from '../';

export class CategoriesManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'browse/categories');
	}

	/**
	 * Fetch a category, categories are used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
	 * @param {string} id: The ID of the category.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If specified, only the content available in this country will be returned, if not, the country of the current user will be used.
	 * @param {string} [locale]: The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code, joined by an underscore. For example: es_MX, meaning "Spanish (Mexico)". Provide this parameter if you want the category strings returned in a particular language. If not specified, the default, en_US (American English) will be used.
	 * @returns {Promise<Category>} The category
	 */
	public async fetch(id: string, country?: string, locale?: string): Promise<Category> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'CategoriesManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetch', 'id', 'string');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetch', 'country', 'string');
		if (locale && typeof locale !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetch', 'locale', 'string');

		const query = country && locale ? new RequestData({ query: { country, locale } }) : undefined;
		const data = country && locale ? await super.get<APICategory>(undefined, id, query) : await super.get<APICategory>(undefined, id);

		return new Category(this.client, data);
	}

	/**
	 * Fetch several categories.
	 * @param {FetchSeveralOptions} [options]: The options for fetching categories.
	 * @returns {Promise<Category[]>} The categories.
	 */
	public async fetchSeveral(options?: FetchSeveralOptions): Promise<Category[]> {
		const { query } = new RequestData({ query: {} });

		if (options) {
			if (typeof options !== 'object')
				throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetchSeveral', 'options', 'object');
			if (options.country && typeof options.country !== 'string')
				throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetchSeveral', 'options.country', 'string');
			if (options.locale && typeof options.locale !== 'string')
				throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetchSeveral', 'options.locale', 'string');
			if (options.limit && typeof options.limit !== 'number')
				throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetchSeveral', 'options.limit', 'number');
			if (options.offset && typeof options.offset !== 'number')
				throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'CategoriesManager', 'fetchSeveral', 'options.offset', 'number');
		}

		const {
			categories: { items }
		} = await super.get<{ categories: { items: APICategory[] } }>(
			undefined,
			undefined,
			options ? new RequestData({ query: { ...query, ...options } }) : undefined
		);

		const parsed = [];
		for (const item of items) parsed.push(new Category(this.client, item));

		return parsed;
	}
}
