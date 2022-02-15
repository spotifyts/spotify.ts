import type { APIImage } from '.';

export interface APIArtist {
	id: string;
	name: string;
	href: string;
	uri: string;
	type: 'artist';
	popularity: number;
	genres: string[];
	images: APIImage[];
	followers: {
		total: number;
	};
	external_urls: {
		spotify: string;
	};
}
