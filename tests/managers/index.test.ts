import { Client, Album, Artist, Category, Episode, Playlist, Show, Track } from '../../src';

let client: Client;

beforeEach(async () => {
	const newClient = new Client({
		clientId: process.env.CLIENT_ID!,
		clientSecret: process.env.CLIENT_SECRET!
	});
	await newClient.start();
	client = newClient;
});

describe('All Manager tests', () => {
	test('AlbumsManager.fetch returns Album', async () => {
		const data = await client.albums.fetch('21jF5jlMtzo94wbxmJ18aa');
		return expect(data).toBeInstanceOf(Album);
	});

	test('ArtistsManager.fetch returns Artist', async () => {
		const data = await client.artists.fetch('4gdMJYnopf2nEUcanAwstx');
		return expect(data).toBeInstanceOf(Artist);
	});

	test('CategoriesManager.fetch returns Category', async () => {
		const data = await client.categories.fetch('pop');
		return expect(data).toBeInstanceOf(Category);
	});

	test('EpisodesManager.fetch returns Episode', async () => {
		const data = await client.episodes.fetch('3ou7K5MaAnebFxp9yXDnjH', 'US');
		return expect(data).toBeInstanceOf(Episode);
	});

	test('GenresManager.fetchAvailableSeeds returns array of strings', async () => {
		const data = await client.genres.fetchAvailableSeeds();
		return expect(data).toEqual(expect.arrayContaining([expect.any(String)]));
	});

	test('MarketsManager.fetchAvailable returns array of strings', async () => {
		const data = await client.markets.fetchAvailable();
		return expect(data).toEqual(expect.arrayContaining([expect.any(String)]));
	});

	test('PlaylistsManager.fetch returns Playlist', async () => {
		const data = await client.playlists.fetch('5eXspxd0Uy0hi0659Ry21K');
		return expect(data).toBeInstanceOf(Playlist);
	});

	test('ShowsManager.fetch returns Show', async () => {
		const data = await client.shows.fetch('38bS44xjbVVZ3No3ByF1dJ', 'US');
		return expect(data).toBeInstanceOf(Show);
	});

	test('TracksManager.fetch returns Track', async () => {
		const data = await client.tracks.fetch('0NLkVxf0PyxsXBG3EuZcJf');
		return expect(data).toBeInstanceOf(Track);
	});
});
