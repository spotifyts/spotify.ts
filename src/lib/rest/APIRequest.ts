import { SpotifyTSError } from '../errors/SpotifyTSError';
import type { Client } from '../Client';
import { baseApiUrl, type RequestMethodTypes } from '../Constants';

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
	 * The URL for the request.
	 */
	public url: string;

	/**
	 * Additional data for the request, such as the query parameters and body.
	 */
	public data?: RequestInit;

	public constructor(client: Client, route: string, method: RequestMethodTypes, path?: string | null, data?: RequestInit) {
		this.client = client;
		this.baseApiUrl = baseApiUrl;
		this.method = method;

		this.route = route;
		this.url = `${this.baseApiUrl}/${this.route}`;
		if (path) this.url += `/${path}`;

		this.data = data;
	}

	/**
	 * Creates a request to the API.
	 */
	public async make() {
		if (!this.client.options.accessToken) throw new SpotifyTSError('CLIENT_MISSING_ACCESS_TOKEN');

		const options = this.makeOptions();

		return fetch(options.url, { ...options }) as Promise<Response>;
	}

	private makeOptions() {
		const { accessToken } = this.client.options;

		const options: RequestOptions = {
			url: this.url,
			method: this.method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		};

		return options;
	}
}

export interface RequestOptions extends RequestInit {
	url: string;
}
