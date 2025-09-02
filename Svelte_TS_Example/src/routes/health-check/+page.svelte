<script lang="ts">
    import {
        PUBLIC_API_KEY_ID,
        PUBLIC_API_KEY_SECRET,
        PUBLIC_MACHINE_ADDRESS,
    } from "$env/static/public";
    import { onDestroy, onMount } from "svelte";
    import * as VIAM from "@viamrobotics/sdk";
    import DigitalYachtViamDataCard from "$lib/components/DYViamCard.svelte";

    let allPgnReturnValue: any = $state(null);
    let dataCardData: any[] = $state([]);
    let gettingData: boolean = $state(false);
    let machine: VIAM.RobotClient;

    onMount(() => {
        getData();
    });

    onDestroy(() => {
        if (machine) machine.disconnect();
    });

    function defineRobotApiKey(): VIAM.DialConf {
        return {
            host: PUBLIC_MACHINE_ADDRESS,
            credentials: {
                type: "api-key",
                payload: PUBLIC_API_KEY_SECRET,
                authEntity: PUBLIC_API_KEY_ID,
            },
            signalingAddress: "https://app.viam.com:443",
        };
    }

    async function getData() {
        // ui
        gettingData = true;
        dataCardData = [];
        if (!machine) {
            console.log("connecting to machine...");
            machine = await VIAM.createRobotClient(defineRobotApiKey());
        } else console.log("using existing connecting to machine.");
        // GET all-pgn
        const allPgnClient = new VIAM.SensorClient(machine, "all-pgn");
        allPgnReturnValue = await allPgnClient.getReadings();
        if (allPgnReturnValue) {
            const organisedReadingKeys = Object.keys(
                allPgnReturnValue as any,
            ).sort((a, b) => a.localeCompare(b));
            organisedReadingKeys.forEach((key) => {
                dataCardData.push(allPgnReturnValue[key]);
            });
            dataCardData = Object.values(allPgnReturnValue as any);
        } else console.error("failed to get pgn data");
        // ui
        gettingData = false;
    }
</script>

<div class="p-2">
    {#if dataCardData.length}
        <button
            onclick={getData}
            class="border rounded-md bg-gray-100 mr-1 px-1"
        >
            Refresh Data
        </button>
        <a id="grid" href="#json">Jump to JSON</a>
        <!-- grid data -->
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
        <!-- JSON data -->
        <pre class="bg-gray-100 p-2">{JSON.stringify(
                allPgnReturnValue,
                null,
                2,
            )}</pre>
    {:else if gettingData}
        <!-- getting data state -->
        <p>Getting Data...</p>
    {:else}
        <!-- error state -->
        <p>Error getting data, may have recieved no data.</p>
        <button
            onclick={getData}
            class="border rounded-md bg-gray-100 mr-1 px-1"
        >
            Retry
        </button>
    {/if}
</div>

<style>
    a {
        color: blue;
        text-decoration: underline;
    }
</style>
