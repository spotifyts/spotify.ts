import { URLSearchParams } from 'node:url';
import { SpotifyTSError, SpotifyAPIError } from './errors';
import { RequestMethods } from './Constants';

import { RestManager } from './rest';
import {
	AlbumsManager,
	ArtistsManager,
	CategoriesManager,
	EpisodesManager,
	GeneresManager,
	MarketsManager,
	PlaylistsManager,
	SearchManager,
	ShowsManager,
	TracksManager
} from '../managers';

import phin from 'phin';

export interface ClientOptions {
	/**
	 * The client ID of your app obtained from the developer dashboard.
	 */
	clientId: string;

	/**
	 * The client secret of your app obtained from the developer dashboard.
	 */
	clientSecret: string;

	/**
	 * The access token generated from the client ID and secret.
	 */
	accessToken?: string;
}

export class Client {
	/**
	 * The options for the client.
	 */
	public options: ClientOptions;

	/**
	 * The rest manager used to make requests to the API.
	 * @type {RestManager}
	 */
	public rest!: RestManager;

	/**
	 * The manager for handling albums.
	 * @type {AlbumsManager}
	 */
	public albums!: AlbumsManager;

	/**
	 * The manager for handling artists.
	 * @type {ArtistsManager}
	 */
	public artists!: ArtistsManager;

	/**
	 * The manager for handling browsing categories.
	 * @type {CategoriesManager}
	 */
	public categories!: CategoriesManager;

	/**
	 * The manager for handling episodes.
	 * @type {EpisodesManager}
	 */
	public episodes!: EpisodesManager;

	/**
	 * The manager for handling genres.
	 * @type {GeneresManager}
	 */
	public genres!: GeneresManager;

	/**
	 * The manager for handling markets.
	 * @type {MarketsManager}
	 */
	public markets!: MarketsManager;

	/**
	 * The manager for handling playlists.
	 * @type {PlaylistsManager}
	 */
	public playlists!: PlaylistsManager;

	/**
	 * The manager for making searches.
	 */
	public searches!: SearchManager;

	/**
	 * The manager for handling shows.
	 * @type {ShowsManager}
	 */
	public shows!: ShowsManager;

	/**
	 * The manager for handling tracks.
	 * @type {TracksManager}
	 */
	public tracks!: TracksManager;

	public constructor(options: ClientOptions) {
		const { clientId, clientSecret } = options;

		if (!clientId) throw new SpotifyTSError('CLIENT_OPTIONS_MISSING_OPTION', 'clientId');
		if (typeof clientId !== 'string') throw new SpotifyTSError('CLIENT_OPTION_INVALID_TYPE', 'clientId', 'string');
		if (!clientSecret) throw new SpotifyTSError('CLIENT_OPTIONS_MISSING_OPTION', 'clientSecret');
		if (typeof clientSecret !== 'string') throw new SpotifyTSError('CLIENT_OPTION_INVALID_TYPE', 'clientSecret', 'string');

		this.options = options;
	}

	/**
	 * Generates an Oauth token used for making requests to the Spotify API. It is necessary to call this method before using any managers.
	 * @returns {Promise<Client>} The instantiated client.
	 */
	public async start(): Promise<this> {
		const { clientId, clientSecret } = this.options;
		const encodedCreds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

		const { body, statusCode } = await phin({
			method: RequestMethods.Post,
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				Authorization: `Basic ${encodedCreds}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
			parse: 'json'
		});

		const parsed = body as SpotifyAPIAccessTokenResponse;
		if (parsed.error && parsed.error_description) throw new SpotifyAPIError(parsed.error_description, statusCode!, parsed.error);
		this.options.accessToken = parsed.access_token;

		this.registerManagers();
		return this;
	}

	private registerManagers() {
		this.rest = new RestManager(this);
		this.albums = new AlbumsManager(this);
		this.artists = new ArtistsManager(this);
		this.categories = new CategoriesManager(this);
		this.episodes = new EpisodesManager(this);
		this.genres = new GeneresManager(this);
		this.markets = new MarketsManager(this);
		this.playlists = new PlaylistsManager(this);
		this.searches = new SearchManager(this);
		this.shows = new ShowsManager(this);
		this.tracks = new TracksManager(this);
	}
}

interface SpotifyAPIAccessTokenResponse {
	access_token: string;
	error?: string;
	error_description?: string;
}
