<script lang="ts">
    import * as VIAM from "@viamrobotics/sdk";
    import {
        PUBLIC_MACHINE_HOST,
        PUBLIC_MACHINE_PAYLOAD,
        PUBLIC_MACHINE_AUTH_ENTITY,
    } from "$app/env/public";
    import { onDestroy, onMount } from "svelte";

    let allPgnClient: VIAM.SensorClient | undefined = $state();
    let allPgnData: any = $state({});
    let machine: VIAM.Client | undefined = $state();

    // make sure to disconnect from the machine when appropriate
    onDestroy(() => {
        machine?.disconnect();
    });

    onMount(main); // runs our main function

    async function main() {

        // dev code to check that env vars have loaded
        // console.log(`host: ${PUBLIC_MACHINE_HOST}`)
        // console.log(`payload: ${PUBLIC_MACHINE_PAYLOAD}`)
        // console.log(`auth entity: ${PUBLIC_MACHINE_AUTH_ENTITY}`)

        machine = await VIAM.createRobotClient({
            host: PUBLIC_MACHINE_HOST,
            credentials: {
                type: "api-key",
                /* Replace "<API-KEY>" (including brackets) with your machine's API key */
                payload: PUBLIC_MACHINE_PAYLOAD,
                /* Replace "<API-KEY-ID>" (including brackets) with your machine's API key ID */
                authEntity: PUBLIC_MACHINE_AUTH_ENTITY,
            },
            signalingAddress: "https://app.viam.com:443",
        });

        console.log("Resources:");
        console.log(await machine.resourceNames()); // this is causing the warning 'console_log_state', this is fine for the demo

        // Example
        const exampleClient = new VIAM.CameraClient(machine, "Example");
        const exampleReturnValue = await exampleClient.getImages();
        console.log("Example getImages return value:", exampleReturnValue);

        // Note that the following block is commented out because it may actuate
        // or because its argument semantics are unknown. Use with caution.
        // Example-ptz
        // const examplePtzClient = new VIAM.GenericComponentClient(machine, 'Example-ptz');
        // const examplePtzReturnValue = await examplePtzClient.doCommand(VIAM.Struct.fromJson({}));
        // console.log('Example-ptz doCommand return value:', examplePtzReturnValue);

        // hwm-temps
        const hwmTempsClient = new VIAM.SensorClient(machine, "hwm-temps");
        const hwmTempsReturnValue = await hwmTempsClient.getReadings();
        console.log("hwm-temps getReadings return value:", hwmTempsReturnValue);

        // hwm-memory
        const hwmMemoryClient = new VIAM.SensorClient(machine, "hwm-memory");
        const hwmMemoryReturnValue = await hwmMemoryClient.getReadings();
        console.log(
            "hwm-memory getReadings return value:",
            hwmMemoryReturnValue,
        );

        // hwm-disk
        const hwmDiskClient = new VIAM.SensorClient(machine, "hwm-disk");
        const hwmDiskReturnValue = await hwmDiskClient.getReadings();
        console.log("hwm-disk getReadings return value:", hwmDiskReturnValue);

        // all-pgn
        allPgnClient = new VIAM.SensorClient(machine, "all-pgn");
        allPgnData = await allPgnClient.getReadings();
        console.log("all-pgn getReadings return value:", allPgnData); // this is causing the warning 'console_log_state', this is fine for the demo

        // Note that the pin supplied is a placeholder. Please change this to a valid pin you are using.
        // local
        const localClient = new VIAM.BoardClient(machine, "local");
        const localReturnValue = await localClient.getGPIO("16");
        console.log("local getGPIO return value:", localReturnValue);

        // Note that the following block is commented out because it may actuate
        // or because its argument semantics are unknown. Use with caution.
        // sender
        // const senderClient = new VIAM.GenericComponentClient(machine, 'sender');
        // const senderReturnValue = await senderClient.doCommand(VIAM.Struct.fromJson({}));
        // console.log('sender doCommand return value:', senderReturnValue);

        // location
        const locationClient = new VIAM.MovementSensorClient(
            machine,
            "location",
        );
        const locationReturnValue =
            await locationClient.getLinearAcceleration();
        console.log(
            "location getLinearAcceleration return value:",
            locationReturnValue,
        );

        // event-manager
        const eventManagerClient = new VIAM.SensorClient(
            machine,
            "event-manager",
        );
        const eventManagerReturnValue = await eventManagerClient.getReadings();
        console.log(
            "event-manager getReadings return value:",
            eventManagerReturnValue,
        );

        // Note that the following block is commented out because it may actuate
        // or because its argument semantics are unknown. Use with caution.
        // web-ui
        // const webUiClient = new VIAM.GenericServiceClient(machine, 'web-ui');
        // const webUiReturnValue = await webUiClient.doCommand(VIAM.Struct.fromJson({}));
        // console.log('web-ui doCommand return value:', webUiReturnValue);

        // data-manager
        const dataManagerClient = new VIAM.DataManagerClient(
            machine,
            "data-manager",
        );
        const dataManagerReturnValue = await dataManagerClient.sync();
        console.log("data-manager sync return value:", dataManagerReturnValue);

        // Note that the following block is commented out because it may actuate
        // or because its argument semantics are unknown. Use with caution.
        // firebase-push
        // const firebasePushClient = new VIAM.GenericServiceClient(machine, 'firebase-push');
        // const firebasePushReturnValue = await firebasePushClient.doCommand(VIAM.Struct.fromJson({}));
        // console.log('firebase-push doCommand return value:', firebasePushReturnValue);
    };

    main().catch((error: unknown) => {
        console.error("encountered an error:", error);
    });

    // this code includes the basic sorting, notice how the first refresh un-jumbles the data shown on the page
    async function getAllPgnData() {
        if (allPgnClient) {
            const unsorted: any = await allPgnClient.getReadings();
            const sortedKeys = Object.keys(unsorted).sort();
            allPgnData = {};
            sortedKeys.forEach((key) => {
                let sortedData: any = {};
                const unsortedSubKeys = unsorted[key];
                const sortedSubKeys = Object.keys(unsortedSubKeys).sort();
                sortedSubKeys.forEach((subKey) => {
                    sortedData[subKey] = unsortedSubKeys[subKey];
                });
                allPgnData[key] = sortedData;
            });
            console.log("Data updated!");
        }
    }
</script>

<div>
    {#if allPgnClient != undefined}
        <button onclick={getAllPgnData}>Refresh Data</button>

        <pre>
        {JSON.stringify(allPgnData, null, 2)}
    </pre>
    {:else}
        <p>getting data...</p>
    {/if}
</div>
