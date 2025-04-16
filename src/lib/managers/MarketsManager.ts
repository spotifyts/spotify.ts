import { BaseManager } from './BaseManager';
import type { Client } from '../Client';

export class MarketsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'markets');
	}

	/**
	 * Get a list of markets where Spotify is available.
	 */
	public async fetchAvailable(): Promise<string[]> {
		const { markets } = await super.get<{ markets: string[] }>();
		return markets;
	}
}
