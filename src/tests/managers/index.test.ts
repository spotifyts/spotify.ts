import { test } from '../test';
import { describe, expect } from 'vitest';
import { Album, Artist, Episode, Playlist, Show, Track, Audiobook } from '../../lib';

describe('All Manager tests', () => {
	test('AlbumsManager.fetch returns Album', async ({ client }) => {
		const data = await client.albums.fetch('21jF5jlMtzo94wbxmJ18aa');
		return expect(data).toBeInstanceOf(Album);
	});

	test('ArtistsManager.fetch returns Artist', async ({ client }) => {
		const data = await client.artists.fetch('4gdMJYnopf2nEUcanAwstx');
		return expect(data).toBeInstanceOf(Artist);
	});

	test('EpisodesManager.fetch returns Episode', async ({ client }) => {
		const data = await client.episodes.fetch('3ou7K5MaAnebFxp9yXDnjH', 'US');
		return expect(data).toBeInstanceOf(Episode);
	});

	test('MarketsManager.fetchAvailable returns array of strings', async ({ client }) => {
		const data = await client.markets.fetchAvailable();
		return expect(data).toEqual(expect.arrayContaining([expect.any(String)]));
	});

	test('PlaylistsManager.fetch returns Playlist', async ({ client }) => {
		const data = await client.playlists.fetch('5eXspxd0Uy0hi0659Ry21K');
		return expect(data).toBeInstanceOf(Playlist);
	});

	test('SearchManager.search returns an array of Track, when searched for a Track', async ({ client }) => {
		const data = await client.searches.search({
			query: 'Gul - Anuv Jain',
			type: ['track']
		});
		expect(data.tracks).toEqual(expect.arrayContaining([expect.any(Track)]));
	});

	test('ShowsManager.fetch returns Show', async ({ client }) => {
		const data = await client.shows.fetch('38bS44xjbVVZ3No3ByF1dJ', 'US');
		return expect(data).toBeInstanceOf(Show);
	});

	test('TracksManager.fetch returns Track', async ({ client }) => {
		const data = await client.tracks.fetch('0NLkVxf0PyxsXBG3EuZcJf');
		return expect(data).toBeInstanceOf(Track);
	});
	test('AudiobooksManager.fetch returns a single Audiobook', async ({ client }) => {
		// https://open.spotify.com/show/2IEBhnu61ieYGFRPEJIO40
		const data = await client.audiobooks.fetch('2IEBhnu61ieYGFRPEJIO40');
		return expect(data).toBeInstanceOf(Audiobook);
	});

	test('AudiobooksManager.fetchSeveral returns a list of Audiobooks', async ({ client }) => {
		const data = await client.audiobooks.fetchSeveral(['2IEBhnu61ieYGFRPEJIO40', '0uEpCJqK3X338PiK4IdL0y', '17yH63ljIo7k21C0bO4T8B']);
		return expect(data).toEqual(expect.arrayContaining([expect.any(Audiobook)]));
	});
});
