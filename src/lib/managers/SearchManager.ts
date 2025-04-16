import { BaseManager } from './BaseManager';
import { Track, Artist, Album, Playlist, Show, Episode, Audiobook } from '../classes';
import { SpotifyTSError } from '../errors/SpotifyTSError';
import type { Client } from '../Client';
import type { SearchOptions, FilteredSearchResult, SearchResponse, SearchResult } from '../types';

export class SearchManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'search');
	}

	/**
	 * Search for albums, artists, playlists, tracks, shows or episodes that match a keyword string.
	 * @param {SearchOptions} options The options to search with.
	 * @param {SearchOptions['query']} options.query The query to search for. You can narrow down your search results using certain filters, read more about them here: https://developer.spotify.com/documentation/web-api/reference/#/operations/search
	 * @param {SearchOptions['type']} [options.type] A list of item types to search across. Valid types are: album, artist, playlist, track, show, episode.
	 * @param {SearchOptions['limit']} [options.limit] The maximum number of results to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {SearchOptions['market']} [options.market] An ISO 3166-1 alpha-2 market code. If provided, only content available in this market will be returned.
	 * @param {SearchOptions['offset']} [options.offset] The index of the first result to return. Use with limit to get the next page of search results. Default value 0, maximum 1000.
	 */
	public async search<T extends SearchOptions['type']>(options: {
		query: string;
		type: T;
		limit?: number;
		market?: string;
		offset?: number;
	}): Promise<FilteredSearchResult<T>> {
		let { query, type, limit, market, offset } = options;

		if (!query) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'SearchesManager', 'search', 'query');
		if (!type?.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'SearchesManager', 'search', 'type');

		const queryParams = new URLSearchParams({ q: query, type: type.join(','), include_external: 'audio' });

		if (limit) queryParams.append('limit', String(limit));
		if (market) queryParams.append('market', market);
		if (offset) queryParams.append('offset', String(offset));

		const { tracks, artists, albums, playlists, shows, audiobooks, episodes } = await this.get<SearchResponse>(
			null,
			`?${queryParams.toString()}`
		);

		const resolved: SearchResult = {
			tracks: [],
			artists: [],
			albums: [],
			playlists: [],
			shows: [],
			episodes: [],
			audiobooks: []
		};

		if (tracks) resolved.tracks = tracks.items.map((track) => new Track(this.client, track));
		if (artists) resolved.artists = artists.items.map((artist) => new Artist(this.client, artist));
		if (albums) resolved.albums = albums.items.map((album) => new Album(this.client, album));
		if (playlists) resolved.playlists = playlists.items.map((playlist) => new Playlist(this.client, playlist));
		if (shows) resolved.shows = shows.items.map((show) => new Show(this.client, show));
		if (audiobooks) resolved.audiobooks = audiobooks.items.map((audiobook) => new Audiobook(this.client, audiobook));
		if (episodes) resolved.episodes = episodes.items.map((episode) => new Episode(this.client, episode));

		return resolved as FilteredSearchResult<T>;
	}
}
