export class RequestData<Q> {
	/**
	 * The query parameters of the request.
	 */
	public query?: Record<string, unknown>;

	public constructor(query?: Record<string, unknown>) {
		this.query = query;
	}

	public toString() {
		if (!this.query) return '';

		const params = new URLSearchParams(this.query as unknown as Record<string, string>);

		return params.toString();
	}
}
