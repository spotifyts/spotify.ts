import type { APIObjects } from '../other';
import type { APIAudiobook } from './Audiobook';
import type { APIImage } from './Image';

export interface APIChapter {
	id: string;
	name: string;
	description: string;
	html_description: string;
	href: string;
	uri: string;
	audio_preview_url: string | null;
	available_markets: string;
	chapter_number: number;
	duration_ms: number;
	explicit: boolean;
	is_playable: boolean;
	external_urls: APIObjects['external_urls'];
	images: APIImage[];
	languages: string[];
	release_date: string;
	release_date_precision: APIObjects['release_date_precision'];
	restrictions: {
		reason: APIObjects['restrictions']['reason'] | 'payment_required';
	};
	audiobook: APIAudiobook;
}

export interface APISimplifiedChapter extends Omit<APIChapter, 'audiobook'> {}
