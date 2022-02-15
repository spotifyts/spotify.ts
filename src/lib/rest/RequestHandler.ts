import { AsyncQueue } from '@sapphire/async-queue';
import { SpotifyAPIError, SpotifyRegularError } from '../errors';
import type { APIRequest, RestManager } from '.';

export class RequestHandler {
	/**
	 * The rest manager.
	 * @type {RestManager}
	 */
	public manager: RestManager;

	/**
	 * The queue for handling requests.
	 */
	public queue: AsyncQueue;

	public constructor(manager: RestManager) {
		this.manager = manager;
		this.queue = new AsyncQueue();
	}

	/**
	 * Pushes a request to the queue.
	 * @param {APIRequest} request: The request to push.
	 * @returns {Promise<unknown>}
	 */
	public async push<T>(request: APIRequest) {
		await this.queue.wait();
		try {
			return await this.execute<T>(request);
		} finally {
			this.queue.shift();
		}
	}

	/**
	 * Executes the request, and returns the response.
	 * @param {APIRequest} request: The request to execute.
	 * @returns {Promise<T>}
	 */
	public async execute<T>(request: APIRequest): Promise<T> {
		const { body, statusCode } = await request.make();
		if (statusCode === 200) return body as T;

		const { error } = body as SpotifyRegularError;
		throw new SpotifyAPIError(error.message, error.status);
	}
}
