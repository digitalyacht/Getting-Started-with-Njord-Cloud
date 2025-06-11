<script lang="ts">
    // This code must be run in a browser environment.
    import * as VIAM from "@viamrobotics/sdk";
    import {
        PUBLIC_API_KEY_ID,
        PUBLIC_API_KEY_SECRET,
        PUBLIC_MACHINE_ADDRESS,
    } from "$env/static/public";
    import { onMount } from "svelte";

    const TEST_WAITING = "waiting";
    const TEST_PROGRESS = "testing...";
    const TEST_PASSED = "passed :)";
    const TEST_FAILED = "failed :(";

    let machine: VIAM.RobotClient;

    let connectionTest: string = $state(TEST_WAITING);
    let locationTest: string = $state(TEST_WAITING);
    let pgnTest: string = $state(TEST_WAITING);
    let localTest: string = $state(TEST_WAITING);
    let dataManagerTest: string = $state(TEST_WAITING);

    onMount(() => {
        main();
    });

    async function main() {
        connectionTest = TEST_PROGRESS;
        try {
            console.log("Trying to connect to machine...");
            machine = await VIAM.createRobotClient({
                host: PUBLIC_MACHINE_ADDRESS,
                credentials: {
                    type: "api-key",
                    payload: PUBLIC_API_KEY_SECRET,
                    authEntity: PUBLIC_API_KEY_ID,
                },
                signalingAddress: "https://app.viam.com:443",
            });
            console.log("Resources:");
            console.log(await machine.resourceNames());
            connectionTest = TEST_PASSED;
        } catch {
            connectionTest = TEST_FAILED;
        }

        // location
        locationTest = TEST_PROGRESS;
        try {
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
            locationTest = TEST_PASSED;
        } catch {
            locationTest = TEST_FAILED;
        }

        // all-pgn
        pgnTest = TEST_PROGRESS;
        try {
            const allPgnClient = new VIAM.SensorClient(machine, "all-pgn");
            const allPgnReturnValue = await allPgnClient.getReadings();
            console.log("all-pgn getReadings return value:", allPgnReturnValue);
            pgnTest = TEST_PASSED;
        } catch {
            pgnTest = TEST_FAILED;
        }

        // Note that the pin supplied is a placeholder. Please change this to a valid pin you are using.
        // local
        localTest = TEST_PROGRESS;
        try {
            const localClient = new VIAM.BoardClient(machine, "local");
            const localReturnValue = await localClient.getGPIO("16");
            console.log("local getGPIO return value:", localReturnValue);
            localTest = TEST_PASSED;
        } catch {
            localTest = TEST_FAILED;
        }

        // data_manager-1
        dataManagerTest = TEST_PROGRESS;
        try {
            const dataManager1Client = new VIAM.DataManagerClient(
                machine,
                "data_manager-1",
            );
            const dataManager1ReturnValue = await dataManager1Client.sync();
            console.log(
                "data_manager-1 sync return value:",
                dataManager1ReturnValue,
            );
            dataManagerTest = TEST_PASSED;
        } catch {
            dataManagerTest = TEST_FAILED;
        }

        if (machine) {
            console.log("Disconnecting from machine...");
            machine.disconnect();
        }
    }
</script>

<div class="h-screen w-screen p-2">
    <p>look in the console to see data responses</p>
    <p>code from https://app.viam.com/machine/[boatId]/connect/code-sample/typescript</p>
    <br />
    <pre>connectionTest:  {connectionTest}</pre>
    <pre>locationTest:    {locationTest}</pre>
    <pre>pgnTest:         {pgnTest}</pre>
    <pre>localTest:       {localTest}</pre>
    <pre>dataManagerTest: {dataManagerTest}</pre>
</div>
