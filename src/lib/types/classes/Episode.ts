import type { APIImage, APIShow } from '.';

export interface APIEpisode {
	id: string;
	name: string;
	description: string;
	html_description: string;
	release_date: string;
	release_date_precision: 'day' | 'month' | 'year';
	href: string;
	uri: string;
	audio_preview_url: string | null;
	languages: string[];
	duration_ms: number;
	explicit: boolean;
	is_externally_hosted: boolean;
	is_playable: boolean;
	external_urls: { spotify: string };
	images: APIImage[];
	restrictions: {
		reason: 'market' | 'product' | 'explicit';
	};
	show: APIShow;
}
