import type { APIObjects } from '../other';
import type { APIImage, APISimplifiedArtist, APITrack } from './';

export interface APIAlbum {
	id: string;
	name: string;
	uri: string;
	label: string;
	popularity: number;
	album_type: 'album' | 'single' | 'compilation';
	total_tracks: number;
	available_markets: string[];
	copyrights: APIObjects['copyrights'];
	external_ids?: APIObjects['external_ids'];
	external_urls: APIObjects['external_urls'];
	href: string;
	images: APIImage[];
	release_date: string;
	release_date_precision: APIObjects['release_date_precision'];
	restrictions: APIObjects['restrictions'];
	artists: APISimplifiedArtist[];
	tracks: APIAlbumTrack;
}

export interface APISimplifiedAlbum extends Omit<APIAlbum, 'label' | 'popularity' | 'total_tracks' | 'copyrights' | 'external_ids' | 'tracks'> {
	album_group: 'album' | 'single' | 'compilation' | 'appears_on' | null;
}

export interface APIAlbumTrack {
	items: APITrack[];
}
