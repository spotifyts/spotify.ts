import type { APIAlbum, APISimplifiedArtist } from './';
import type { APIObjects } from '../other';

export interface APITrack {
	id: string;
	name: string;
	href: string;
	uri: string;
	popularity: number;
	/**
	 * @deprecated Property will be removed in the future.
	 */
	preview_url: string | null;
	track_number: number;
	external_urls: APIObjects['external_urls'];
	external_ids: APIObjects['external_ids'];
	album: APIAlbum;
	artists: APISimplifiedArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	is_playable: boolean;
	is_local: boolean;
	restrictions: APIObjects['restrictions'];
}
