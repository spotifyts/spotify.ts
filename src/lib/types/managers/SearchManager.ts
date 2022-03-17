import type { APIAlbum, APIArtist, APIEpisode, APIPlaylist, APIShow, APITrack } from '../classes';

export interface SearchOptions {
	query: string;
	type: SearchOptionsType[];
	include_external?: boolean | string;
	limit?: number;
	market?: string;
	offset?: number;
}

type SearchOptionsType = 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode';

export interface SearchRequestQuery {
	q: string;
	type: SearchOptionsType[];
	include_external?: boolean;
	limit?: number;
	market?: string;
	offset?: number;
}

export interface SearchResponse {
	tracks?: {
		items: APITrack[];
	};
	artists?: {
		items: APIArtist[];
	};
	albums?: {
		items: APIAlbum[];
	};
	playlists?: {
		items: APIPlaylist[];
	};
	shows?: {
		items: APIShow[];
	};
	episodes?: {
		items: APIEpisode[];
	};
}
