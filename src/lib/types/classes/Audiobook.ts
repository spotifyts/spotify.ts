import type { APIImage } from '.';

export interface APIAudiobook {
	id: string;
	name: string;
	description: string;
	html_description: string;
	href: string;
	explicit: boolean;
	authors: {
		name: string;
	}[];
	languages: string[];
	media_type: string;
	images: APIImage[];
	external_urls: {
		spotify: string;
	};
	narrators: {
		name: string;
	};
	copyrights: {
		text: string;
		type: 'C' | 'P';
	}[];
	publisher: string;
	type: 'audiobook';
	uri: string;
	total_chapters: number;
	chapters: {
		href: string;
		items: Record<string, unknown>;
		limit: number;
		next: string;
		offset: number;
		previous: string;
		total: number;
	};
}
