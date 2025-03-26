import { URLSearchParams } from 'node:url';
import { RequestMethods, SpotifyAPIError, type Client } from '../';

export async function getAccessToken(client: Client) {
	const { clientId, clientSecret } = client.options;
	const encodedCreds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

	const data = await fetch('https://accounts.spotify.com/api/token', {
		method: RequestMethods.Post,
		headers: {
			Authorization: `Basic ${encodedCreds}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({ grant_type: 'client_credentials' }).toString()
	});

	const parsed = (await data.json()) as SpotifyAPIAccessTokenResponse;
	if (parsed.error && parsed.error_description) throw new SpotifyAPIError(parsed.error_description, data.status, parsed.error);

	client.options.accessToken = parsed.access_token;

	return {
		token: parsed.access_token,
		expiresIn: parsed.expires_in
	};
}

interface SpotifyAPIAccessTokenResponse {
	access_token: string;
	expires_in: number;
	error?: string;
	error_description?: string;
}
