<script lang="ts">
    // import { getApiCreds } from "$lib/code/Utils";
    import { onMount } from "svelte";
    import * as VIAM from "@viamrobotics/sdk";
    // import { defineRobotApiKey } from "$lib/code/viam/AuthDefs";
    import DigitalYachtViamDataCard from "$lib/components/DYViamCard.svelte";
    import { PUBLIC_API_KEY_ID, PUBLIC_API_KEY_SECRET, PUBLIC_MACHINE_ADDRESS } from "$env/static/public";

    const SigAddr = 'https://app.viam.com:443';

    let allPgnReturnValue = $state();
    let dataCardData: any[] = $state([]);
    let gettingData: boolean = $state(false);

    onMount(() => {
        main();
    });

    function defineRobotApiKey(): VIAM.DialConf {
        return {
            host: PUBLIC_MACHINE_ADDRESS,
            credentials: {
                type: "api-key",
                payload: PUBLIC_API_KEY_SECRET,
                authEntity: PUBLIC_API_KEY_ID,
            },
            signalingAddress: SigAddr,
        }
    }

    async function main() {
        // ui
        gettingData = true;
        // connection setup
        const creds = defineRobotApiKey();
        const machine = await VIAM.createRobotClient(creds);
        // GET all-pgn
        const allPgnClient = new VIAM.SensorClient(machine, "all-pgn");
        allPgnReturnValue = await allPgnClient.getReadings();
        dataCardData = Object.values((allPgnReturnValue as any));
        // ui
        gettingData = false;
    }
</script>

<div class="p-2">
    {#if dataCardData.length}
        <button onclick={main} class="border rounded-md bg-gray-100 mr-1 px-1">
            {#if gettingData}
                Getting Data...
            {:else}
                Refresh Data
            {/if}
        </button>
        <a id="grid" href="#json">Jump to JSON</a>
        <div
            class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
        >
            {#each dataCardData as entry}
                <DigitalYachtViamDataCard
                    title={entry.title ?? ""}
                    value={entry}
                    hasToggleEvent={false}
                />
            {/each}
        </div>
        <a id="json" href="#grid">Jump to Grid</a>
        <pre class="bg-gray-100 p-2">{JSON.stringify(allPgnReturnValue, null, 2)}</pre>
        <!-- <pre class="bg-gray-100 p-2">{JSON.stringify(dataCardData, null, 2)}</pre> -->
    {:else}
        <p>Getting Data...</p>
    {/if}
</div>

<style>
	a {
		color: blue;
		text-decoration: underline;
	}
</style>
