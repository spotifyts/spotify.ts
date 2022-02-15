import type { APIArtist, APIAlbum } from '.';

export interface APITrack {
	id: string;
	name: string;
	href: string;
	type: 'track';
	uri: string;
	popularity: number;
	preview_url: string | null;
	track_number: number;
	external_urls: {
		spotify: string;
	};
	external_ids: {
		isrc: string;
		ean: string;
		upc: string;
	};
	album: APIAlbum;
	artists: APIArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	is_playable: boolean;
	is_local: boolean;
	restrictions: Record<string, string>;
}
