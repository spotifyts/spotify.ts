import { describe, expect } from 'vitest';
import { test } from '../test';
import { Track } from '../../lib';

describe('All Classes tests', () => {
	test('Album.getTracks returns array of Album', async ({ client }) => {
		const album = await client.albums.fetch('21jF5jlMtzo94wbxmJ18aa'); // returns Album class
		const tracks = await album.getTracks(); // returns Array<Track>

		return expect(tracks).toEqual(expect.arrayContaining([expect.any(Track)]));
	});

	test('Artist.getTopTracks returns array of Track', async ({ client }) => {
		const artist = await client.artists.fetch('4gdMJYnopf2nEUcanAwstx'); // returns Artist class
		const tracks = await artist.getTopTracks('IN'); // returns Array<Track>

		return expect(tracks).toEqual(expect.arrayContaining([expect.any(Track)]));
	});
});
