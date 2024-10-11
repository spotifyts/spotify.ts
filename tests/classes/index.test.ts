import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import { Client, Track } from '../../src';

let client: Client;

beforeAll(async () => {
	const newClient = new Client({
		clientId: process.env.VITE_CLIENT_ID!,
		clientSecret: process.env.VITE_CLIENT_SECRET!
	});
	await newClient.start();
	client = newClient;
});

afterAll(() => {
	client.destroy();
});

describe('All Classes tests', () => {
	test('Album.getTracks returns array of Album', async () => {
		const album = await client.albums.fetch('21jF5jlMtzo94wbxmJ18aa'); // returns Album class
		const tracks = await album.getTracks(); // returns Array<Track>

		return expect(tracks).toEqual(expect.arrayContaining([expect.any(Track)]));
	});

	test('Artist.getTopTracks returns array of Track', async () => {
		const artist = await client.artists.fetch('4gdMJYnopf2nEUcanAwstx'); // returns Artist class
		const tracks = await artist.getTopTracks('IN'); // returns Array<Track>

		return expect(tracks).toEqual(expect.arrayContaining([expect.any(Track)]));
	});
});
