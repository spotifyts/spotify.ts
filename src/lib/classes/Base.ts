import type { Client } from '../';

export class Base {
	/**
	 * The client that instantiated this class.
	 */
	public client!: Client;

	public constructor(client: Client) {
		Object.defineProperty(this, 'client', { value: client, enumerable: false });
	}
}
