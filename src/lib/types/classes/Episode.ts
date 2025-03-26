import type { APIImage, APISimplifiedShow } from './';
import type { APIObjects } from '../other';

export interface APIEpisode {
	id: string;
	name: string;
	description: string;
	html_description: string;
	release_date: string;
	release_date_precision: APIObjects['release_date_precision'];
	href: string;
	uri: string;
	audio_preview_url: string | null;
	languages: string[];
	duration_ms: number;
	explicit: boolean;
	is_externally_hosted: boolean;
	is_playable: boolean;
	external_urls: APIObjects['external_urls'];
	images: APIImage[];
	restrictions: APIObjects['restrictions'];
	show: APISimplifiedShow;
}

export interface APISimplifiedEpisode extends Omit<APIEpisode, 'show'> {}
