import { BaseManager } from '.';
import type { Client } from '../';

export class GeneresManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'recommendations/available-genre-seeds');
	}

	/**
	 * Retrieve a list of available genres seed parameter values for recommendations.
	 * @returns {Promise<string[]>} Array of strings
	 */
	public async fetchAvailableSeeds(): Promise<string[]> {
		const { genres } = await super.get();
		return genres;
	}
}
