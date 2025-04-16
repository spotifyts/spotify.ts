import type { APIObjects } from '../other';
import type { APIEpisode, APIImage, APISimplifiedTrack } from './';

export interface APIPlaylist {
	id: string;
	name: string;
	description: string | null;
	uri: string;
	href: string;
	snapshot_id: string;
	public: boolean | null;
	collaborative: boolean;
	external_urls: APIObjects['external_urls'];
	followers: { total: number };
	images: APIImage[];
	tracks: APIPlaylistTrack;
	owner: APIPlaylistOwner;
}

export interface APIPlaylistOwner {
	id: string;
	display_name: string | null;
	uri: string;
	href: string;
	followers: { total: number };
	external_urls: APIObjects['external_urls'];
}

export interface APIPlaylistTrack {
	added_at: string;
	added_by: Omit<APIPlaylistOwner, 'display_name'>;
	is_local: boolean;
	track: APISimplifiedTrack;
	episode: APIEpisode;
}

export interface APISimplifiedPlaylist extends Omit<APIPlaylist, 'followers' | 'tracks'> {
	tracks: { total: number };
}
