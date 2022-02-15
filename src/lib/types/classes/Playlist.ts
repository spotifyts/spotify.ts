import type { APIAlbumTrack, APIImage } from '.';

export interface APIPlaylist {
	id: string;
	name: string;
	description: string | null;
	uri: string;
	href: string;
	snapshot_id: string;
	public: boolean | null;
	collaborative: boolean;
	external_urls: {
		spotify: string;
	};
	followers: { total: number };
	images: APIImage[];
	tracks: APIAlbumTrack;
	owner: APIPlaylistOwner;
}

export interface APIPlaylistOwner {
	id: string;
	display_name: string | null;
	uri: string;
	href: string;
	followers: { total: number };
	external_urls: { spotify: string };
}
