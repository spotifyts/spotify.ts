import { BaseManager } from '.';
import { Track, RequestData, SpotifyTSError, type Client, type APITrack, type AudioFeatures, type AudioAnalysis } from '../';

export class TracksManager extends BaseManager {
	public constructor(client: Client) {
		super(client, 'tracks');
	}

	/**
	 * Fetch a Spotify Track by its ID.
	 * @param {string} id: The Spotify ID of the track.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code, if specified,  returns only the content available in this country. If this argument is not specified, the country code of the user account will be used.
	 * @returns {Promise<Track>} Track object.
	 */
	public async fetch(id: string, country?: string): Promise<Track> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'TracksManager', 'fetch', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'TracksManager', 'fetch', 'id', 'string');
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'TracksManager', 'fetch', 'country', 'string');

		const query = country ? new RequestData({ query: { market: country } }) : undefined;
		const data = query ? await super.get<APITrack>(undefined, id, query) : await super.get<APITrack>(undefined, id);

		return new Track(this.client, data);
	}

	/**
	 * Fetch multiple Spotify Tracks by their IDs.
	 * @param {string[]} ids: The Spotify IDs of the tracks.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code, if specified,  returns only the content available in this country. If this argument is not specified, the country code of the user account will be used.
	 * @returns {Promise<Track[]>} Array of fetched tracks
	 */
	public async fetchSeveral(ids: string[], country?: string): Promise<Track[]> {
		if (!ids || !ids.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'TracksManager', 'fetchSeveral', 'ids');
		if (!Array.isArray(ids)) throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'TracksManager', 'fetchSeveral', 'ids', 'Array<string>');
		if (ids.length > 50) throw new SpotifyTSError('MANAGER_ARGUMENT_OUT_OF_RANGE', 'TracksManager', 'fetchSeveral', 'ids', 50);
		if (country && typeof country !== 'string')
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'TracksManager', 'fetchSeveral', 'country', 'string');

		const query = country
			? new RequestData({ query: { ids: ids.join(','), market: country } })
			: new RequestData({ query: { ids: ids.join(',') } });
		const { tracks } = await super.get<{ tracks: APITrack[] }>(undefined, undefined, query);

		const parsed = [];
		for (const track of tracks) parsed.push(new Track(this.client, track));

		return parsed;
	}

	/**
	 * Get the audio features of a Spotify Track.
	 * @param {string} id: The Spotify ID of the track.
	 * @returns {Promise<AudioFeatures>} The audio features of the track.
	 */
	public getAudioFeatures(id: string): Promise<AudioFeatures> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'TracksManager', 'getAudioFeatures', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'TracksManager', 'getAudioFeatures', 'id', 'string');

		return super.get<AudioFeatures>('audio-features', id);
	}

	/**
	 * Get the audio features of multiple Spotify Tracks.
	 * @param {Array<string>} ids: The Spotify IDs of the tracks.
	 * @returns {Promise<AudioFeatures[]>} The audio features of the tracks provided.
	 */
	public async getAudioFeaturesMultipleTracks(ids: string[]): Promise<AudioFeatures[]> {
		if (!ids || !ids.length) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'TracksManager', 'getAudioFeaturesMultipleTracks', 'ids');
		if (!Array.isArray(ids))
			throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'TracksManager', 'getAudioFeaturesMultipleTracks', 'ids', 'Array<string>');
		if (ids.length > 50) throw new SpotifyTSError('MANAGER_ARGUMENT_OUT_OF_RANGE', 'TracksManager', 'getAudioFeaturesMultipleTracks', 'ids', 100);

		const query = new RequestData({ query: { ids: ids.join(',') } });
		const { audio_features } = await super.get<{ audio_features: AudioFeatures[] }>('audio-features', undefined, query);

		return audio_features;
	}

	/**
	 * Get a low-level audio analysis for a Spotify Track.
	 * @param {string} id: The ID of the track.
	 * @returns {Promise<AudioAnalysis>} The audio analysis of the track.
	 */
	public getAudioAnalysis(id: string): Promise<AudioAnalysis> {
		if (!id) throw new SpotifyTSError('MANAGER_MISSING_ARGUMENT', 'TracksManager', 'getAudioAnalysis', 'id');
		if (typeof id !== 'string') throw new SpotifyTSError('MANAGER_ARGUMENT_INVALID_TYPE', 'TracksManager', 'getAudioAnalysis', 'id', 'string');

		return super.get<any>('audio-analysis', id);
	}
}
