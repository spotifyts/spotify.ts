import type { APIEpisode, APIImage } from '.';

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
	external_urls: { spotify: string };
	copyrights: { text: string; type: string };
	episodes: { items: APIEpisode[] };
}
