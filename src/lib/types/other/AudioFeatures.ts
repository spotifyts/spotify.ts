/**
 * Read more here:
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
 */

export interface AudioFeatures {
	id: string;
	uri: string;
	track_href: string;
	duration_ms: string;
	analysis_url: string;
	acousticness: number;
	danceability: number;
	energy: number;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	valence: number;
}
