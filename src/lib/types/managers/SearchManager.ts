import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from '../../classes';
import type { APIAlbum, APIArtist, APIAudiobook, APIEpisode, APIPlaylist, APIShow, APITrack } from '../classes';

export interface SearchOptions {
	query: string;
	type: SearchOptionsType[];
	limit?: number;
	market?: string;
	offset?: number;
}

export type SearchOptionsType = 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook';

type SearchResponseItem<T> = {
	items: T[];
};
export interface SearchResponse {
	tracks?: SearchResponseItem<APITrack>;
	artists?: SearchResponseItem<APIArtist>;
	albums?: SearchResponseItem<APIAlbum>;
	playlists?: SearchResponseItem<APIPlaylist>;
	shows?: SearchResponseItem<APIShow>;
	episodes?: SearchResponseItem<APIEpisode>;
	audiobooks?: SearchResponseItem<APIAudiobook>;
}

export interface SearchResult {
	tracks: Track[];
	artists: Artist[];
	albums: Album[];
	playlists: Playlist[];
	shows: Show[];
	audiobooks: Audiobook[];
	episodes: Episode[];
}

export type FilteredSearchResult<T extends SearchOptionsType[]> = Pick<SearchResult, `${T[number]}s`>;
