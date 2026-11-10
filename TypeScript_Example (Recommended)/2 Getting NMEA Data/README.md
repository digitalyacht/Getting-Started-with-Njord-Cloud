# Retrieving Live NMEA Data Using the `all-pgn` Module

## 1. Overview

The `all-pgn` module provides an interface for retrieving vehicle and marine telemetry data through the Viam platform.

For systems using a CAN-based NMEA 2000 network, this module can be particularly useful because NMEA 2000 uses the SAE J1939-derived Parameter Group Number (PGN) structure to identify and communicate different types of data.

By accessing the `all-pgn` resource through the Viam SDK, an application can retrieve available PGN readings and use them as the basis for a live NMEA data monitoring system.

This document explains how to access the resource, retrieve readings, interpret the returned data, and build a continuous data collection loop.

## 2. Understanding NMEA 2000 and PGNs

NMEA 2000 is a marine communication protocol built around CAN bus technology.

Devices connected to an NMEA 2000 network exchange information using messages identified by Parameter Group Numbers (PGNs).

Each PGN represents a particular category of information.

Examples include:

| PGN | Description | Example data |
|---|---|---|
| 127250 | Vessel Heading | Heading, deviation, variation |
| 127251 | Rate of Turn | Angular rate of turn |
| 127257 | Attitude | Pitch, roll, yaw |
| 127258 | Magnetic Variation | Magnetic variation |
| 128259 | Speed | Water-referenced and ground-referenced speed |
| 128267 | Water Depth | Depth below transducer |
| 129025 | Position, Rapid Update | Latitude and longitude |
| 129026 | COG & SOG, Rapid Update | Course over ground and speed over ground |
| 129029 | GNSS Position Data | Position, altitude, GNSS information |
| 130306 | Wind Data | Wind speed and wind angle |
| 130310 | Environmental Parameters | Temperature, pressure, humidity |

These PGNs allow different marine instruments, sensors, navigation systems, and engines to exchange structured information.

**Important:** NMEA 2000 PGNs are not identical to raw NMEA 0183 sentences. NMEA 0183 typically uses readable ASCII sentences such as `$GPGGA` and `$GPRMC`, whereas NMEA 2000 communicates structured binary CAN messages. PGN data must be decoded and, if required, converted into NMEA 0183 sentence formats.

## 3. Connecting to the `all-pgn` Resource

The first step is to establish a connection to the Viam machine.

```typescript
import * as VIAM from '@viamrobotics/sdk';

const host = 'njordlinkplus.8zk1430e27.viam.cloud';

const machine = await VIAM.createRobotClient({
    host,
    credentials: {
        type: 'api-key',
        payload: '<API-KEY>',
        authEntity: '<API-KEY-ID>',
    },
    signalingAddress: 'https://app.viam.com:443',
});
```

Once connected, create a sensor client for the `all-pgn` resource.

```typescript
const allPgnClient = new VIAM.SensorClient(
    machine,
    'all-pgn'
);
```

The `SensorClient` provides access to the sensor interface exposed by the resource.

## 4. Retrieving PGN Readings

The key method is `getReadings()`.

```typescript
const readings = await allPgnClient.getReadings();

console.log('NMEA PGN readings:', readings);
```

This requests the current readings exposed by the `all-pgn` resource.

The returned object contains the data made available by the underlying module.

The precise structure depends on how `all-pgn` has been implemented and configured.

For this reason, the first step should be to inspect the returned object rather than assume particular property names.

```typescript
console.dir(readings, {
    depth: null,
    colors: true
});
```

This makes it easier to identify:
- Available PGNs.
- Individual sensor values.
- Timestamps, if provided.
- Whether readings are grouped by PGN or exposed as individual fields.

## 5. Implementing Continuous Live Data Collection

To monitor incoming NMEA data continuously, call `getReadings()` repeatedly.

The following example polls the resource once per second.

```typescript
import * as VIAM from '@viamrobotics/sdk';

const main = async () => {

    const machine = await VIAM.createRobotClient({
        host: '<host>',
        credentials: {
            type: 'api-key',
            payload: '<API-KEY>',
            authEntity: '<API-KEY-ID>',
        },
        signalingAddress: 'https://app.viam.com:443',
    });

    const allPgnClient = new VIAM.SensorClient(
        machine,
        'all-pgn'
    );

    console.log('Starting live PGN monitoring...');

    while (true) {
        try {
            const readings = await allPgnClient.getReadings();

            console.log(
                new Date().toISOString(),
                readings
            );

        } catch (error) {
            console.error(
                'Error retrieving PGN readings:',
                error
            );
        }

        await new Promise(resolve =>
            setTimeout(resolve, 1000)
        );
    }
};

main().catch(console.error);
```

This implementation:

1. Connects to the Viam machine.
2. Creates the `all-pgn` sensor client.
3. Requests readings continuously.
4. Handles individual polling errors without terminating the monitoring loop.

**Note:** This is a polling implementation, not a guaranteed real-time CAN stream. The update frequency is limited by the underlying resource's sampling behaviour, Viam communication latency, and the polling interval.

A one-second polling interval does not guarantee that every individual CAN message will be captured.

## 6. Understanding the Difference Between Live PGN Data and NMEA Sentences

There are two important stages in retrieving and using NMEA information.

<escape>```text
NMEA 2000 Network
        |
        v
     CAN Bus
        |
        v
   PGN Messages
        |
        v
   all-pgn Module
        |
        v
   Viam SensorClient
        |
        v
    getReadings()
        |
        v
  Decoded PGN Data
        |
        v
  Application Processing
        |
        +------------------+
        |                  |
        v                  v
  Live Dashboard     NMEA 0183 Conversion
                           |
                           v
                    ASCII Sentences
                    $GPGGA
                    $GPRMC
                    $GPGLL
                    $GPVTG
```</escape>

The `all-pgn` resource should be treated as the source of PGN readings.

If the application requires traditional NMEA 0183 output, an additional conversion layer is needed.

For example:

| NMEA 2000 PGN | Potential NMEA 0183 equivalent |
|---|---|
| 129025 | GLL |
| 129026 | VTG |
| 129029 | GGA |
| 127250 | HDT or HDM, depending on available heading reference |
| 130306 | MWV |

The conversion must account for the actual fields available, their units, validity, reference systems, and required NMEA sentence formatting.

Not every PGN has a direct NMEA 0183 equivalent.

## 7. Extracting Individual PGNs

Once the structure returned by `getReadings()` has been inspected, individual PGN values can be extracted.

For example, if the resource returns an object keyed by PGN number:

```typescript
const readings = await allPgnClient.getReadings();

const position = readings['129025'];
const heading = readings['127250'];
const wind = readings['130306'];

console.log('Position:', position);
console.log('Heading:', heading);
console.log('Wind:', wind);
```

This is illustrative only. The actual property names and structure must be confirmed from the resource output before implementing this extraction logic.

## 8. Potential Applications

Once the PGN readings are accessible, they can be used in several ways:

- **Live navigation dashboard:** Display vessel position, heading, speed, and course.
- **Engine monitoring:** Monitor engine-related PGNs and operational parameters.
- **Environmental monitoring:** Display wind speed, water depth, and temperature.
- **Data logging:** Store readings for historical analysis.
- **Remote diagnostics:** Monitor the vessel's NMEA 2000 network remotely through Viam.
- **NMEA 0183 gateway:** Convert selected NMEA 2000 PGNs into traditional NMEA 0183 sentences for other applications.

## 9. Important Considerations

Before relying on `all-pgn` for continuous NMEA monitoring, several implementation details should be established.

| Consideration | Explanation |
|---|---|
| Update frequency | Determine how frequently the resource refreshes its readings. |
| Message timestamps | Establish whether timestamps represent the original CAN message time or the time the reading was retrieved. |
| PGN coverage | Confirm which PGNs are actually exposed by the module. |
| Data freshness | Check whether returned values are newly received or cached readings. |
| Missing data | Account for PGNs that are not currently being transmitted. |
| Units | Confirm whether values are raw, decoded, or converted into engineering units. |
| CAN message frequency | Polling may miss intermediate updates between requests. |
| Connection reliability | Handle temporary network and Viam connection failures. |

For high-frequency applications, a streaming or event-driven interface is preferable to repeated polling, if supported by the underlying resource.

## 10. Recommended Development Approach

The recommended approach is to build the application incrementally.

1. Connect to the Viam machine using the TypeScript SDK.
2. Instantiate the `all-pgn` sensor client.
3. Call `getReadings()` and inspect the complete returned structure.
4. Identify the available PGNs and their associated fields.
5. Determine which PGNs contain the required navigation and vessel telemetry.
6. Establish the actual reading update frequency and timestamp semantics.
7. Implement continuous collection and data logging.

## Conclusion

The `all-pgn` module is the key starting point for accessing NMEA 2000-related telemetry through this Viam implementation.

By using:

```typescript
const allPgnClient = new VIAM.SensorClient(machine, 'all-pgn');

const readings = await allPgnClient.getReadings();
```

the application can retrieve the PGN readings exposed by the machine and use them as the foundation for a live marine telemetry application.

The most important next step is to inspect the actual `all-pgn` return structure. Once the available PGNs, field definitions, and update behavior are understood, it becomes possible to build reliable navigation displays, data logging systems, remote monitoring tools, and NMEA 0183 conversion functionality.