import { Base } from '.';
import type { Client } from '..';
import type { APIArtist } from '../types';

export class Artist extends Base {
	/**
	 * The Spotify ID for the artist.
	 */
	public id!: string;

	/**
	 * The name of the artist.
	 */
	public name!: string;

	/**
	 * A link to the Web API endpoint providing full details of the artist.
	 */
	public href!: string;

	/**
	 * The Spotify URI for the artist.
	 */
	public uri!: string;

	/**
	 * The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.
	 */
	public popularity!: string;

	/**
	 * A list of the genres the artist is associated with. If not yet classified, the array is empty.
	 */
	public genres!: string[];

	/**
	 * Images of the artist in various sizes.
	 */
	public images!: APIArtist['images'];

	/**
	 * Information about the followers of the artist.
	 */
	public followers!: APIArtist['followers'];

	/**
	 * Known external URLs for this artist.
	 */
	public external_urls!: APIArtist['external_urls'];

	public constructor(client: Client, data: APIArtist) {
		super(client);
		Object.assign(this, data);
	}

	/**
	 * Get the albums of this artist.
	 * @param {number} [limit]: The number of albums to return. Minimum: 1, Maximum: 50, defaults to 50.
	 * @param {string} [country]: An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that country will be returned, if not, the country of the user is used.
	 * @param {number} [offset]: The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
	 */
	public async getAlbums(limit?: number, country?: string, offset?: number) {
		return this.client.artists.getAlbums(this.id, limit, country, offset);
	}

	/**
	 * Get the top tracks of this artist.
	 * @param {string} country: An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that country will be returned, if not, the country of the user is used.
	 */
	public async getTopTracks(country: string) {
		return this.client.artists.getTopTracks(this.id, country);
	}

	/**
	 * Get artists similar to this artist.
	 */
	public async getSimilar() {
		return this.client.artists.getSimilar(this.id);
	}
}
