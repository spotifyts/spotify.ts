import { getAccessToken } from './util/util';
import { SpotifyTSError } from './errors';

import { RestManager } from './rest';
import {
	AlbumsManager,
	ArtistsManager,
	AudiobooksManager,
	CategoriesManager,
	EpisodesManager,
	GeneresManager,
	MarketsManager,
	PlaylistsManager,
	SearchManager,
	ShowsManager,
	TracksManager
} from '../managers';

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
	accessToken?: string | null;
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
	 * The manager for handling audiobooks.
	 * @type {AudiobooksManager}
	 */
	public audiobooks!: AudiobooksManager;

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

	/**
	 * The interval where the oauth token is re-generated.
	 */
	private interval!: NodeJS.Timeout;

	public constructor(options: ClientOptions) {
		const { clientId, clientSecret } = options;

		if (!clientId) throw new SpotifyTSError('CLIENT_OPTIONS_MISSING_OPTION', 'clientId');
		if (typeof clientId !== 'string') throw new SpotifyTSError('CLIENT_OPTION_INVALID_TYPE', 'clientId', 'string');
		if (!clientSecret) throw new SpotifyTSError('CLIENT_OPTIONS_MISSING_OPTION', 'clientSecret');
		if (typeof clientSecret !== 'string') throw new SpotifyTSError('CLIENT_OPTION_INVALID_TYPE', 'clientSecret', 'string');

		this.options = options;
	}

	/**
	 * Generates (and keeps generating a new token every hour or so) an Oauth token used for making requests to the Spotify API. It is necessary to call this method before using any managers.
	 * @returns {Promise<Client>} The instantiated client.
	 */
	public async start(): Promise<this> {
		const { expiresIn } = await getAccessToken(this);
		this.interval = setInterval(() => getAccessToken(this), expiresIn * 1000);

		this.registerManagers();
		return this;
	}

	/**
	 * Destroys the Client, clears its interval.
	 */
	public destroy(): this {
		clearTimeout(this.interval);
		this.options.accessToken = null;

		return this;
	}

	private registerManagers() {
		this.rest = new RestManager(this);
		this.albums = new AlbumsManager(this);
		this.artists = new ArtistsManager(this);
		this.audiobooks = new AudiobooksManager(this);
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
