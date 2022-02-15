export interface RequestDataOptions<Q, B> {
	query?: Q;
	body?: B;
}

export class RequestData<Q = undefined, B = undefined> {
	public query?: Q;
	public body?: B;

	public constructor(data: RequestDataOptions<Q, B>) {
		this.query = data.query;
		this.body = data.body;
	}
}
