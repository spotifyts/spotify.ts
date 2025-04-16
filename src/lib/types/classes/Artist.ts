import type { APIImage } from './';
import type { APIObjects } from '../other';

export interface APIArtist {
	id: string;
	name: string;
	href: string;
	uri: string;
	popularity: number;
	genres: string[];
	images: APIImage[];
	followers: {
		total: number;
	};
	external_urls: APIObjects['external_urls'];
}

export interface APISimplifiedArtist extends Omit<APIArtist, 'popularity' | 'genres' | 'images' | 'followers'> {}
