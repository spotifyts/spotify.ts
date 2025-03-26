import type { APIImage, APISimplifiedChapter } from './';
import type { APIObjects } from '../other';

export interface APIAudiobook {
	id: string;
	name: string;
	description: string;
	html_description: string;
	edition: string;
	href: string;
	explicit: boolean;
	available_markets: string[];
	languages: string[];
	media_type: string;
	images: APIImage[];
	external_urls: APIObjects['external_urls'];
	authors: {
		name: string;
	}[];
	narrators: {
		name: string;
	}[];
	copyrights: APIObjects['copyrights'];
	publisher: string;
	uri: string;
	total_chapters: number;
	chapters: {
		items: APISimplifiedChapter[];
	};
}

export interface APISimplifiedAudiobook extends Omit<APIAudiobook, 'chapters'> {}
