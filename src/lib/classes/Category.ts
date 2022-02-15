import { Base } from '.';
import type { Client, APICategory } from '../';

export class Category extends Base {
	/**
	 * The Spotify category ID of the category.
	 */
	public id: string;

	/**
	 * The name of the category.
	 */
	public name: string;

	/**
	 * A link to the Web API endpoint returning full details of the category.
	 */
	public href: string;

	/**
	 * The category icon, in various sizes.
	 */
	public icons: APICategory['icons'];

	public constructor(client: Client, data: APICategory) {
		super(client);
		this.id = data.id;
		this.name = data.name;
		this.href = data.href;
		this.icons = data.icons;
	}
}
