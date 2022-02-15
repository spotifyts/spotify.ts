import { BaseManager } from '.';
import type { Client } from '../';

export class MarketsManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'markets');
	}

	public async fetchAvailable(): Promise<string[]> {
		const { markets } = await super.get();
		return markets;
	}
}
