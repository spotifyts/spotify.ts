import { Base } from '.';
import type { Client } from '../';
import type { APIChapter } from '../types';

export class Chapter extends Base {
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
	public audio_preview_url!: APIChapter['audio_preview_url'];

	/**
	 * The number of the chapter
	 */
	public chapter_number!: number;

	/**
	 * The episode length in milliseconds.
	 */
	public duration_ms!: number;

	/**
	 * Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).
	 */
	public explicit!: boolean;

	/**
	 * Whether or not the episode is playable in the given market. Otherwise false.
	 */
	public is_playable!: boolean;

	/**
	 * External URLs for this episode.
	 */
	public external_urls!: APIChapter['external_urls'];

	/**
	 * The cover art for the episode in various sizes, widest first.
	 */
	public images!: APIChapter['images'];

	/**
	 * A list of the languages used in the episode, identified by their ISO 639-1 code.
	 */
	public languages!: string[];

	/**
	 * The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12".
	 */
	public release_date!: string;

	/**
	 * The precision with which release_date value is known.
	 */
	public release_date_precision!: APIChapter['release_date_precision'];

	/**
	 * The object type.
	 */
	public type!: 'epsiode';

	/**
	 * Included in the response when a content restriction is applied.
	 */
	public restrictions!: APIChapter['restrictions'];

	/**
	 * The audiobook related to this chapter.
	 */
	public audiobook!: APIChapter['audiobook'];

	public constructor(client: Client, data: APIChapter) {
		super(client);
		Object.assign(this, data);
	}
}
