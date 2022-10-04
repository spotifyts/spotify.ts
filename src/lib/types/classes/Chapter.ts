import type { APIAudiobook } from './Audiobook';
import type { APIImage } from './Image';

export interface APIChapter {
	id: string;
	name: string;
	description: string;
	href: string;
	uri: string;
	audio_preview_url: string | null;
	chapter_number: number;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	is_playable: boolean;
	external_urls: {
		spotify: string;
	};
	images: APIImage[];
	languages: string[];
	release_date: string;
	release_date_precision: 'day' | 'month' | 'year';
	type: 'epsiode';
	restrictions: {
		reason: string;
	};
	audiobook: APIAudiobook;
}
