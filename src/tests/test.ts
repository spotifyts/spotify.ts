import { test as vitest } from 'vitest';
import { Client } from '../lib';

interface TextFixtures {
	client: Client;
}

export const test = vitest.extend<TextFixtures>({
	client: async ({}, use) => {
		const client = new Client({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET
		});
		await client.start();
		await use(client);
	}
});

declare module 'vitest' {
	export interface TestContext {
		client: Client;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SPOTIFY_CLIENT_ID: string;
			SPOTIFY_CLIENT_SECRET: string;
		}
	}
}
