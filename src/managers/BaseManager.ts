import { RequestData, RequestMethods, type Client } from '../lib';

export class BaseManager {
	/**
	 * The client that instantiated this manager.
	 */
	public client!: Client;

	/**
	 * The name of this manager, used for making requests to the API.
	 */
	public route!: string;

	public constructor(client: Client, route: string) {
		Object.defineProperties(this, { client: { value: client, enumerable: false }, route: { value: route, enumerable: false } });
	}

	/**
	 * Makes a GET request to the API.
	 * @param {string} [route] The route (if any) to append to the request URL. If not provided, the route provided when creating a new manager will be used.
	 * @param {string} [path]: The path (if any) to append to the request URL.
	 * @param {RequestData<unknown, unknown>} [data]: Any extended data, such as query and body.
	 */
	protected get<T>(route?: string, path?: string, data?: RequestData<unknown, unknown>) {
		return this.client.rest.request<T>(RequestMethods.Get, route ?? this.route, path, data);
	}
}
