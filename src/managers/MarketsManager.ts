import { BaseManager } from '.';
import type { Client } from '../';

export class MarketsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'markets');
	}

	/**
	 * Get a list of markets where Spotify is available.
	 * @returns {Promise<string[]>} Array of strings
	 */
	public async fetchAvailable(): Promise<string[]> {
		const { markets } = await super.get<{ markets: string[] }>();
		return markets;
	}
}
