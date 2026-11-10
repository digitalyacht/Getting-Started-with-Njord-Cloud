<script lang="ts">
	import { onMount } from 'svelte';
	import * as VIAM from '@viamrobotics/sdk';
	import {
		PUBLIC_FUSION_AUTH_CLIENT_ID,
		PUBLIC_FUSION_AUTH_URL,
		PUBLIC_LOGIN_CALLBACK
	} from '$env/static/public';

	const href = encodeURI(
		PUBLIC_FUSION_AUTH_URL +
			'/oauth2/authorize?client_id=' +
			PUBLIC_FUSION_AUTH_CLIENT_ID +
			'&response_type=code&redirect_uri=' +
			PUBLIC_LOGIN_CALLBACK
	);

	let orgID: string | undefined;
	let tabularData: any | undefined;
	let accessToken: string | undefined;
	let viamClient: VIAM.ViamClient | undefined;

	/**
	 * Connects to the Viam client using the provided access token.
	 * @param accessToken - The access token for authentication.
	 * @returns A promise that resolves when the connection is established.
	 */
	async function connect(accessToken: string): Promise<any> {
		const opts: VIAM.ViamClientOptions = {
			credentials: {
				type: 'access-token',
				payload: accessToken
			}
		};
		viamClient = await VIAM.createViamClient(opts);
		console.log('Connected to Viam');
		return 'connected';
	}

	/**
	 * Retrieves the organization ID and tabular data.
	 * @returns A promise that resolves with the organization ID and tabular data.
	 */
	async function getData() {
		orgID = await getOrgID();
		if (orgID) {
			tabularData = await getTabularData(orgID);
		}

		return { orgID, tabularData };
	}

	/**
	 * Retrieves the Viam organization ID.
	 * @returns A promise that resolves with the organization ID.
	 */
	async function getOrgID() {
		if (viamClient) {
			const orglist = await viamClient.appClient.listOrganizations();
			return orglist[0].id ?? null;
		}
	}

	/**
	 * Retrieves tabular data from the specified organization.
	 * @param orgID - The organization ID.
	 * @returns A promise that resolves with the tabular data.
	 */
	async function getTabularData(orgID: string) {
		if (viamClient) {
			const tabularData = viamClient.dataClient.tabularDataByMQL(orgID, [{ $limit: 1 }]);
			return tabularData;
		}
	}

	/**
	 * Retrieves the value of the specified cookie.
	 * @param name - The name of the cookie.
	 * @returns The value of the cookie, or undefined if the cookie is not found.
	 */
	function getCookie(name: string): string | undefined {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop()?.split(';').shift();
	}

	onMount(() => {
		accessToken = getCookie('access_token');
	});
</script>

<h1>Welcome to Viam OAuth</h1>
{#if accessToken}
	<strong>My Viam Data</strong>
	{#await connect(accessToken)}
		<p>Connecting...</p>
	{:then}
		{#await getData()}
			<p>Getting data...</p>
		{:then data}
			<p>My Organization ID: "{data.orgID}"</p>
			<p>My Tabular Data:"</p>
			<pre>{JSON.stringify(data.tabularData, null, 2)}</pre>
		{/await}
	{/await}
{:else}
	<a {href}>Login</a>
{/if}
