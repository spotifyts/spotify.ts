import type { APIEpisode, APIImage } from './';
import type { APIObjects } from '../other';

export interface APIShow {
	id: string;
	name: string;
	description: string;
	html_description: string;
	publisher: string;
	uri: string;
	href: string;
	languages: string[];
	available_markets: string[];
	media_type: string;
	explicit: boolean;
	is_externally_hosted: boolean | null;
	images: APIImage[];
	external_urls: APIObjects['external_urls'];
	copyrights: APIObjects['copyrights'];
	total_episodes: number;
	episodes: { items: APIEpisode[] };
}

export interface APISimplifiedShow extends Omit<APIShow, 'episodes'> {}
