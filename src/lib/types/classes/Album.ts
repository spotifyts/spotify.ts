import type { APIImage, APIArtist, APITrack } from '.';

export interface APIAlbum {
	id: string;
	name: string;
	uri: string;
	label?: string;
	popularity?: number;
	album_type: 'album' | 'single' | 'compilation';
	type: 'album';
	total_tracks: number;
	available_markets: string[];
	copyrights?: { text: string; type: string }[];
	external_ids?: Record<string, unknown>;
	external_urls: {
		spotify: string;
	};
	href: string;
	images: APIImage[];
	release_date: string;
	release_date_precision: 'day' | 'month' | 'year';
	restrictions: {
		reason: 'market' | 'product' | 'explicit';
	};
	artists: APIArtist[];
	tracks: APIAlbumTrack;
}

export interface APIAlbumTrack {
	href: string;
	items: APITrack[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}
