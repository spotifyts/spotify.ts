import { BaseManager } from '.';
import {
	SpotifyTSError,
	RequestData,
	SearchResponse,
	Track,
	Artist,
	Album,
	Playlist,
	Show,
	Episode,
	SearchRequestQuery,
	type Client,
	type SearchOptions
} from '..';

export class SearchManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'search');
	}

	/**
	 * Search for albums, artists, playlists, tracks, shows or episodes that match a keyword string.
	 * @param {SearchOptions} options: The options to search with.
	 * @param {SearchOptions['query']} options.query: The query to search for. You can narrow down your search results using certain filters, read more about them here: https://developer.spotify.com/documentation/web-api/reference/#/operations/search
	 * @param {SearchOptions['type']} [options.type]: A list of item types to search across. Valid types are: album, artist, playlist, track, show, episode.
	 * @param {SearchOptions['include_external']} [options.include_external]: If this is true, it signals that the client can play externally hosted audio content, and marks the content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.
	 * @param {SearchOptions['limit']} [options.limit]: The maximum number of results to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {SearchOptions['market']} [options.market]: An ISO 3166-1 alpha-2 country code. If provided, only content available in this market will be returned.
	 * @param {SearchOptions['offset']} [options.offset]: The index of the first result to return. Use with limit to get the next page of search results. Default value 0, maximum 1000.
	 */
	public async search(options: SearchOptions) {
		let { query, type, include_external, limit, market, offset } = options;

		if (!query) throw new SpotifyTSError('MANAGER_ARGUMENT_MISSING', 'SearchesManager', 'search', 'query');
		if (!type) throw new SpotifyTSError('MANAGER_ARGUMENT_MISSING', 'SearchesManager', 'search', 'type');

		if (typeof query !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'SearchManager', 'search', 'query', 'string');
		if (!Array.isArray(type)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'SearchManager', 'search', 'type', 'SearchOptionsType[]');
		if (include_external && typeof include_external !== 'boolean')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'SearchManager', 'search', 'include_external', 'boolean');
		if (limit && typeof limit !== 'number')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'SearchManager', 'search', 'limit', 'number');
		if (market && typeof market !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'SearchManager', 'search', 'market', 'string');
		if (offset && typeof offset !== 'number')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'SearchManager', 'search', 'offset', 'number');

		if (include_external) include_external = 'audio';

		const data = new RequestData<SearchRequestQuery>({
			query: {
				q: query,
				type
			}
		});

		if (include_external) data.query!.include_external = Boolean(include_external);
		if (limit) data.query!.limit = limit;
		if (market) data.query!.market = market;
		if (offset) data.query!.offset = offset;

		const { tracks, artists, albums, playlists, shows, episodes } = await this.get<SearchResponse>(undefined, undefined, data);

		const resolved = [];

		if (tracks?.items.length) for (const track of tracks.items) resolved.push(new Track(this.client, track));
		if (artists?.items.length) for (const artist of artists.items) resolved.push(new Artist(this.client, artist));
		if (albums?.items.length) for (const album of albums.items) resolved.push(new Album(this.client, album));
		if (playlists?.items.length) for (const playlist of playlists.items) resolved.push(new Playlist(this.client, playlist));
		if (shows?.items.length) for (const show of shows.items) resolved.push(new Show(this.client, show));
		if (episodes?.items.length) for (const episode of episodes.items) resolved.push(new Episode(this.client, episode));

		return resolved;
	}
}
