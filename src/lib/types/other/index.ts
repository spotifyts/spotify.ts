export interface APIRestrictionsObject {
	reason: 'market' | 'product' | 'explicit' | (string & {});
}

export interface APIExternalUrlsObject extends Record<string, string> {
	spotify: string;
}

export interface APICopyrightObject {
	text: string;
	type: 'C' | 'P';
}

export interface APIExternalIdsObject {
	isrc: string;
	ean: string;
	upc: string;
}

export interface APIObjects {
	restrictions: APIRestrictionsObject;
	external_urls: APIExternalUrlsObject;
	release_date_precision: 'day' | 'month' | 'year';
	copyrights: APICopyrightObject[];
	external_ids: APIExternalIdsObject;
}
