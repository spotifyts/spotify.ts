import { Collection } from '@discordjs/collection';
import { APIRequest, RequestHandler } from '.';
import type { Client, RequestData, RequestMethodTypes } from '../';

export class RestManager {
	/**
	 * The client that instantiated this manager.
	 * @type {Client}
	 */
	public client: Client;

	/**
	 * The request handler collection.
	 * @type {Collection<string, RequestHandler>}
	 */
	public requestHandlers: Collection<string, RequestHandler>;

	public constructor(client: Client) {
		this.client = client;
		this.requestHandlers = new Collection();
	}

	/**
	 * Makes a request to the API.
	 * @param {RequestMethodTypes} method: The HTTP method of the request.
	 * @param {string} route: The API route for the request.
	 * @param {string} [path]: The path for the request.
	 * @param {RequestData<unknown, unknown>} [data]: Additional data for the request, such as the query parameters and body.
	 * @returns {Promise<T>}
	 */
	public request<T>(method: RequestMethodTypes, route: string, path?: string, data?: RequestData<unknown, unknown>) {
		const request = new APIRequest(this.client, method, route, path, data);

		let handler = this.requestHandlers.get(request.route);
		if (!handler) {
			handler = new RequestHandler(this);
			this.requestHandlers.set(request.route, handler);
		}

		return handler.push<T>(request);
	}
}
