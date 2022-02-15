import { Base } from '.';
import type { APIShow, Client } from '../';

export class Show extends Base {
	/**
	 * The Spotify ID of the show.
	 */
	public id!: string;

	/**
	 * The name of the show.
	 */
	public name!: string;

	/**
	 * A description of the show. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed.
	 */
	public description!: string;

	/**
	 * A description of the show. This field may contain HTML tags.
	 */
	public html_description!: string;

	/**
	 * The publisher of the show.
	 */
	public publisher!: string;

	/**
	 * The Spotify URI of the show.
	 */
	public uri!: string;

	/**
	 * A link to the Web API endpoint providing full details of the show.
	 */
	public href!: string;

	/**
	 * A list of the languages used in the show, identified by their ISO 639 code.
	 */
	public languages!: string[];

	/**
	 * A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code.
	 */
	public available_markets!: string[];

	/**
	 * The media type of the show.
	 */
	public media_type!: string;

	/**
	 * Whether or not the show has explicit content.
	 */
	public explicit!: boolean;

	/**
	 * True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be null in some cases.
	 */
	public is_externally_hosted!: boolean | null;

	/**
	 * The cover art for the show in various sizes
	 */
	public images!: APIShow['images'];

	/**
	 * External URLs for this show.
	 */
	public external_urls!: APIShow['external_urls'];

	/**
	 * The copyright statements of the show.
	 */
	public copyrights!: APIShow['copyrights'];

	/**
	 * The episodes this show has.
	 */
	public episodes!: APIShow['episodes'];

	public constructor(client: Client, data: APIShow) {
		super(client);
		Object.assign(this, data);
	}

	/**
	 * Get the episodes of this show.
	 * @param {number} [limit]: The maximum number of episodes to return.
	 * @param {number} [offset]: The index of the first episode to return.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code.
	 */
	public async getEpisodes(limit?: number, offset?: number, country?: string) {
		return this.client.shows.getEpisodes(this.id, limit, offset, country);
	}
}
