import * as VIAM from '@viamrobotics/sdk';

const main = async () => {
    
    const host = 'njordlinkplus.8zk1430e27.viam.cloud';

    const machine = await VIAM.createRobotClient({
        host,
        credentials: {
            type: 'api-key',
            /* Replace "<API-KEY>" (including brackets) with your machine's API key */
            payload: '<API-KEY>',
            /* Replace "<API-KEY-ID>" (including brackets) with your machine's API key ID */
            authEntity: '<API-KEY-ID>',
        },
        signalingAddress: 'https://app.viam.com:443',
    });

    console.log('Resources:');
    console.log(await machine.resourceNames());

    // hwm-temps
    const hwmTempsClient = new VIAM.SensorClient(machine, 'hwm-temps');
    const hwmTempsReturnValue = await hwmTempsClient.getReadings();
    console.log('hwm-temps getReadings return value:', hwmTempsReturnValue);

    // hwm-memory
    const hwmMemoryClient = new VIAM.SensorClient(machine, 'hwm-memory');
    const hwmMemoryReturnValue = await hwmMemoryClient.getReadings();
    console.log('hwm-memory getReadings return value:', hwmMemoryReturnValue);

    // hwm-disk
    const hwmDiskClient = new VIAM.SensorClient(machine, 'hwm-disk');
    const hwmDiskReturnValue = await hwmDiskClient.getReadings();
    console.log('hwm-disk getReadings return value:', hwmDiskReturnValue);

    // all-pgn
    const allPgnClient = new VIAM.SensorClient(machine, 'all-pgn');
    const allPgnReturnValue = await allPgnClient.getReadings();
    console.log('all-pgn getReadings return value:', allPgnReturnValue);

    // Note that the pin supplied is a placeholder. Please change this to a valid pin you are using.
    // local
    const localClient = new VIAM.BoardClient(machine, 'local');
    const localReturnValue = await localClient.getGPIO('16');
    console.log('local getGPIO return value:', localReturnValue);

    // Note that the following block is commented out because it may actuate
    // or because its argument semantics are unknown. Use with caution.
    // sender
    // const senderClient = new VIAM.GenericComponentClient(machine, 'sender');
    // const senderReturnValue = await senderClient.doCommand(VIAM.Struct.fromJson({}));
    // console.log('sender doCommand return value:', senderReturnValue);

    // location
    const locationClient = new VIAM.MovementSensorClient(machine, 'location');
    const locationReturnValue = await locationClient.getLinearAcceleration();
    console.log('location getLinearAcceleration return value:', locationReturnValue);

    // event-manager
    const eventManagerClient = new VIAM.SensorClient(machine, 'event-manager');
    const eventManagerReturnValue = await eventManagerClient.getReadings();
    console.log('event-manager getReadings return value:', eventManagerReturnValue);

    // data-manager
    const dataManagerClient = new VIAM.DataManagerClient(machine, 'data-manager');
    const dataManagerReturnValue = await dataManagerClient.sync();
    console.log('data-manager sync return value:', dataManagerReturnValue);

    // Note that the following block is commented out because it may actuate
    // or because its argument semantics are unknown. Use with caution.
    // firebase-push
    // const firebasePushClient = new VIAM.GenericServiceClient(machine, 'firebase-push');
    // const firebasePushReturnValue = await firebasePushClient.doCommand(VIAM.Struct.fromJson({}));
    // console.log('firebase-push doCommand return value:', firebasePushReturnValue);
};

main().catch((error: unknown) => {
    console.error('encountered an error:', error);
});
