import { Base } from '.';
import type { Client, APIPlaylist } from '..';

export class Playlist extends Base {
	/**
	 * The Spotify ID of the playlist
	 */
	public id!: string;

	/**
	 * The name of the playlist.
	 */
	public name!: string;

	/**
	 * The playlist description. Only returned for modified, verified playlists, otherwise null.
	 */
	public description!: APIPlaylist['description'];

	/**
	 * The Spotify URI of the playlist.
	 */
	public uri!: string;

	/**
	 * A link to the Web API endpoint providing full details of the playlist.
	 */
	public href!: string;

	/**
	 * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version
	 */
	public snapshot_id!: string;

	/**
	 * The playlist's public/private status: true the playlist is public, false the playlist is private, null if the playlist status is not relevant.
	 */
	public public!: APIPlaylist['public'];

	/**
	 * true if the owner allows other users to modify the playlist.
	 */
	public collaborative!: boolean;

	/**
	 * Known external URLs for this playlist.
	 */
	public external_urls!: APIPlaylist['external_urls'];

	/**
	 * Information about the followers of the playlist.
	 */
	public followers!: APIPlaylist['followers'];

	/**
	 * Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. *Note: If returned, the source URL for the image (url) is temporary and will expire in less than a day.*
	 */
	public images!: APIPlaylist['images'];

	/**
	 * The tracks of the playlist.
	 */
	public tracks!: APIPlaylist['tracks'];

	/**
	 * The user who owns the playlist.
	 */
	public owner!: APIPlaylist['owner'];

	public constructor(client: Client, data: APIPlaylist) {
		super(client);
		Object.assign(this, data);
	}
}
