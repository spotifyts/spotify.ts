import type { APIImage } from '.';

export interface APICategory {
	id: string;
	name: string;
	href: string;
	icons: APIImage[];
}
