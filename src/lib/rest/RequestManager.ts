import { AsyncQueue } from '@sapphire/async-queue';
import { SpotifyAPIError, SpotifyRegularError } from '../errors';
import { APIRequest } from './';
import { Client } from '../Client';
import { RequestMethodTypes } from '../Constants';

export class RequestManager {
	/**
	 * The client that instantiated this manager.
	 */
	public client: Client;

	/**
	 * The queue for handling requests.
	 */
	public queue: AsyncQueue;

	public constructor(client: Client) {
		this.queue = new AsyncQueue();
		this.client = client;
	}

	/**
	 * Executes the request, and returns the response.
	 */
	public async execute<T>(method: RequestMethodTypes, route: string, path?: string | null, data?: RequestInit): Promise<T> {
		await this.queue.wait();

		try {
			const request = new APIRequest(this.client, route, method, path, data);
			const req = await request.make();

			if (!req.ok) {
				throw new SpotifyAPIError(`Request failed with status ${req.status}: ${req.statusText}`, req.status, null, req.statusText);
			}

			if (!req.headers.get('Content-Type')?.includes('application/json')) {
				throw new SpotifyAPIError(`Received non-JSON response from API`, req.status, null, req.statusText);
			}

			let json: T | SpotifyRegularError;

			try {
				json = (await req.json()) as T | SpotifyRegularError;
			} catch (err) {
				throw new SpotifyAPIError(`Failed to parse JSON response from API`, req.status, null, req.statusText);
			}

			if ('error' in (json as Record<string, unknown>)) {
				const errorData = json as SpotifyRegularError;
				throw new SpotifyAPIError(errorData.error.message, errorData.error.status, null, req.statusText);
			}

			return json as T;
		} finally {
			this.queue.shift();
		}
	}
}
