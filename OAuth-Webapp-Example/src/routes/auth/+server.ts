import type { RequestHandler } from '@sveltejs/kit';
import { FusionAuthClient } from '@fusionauth/typescript-client';

// Environment variables for FusionAuth configuration
import { FUSION_AUTH_CLIENT_SECRET } from '$env/static/private';
import {
	PUBLIC_FUSION_AUTH_CLIENT_ID,
	PUBLIC_LOGIN_CALLBACK,
	PUBLIC_FUSION_AUTH_URL
} from '$env/static/public';

// GET request handler for the OAuth callback
export const GET: RequestHandler = async (event) => {
	// Retrieve the authorization code from the URL query parameters
	const code = event.url.searchParams.get('code');
	if (!code) {
		// If the code is missing, return a 400 Bad Request response
		return new Response('Missing code', { status: 400 });
	}

	// Create a new FusionAuth client instance
	const client = new FusionAuthClient('noapikeyneeded', PUBLIC_FUSION_AUTH_URL);
	try {
		// Exchange the authorization code for an access token
		const response = await client.exchangeOAuthCodeForAccessToken(
			code,
			PUBLIC_FUSION_AUTH_CLIENT_ID,
			FUSION_AUTH_CLIENT_SECRET,
			PUBLIC_LOGIN_CALLBACK
		);

		// Retrieve the access token from the response
		const accessToken = response.response.access_token;
		if (!accessToken) {
			// If the access token is missing, return a 500 Internal Server Error response
			return new Response('Failed to retrieve access token', { status: 500 });
		}

		// Redirect to the home page with the access token set in a secure cookie
		return new Response(null, {
			status: 302,
			headers: {
				'Set-Cookie': `access_token=${accessToken}; Path=/; Secure; SameSite=Strict`,
				Location: '/'
			}
		});
	} catch (err) {
		// Log any errors that occur during the token exchange process
		console.error(err);
		// Return a 500 Internal Server Error response
		return new Response('Error exchanging OAuth code for access token', { status: 500 });
	}
};
