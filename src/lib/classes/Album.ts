import { Base } from './Base';
import type { Client } from '../Client';
import type { APIAlbum, APISimplifiedAlbum } from '../types';

export class Album<S = false> extends Base {
	/**
	 * The Spotify ID of the album.
	 */
	public id!: string;

	/**
	 * The name of the album. In case of an album takedown, the value may be an empty string.
	 */
	public name!: string;

	/**
	 * The Spotify URI for the album.
	 */
	public uri!: string;

	/**
	 * The label associated with the album.
	 */
	public label!: S extends true ? null : string;

	/**
	 * The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.
	 */
	public popularity!: S extends true ? null : number;

	/**
	 * The type of the album.
	 */
	public album_type!: APIAlbum['album_type'];

	/**
	 * The number of tracks in the album.
	 */
	public total_tracks!: S extends true ? null : number;

	/**
	 * The markets in which the album is available: ISO 3166-1 alpha-2 market codes. NOTE: an album is considered available in a market when at least 1 of its tracks is available in that market.
	 */
	public available_markets!: string[];

	/**
	 * The copyright statements of the album.
	 */
	public copyrights!: S extends true ? null : APIAlbum['copyrights'];

	/**
	 * Known external IDs for the album.
	 */
	public external_ids!: S extends true ? null : APIAlbum['external_ids'];

	/**
	 * Known external URLs for this album.
	 */
	public external_urls!: APIAlbum['external_urls'];

	/**
	 * A link to the Web API endpoint providing full details of the album
	 */
	public href!: string;

	/**
	 * The cover art for the album in various sizes, widest first.
	 */
	public images!: APIAlbum['images'];

	/**
	 * The date the album was first released.
	 */
	public release_date!: string;

	/**
	 * The precision with which release_date value is known.
	 */
	public release_date_precision!: APIAlbum['release_date_precision'];

	/**
	 * Included in the response when a content restriction is applied.
	 */
	public restrictions!: APIAlbum['restrictions'];

	/**
	 * The artists of the album. Each artist object includes a link in href to more detailed information about the artist.
	 */
	public artists!: APIAlbum['artists'];

	/**
	 * The tracks of the album.
	 */
	public tracks!: S extends true ? null : APIAlbum['tracks'];

	/**
	 * This field describes the relationship between the artist and the album.
	 * This field is only available when album is fetched through an artist or other similar entity.
	 */
	public album_group!: S extends true ? APISimplifiedAlbum['album_group'] : null;

	public constructor(client: Client, data: S extends true ? APISimplifiedAlbum : APIAlbum) {
		super(client);
		Object.assign(this, data);
	}

	/**
	 * Get this album's tracks.
	 * @param {number} [limit]: The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param {string} [market]: An ISO 3166-1 alpha-2 market code. Supply this parameter to limit the response to one particular geographical market.
	 * @param {number} [offset]: The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 */
	public getTracks(limit?: number, market?: string, offset?: number) {
		return this.client.albums.getTracks(this.id, limit, market, offset);
	}
}
