<script lang="ts">
    import * as VIAM from "@viamrobotics/sdk";
    import {
        PUBLIC_ORG_ID,
        PUBLIC_API_KEY_ID,
        PUBLIC_API_KEY_SECRET,
    } from "$env/static/public";
    import { onMount } from "svelte";

    let buttonText: string = $state("Click to get data");
    let getAsMql: boolean = $state(true);
    let buttonDisabled: boolean = $state(true);
    let dataList: any = $state([]);
    let viamClient: VIAM.ViamClient;

    onMount(() => {
        main();
    })

    async function main() {
        try {
            buttonText = "Connecting...";
            console.log("connecting to VIAM...")
            viamClient = await connect();
            console.log("connected to VIAM!")
            buttonText = "Click to get data";
            buttonDisabled = false;

            console.log( await viamClient.dataClient.getDatabaseConnection(PUBLIC_ORG_ID) )

        } catch (error) {
            buttonText = "Unable to connect";
            console.error(error);
            return;
        }
    }

    async function connect(): Promise<VIAM.ViamClient> {
        const client = await VIAM.createViamClient({
            credentials: {
                type: "api-key",
                authEntity: PUBLIC_API_KEY_ID,
                payload: PUBLIC_API_KEY_SECRET,
            },
        });
        // console.log(client)
        return client;
    }

    async function run() {
        
        try {
            buttonDisabled = true;
            buttonText = "Getting data...";

            let response;
            if(getAsMql){

                // MQL
                console.log("Getting MQL...");
                response = await viamClient.dataClient.tabularDataByMQL(
                    PUBLIC_ORG_ID,
                    [{ $limit: 10 }],
                );

            } else {

                // SQL
                console.log("Getting SQL...");
                response = await viamClient.dataClient.tabularDataBySQL(
                    PUBLIC_ORG_ID,
                    "select * from readings limit 10"
                );

            }
            console.log(response);
            dataList = response;
            
        } finally {
            buttonDisabled = false;
            buttonText = "Click to get data";
        }
    }

    function toggleGet(){
        getAsMql = !getAsMql;
    }
</script>

<div>
    <button disabled={buttonDisabled} onclick={run}>
        {buttonText}
    </button>
    <br />
    <button onclick={toggleGet}>
        Currently getting data as '{getAsMql?'mql':'sql'}' (click to change)
    </button>
    <br />
    <br />
    <pre>{JSON.stringify(dataList, null, 2)}</pre>
</div>
