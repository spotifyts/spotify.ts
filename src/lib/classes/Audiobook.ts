import { Base } from './Base';
import type { Client } from '../Client';
import type { APIAudiobook, APISimplifiedAudiobook } from '../types';

export class Audiobook<S = false> extends Base {
	/**
	 * The Spotify ID for the audiobook.
	 */
	public id!: string;

	/**
	 * The name of the audiobook.
	 */
	public name!: string;

	/**
	 * A description of the audiobook. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed.
	 */
	public description!: string;

	/**
	 * A description of the audiobook. This field may contain HTML tags.
	 */
	public html_description!: string;

	/**
	 * The edition of the audiobook.
	 */
	public edition!: string;

	/**
	 * A link to the Web API endpoint providing full details of the audiobook.
	 */
	public href!: string;

	/**
	 * Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).
	 */
	public explicit!: boolean;

	/**
	 * A list of the countries in which the audiobook can be played, identified by their ISO 3166-1 alpha-2 code.
	 */
	public available_markets!: string;

	/**
	 * The author(s) for the audiobook.
	 */
	public authors!: APIAudiobook['authors'];

	/**
	 *A list of the languages used in the audiobook, identified by their ISO 639 code.
	 */
	public languages!: string[];

	/**
	 * The media type of the audiobook.
	 */
	public media_type!: string;

	/**
	 * The cover art for the audiobook in various sizes, widest first.
	 */
	public images!: APIAudiobook['images'];

	/**
	 * External URLs for this audiobook.
	 */
	public external_urls!: APIAudiobook['external_urls'];

	/**
	 * The narrator(s) for the audiobook.
	 */
	public narrators!: APIAudiobook['narrators'];

	/**
	 * The copyright statements of the audiobook.
	 */
	public copyrights!: APIAudiobook['copyrights'];

	/**
	 * The publisher of the audiobook.
	 */
	public publisher!: string;

	/**
	 * The object type.
	 */
	public type!: 'audiobook';

	/**
	 * The Spotify URI for the audibook.
	 */
	public uri!: string;

	/**
	 * The number of chapters in this audiobook.
	 */
	public total_chapters!: number;

	/**
	 * The chapters of the audiobook.
	 */
	public chapters!: S extends true ? null : APIAudiobook['chapters']['items'];

	public constructor(
		client: Client,
		data: S extends true ? APISimplifiedAudiobook : Omit<APIAudiobook, 'chapters'> | { chapters: APIAudiobook['chapters']['items'] }
	) {
		super(client);
		Object.assign(this, data);
	}
}
