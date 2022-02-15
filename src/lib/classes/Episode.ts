import { Base } from '.';
import type { APIEpisode, Client } from '../';

export class Episode extends Base {
	/**
	 * The Spotify ID for the episode.
	 */
	public id!: string;

	/**
	 * The name of the episode.
	 */
	public name!: string;

	/**
	 * A description of the episode. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed.
	 */
	public description!: string;

	/**
	 * A description of the episode. This field may contain HTML tags.
	 */
	public html_description!: string;

	/**
	 * The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12".
	 */
	public release_date!: string;

	/**
	 * The precision with which release_date value is known.
	 */
	public release_date_precision!: APIEpisode['release_date_precision'];

	/**
	 * A link to the Web API endpoint providing full details of the episode.
	 */
	public href!: string;

	/**
	 * The Spotify URI for the episode.
	 */
	public uri!: string;

	/**
	 * A URL to a 30 second preview (MP3 format) of the episode. null if not available.
	 */
	public audio_preview_url!: APIEpisode['audio_preview_url'];

	/**
	 * A list of the languages used in the episode, identified by their ISO 639-1 code.
	 */
	public languages!: string[];

	/**
	 * The episode length in milliseconds.
	 */
	public duration_ms!: number;

	/**
	 * Whether or not the episode has explicit content.
	 */
	public explicit!: boolean;

	/**
	 * True if the episode is hosted outside of Spotify's CDN.
	 */
	public is_externally_hosted!: boolean;

	/**
	 * True if the episode is playable in the given market. Otherwise false.
	 */
	public is_playable!: boolean;

	/**
	 * External URLs for this episode.
	 */
	public external_urls!: APIEpisode['external_urls'];

	/**
	 * The cover art for the episode in various sizes.
	 */
	public images!: APIEpisode['images'];

	/**
	 * Included in the response when a content restriction is applied.
	 */
	public restrictions?: APIEpisode['restrictions'];

	/**
	 * The show this episode is in.
	 */
	public show!: APIEpisode['show'];

	public constructor(client: Client, data: APIEpisode) {
		super(client);
		Object.assign(this, data);
	}
}
