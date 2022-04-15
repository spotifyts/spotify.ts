import phin from 'phin';
import { URLSearchParams } from 'node:url';
import { RequestMethods, SpotifyAPIError, type Client } from '..';

export async function getAccessToken(client: Client) {
	const { clientId, clientSecret } = client.options;
	const encodedCreds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

	const { body, statusCode } = await phin({
		method: RequestMethods.Post,
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization: `Basic ${encodedCreds}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
		parse: 'json'
	});

	const parsed = body as SpotifyAPIAccessTokenResponse;
	if (parsed.error && parsed.error_description) throw new SpotifyAPIError(parsed.error_description, statusCode!, parsed.error);

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
