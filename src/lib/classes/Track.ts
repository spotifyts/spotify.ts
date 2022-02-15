import { Base } from '.';
import type { APITrack, Client } from '..';

export class Track extends Base {
	/**
	 * The Spotify ID for the track.
	 */
	public id!: string;

	/**
	 * The name of the track.
	 */
	public name!: string;

	/**
	 * A link to the Web API endpoint providing full details of the track.
	 */
	public href!: string;

	/**
	 *The Spotify URI for the track.
	 */
	public uri!: string;

	/**
	 * The popularity of the track.
	 */
	public popularity!: number;

	/**
	 * A link to a 30 second preview (MP3 format) of the track.
	 */
	public preview_url!: APITrack['preview_url'];

	/**
	 * The number of the track. If an album has several discs, the track number is the number on the specified disc.
	 */
	public track_number!: number;

	/**
	 * Known external URLs for this track.
	 */
	public external_urls!: APITrack['external_urls'];

	/**
	 * Known external IDs for the track.
	 */
	public external_ids!: APITrack['external_ids'];

	/**
	 * The album on which the track appears
	 */
	public album!: APITrack['album'];

	/**
	 * The artists who performed the track.
	 */
	public artists!: APITrack['artists'];

	/**
	 * A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.
	 */
	public available_markets!: string[];

	/**
	 * The disc number (usually 1 unless the album consists of more than one disc).
	 */
	public disc_number!: number;

	/**
	 * The disc number (usually 1 unless the album consists of more than one disc).
	 */
	public duration_ms!: number;

	/**
	 * Whether or not the track has explicit lyrics.
	 */
	public explicit!: boolean;

	/**
	 * Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false.
	 */
	public is_playable!: boolean;

	/**
	 * Whether or not the track is from a local file.
	 */
	public is_local!: boolean;

	/**
	 * Included in the response when a content restriction is applied
	 */
	public restrictions!: APITrack['restrictions'];

	public constructor(client: Client, data: APITrack) {
		super(client);
		Object.assign(this, data);
	}
}
