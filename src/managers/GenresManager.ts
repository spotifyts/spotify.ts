import { BaseManager } from '.';
import type { Client } from '../';

export class GeneresManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'recommendations/available-genre-seeds');
	}

	public async fetchAvailableSeeds(): Promise<string[]> {
		const { genres } = await super.get();
		return genres;
	}
}
