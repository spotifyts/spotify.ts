export interface SpotifyAuthenticationError {
	error: string;
	error_description: string;
}

export interface SpotifyRegularError {
	error: {
		status: number;
		message: string;
	};
}

export class SpotifyAPIError extends Error {
	/**
	 * The error code returned by the API.
	 */
	public code: number;

	/**
	 * The error identifier.
	 */
	public error?: string | null;

	public constructor(message: string, code: number, error_identifier?: string | null, statusText?: string | null) {
		super(message);

		this.message = message ?? 'An error occured';
		this.code = code;

		if (error_identifier) this.error = error_identifier;

		this.error = statusText;
	}
}
