import { SpotifyTSError, baseApiUrl, type Client, type RequestMethodTypes, RequestData } from '../';
import phin, { IJSONResponse } from 'phin';

export class APIRequest {
	/**
	 * The client that instantiated this request.
	 */
	public client: Client;

	/**
	 * The base URL of the API.
	 */
	public baseApiUrl: string;

	/**
	 * The HTTP method of the request.
	 */
	public method: RequestMethodTypes;

	/**
	 * The API route for the request.
	 */
	public route: string;

	/**
	 * The path for the request.
	 */
	public path?: string;

	/**
	 * Additional data for the request, such as the query parameters and body.
	 */
	public data?: RequestData<unknown, unknown>;

	public constructor(client: Client, method: RequestMethodTypes, route: string, path?: string, data?: RequestData<unknown, unknown>) {
		this.client = client;
		this.baseApiUrl = baseApiUrl;
		this.method = method;

		this.route = route;
		this.path = `${this.baseApiUrl}/${this.route}`;
		if (path) this.path += `/${path}`;

		this.data = data;

		if (data && data.query && typeof data.query === 'object') {
			const queryString = Object.entries(data.query)
				.filter(([, value]) => value !== null && value !== undefined)
				.map(([key, value]) => `${key}=${value}`)
				.join('&');

			this.path += `?${queryString}`;
		}
	}

	/**
	 * Creates a request to the API.
	 * @returns {Promise<IJSONResponse<unknown>>} The response from the API.
	 */
	public async make() {
		if (!this.client.options.accessToken) throw new SpotifyTSError('CLIENT_MISSING_ACCESS_TOKEN');

		const options = this.makeOptions();
		console.log(options);
		return phin({ ...options }) as Promise<IJSONResponse<unknown>>;
	}

	private makeOptions() {
		const { accessToken } = this.client.options;

		const options: RequestOptions = {
			url: this.path!,
			method: this.method,
			parse: 'json',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		};

		if (this.data?.body) {
			options.data = JSON.stringify(this.data.body);
		}

		return options;
	}
}

export interface RequestOptions {
	url: string;
	method: RequestMethodTypes;
	parse: 'json';
	headers: Record<string, string>;
	data?: unknown;
}
