# Sending Statuses using the doCommand

## Description

The `setNewSwitchStatuses()` function sends a command using the Viam TypeScript SDK to update the statuses of multiple switches on a device.

It constructs a PGN (Parameter Group Number) command containing the target device instance and the desired state of each switch. The command is then sent using the `senderClient` client, which references the `all-pgn` resource.

The function supports updating multiple switches in a single command.

## Function  Parameters

| Parameter | Type | Description |
|---|---|---|
| `switchSendPgn` | `number` | The PGN identifier used for the outgoing switch status command. |
| `instance` | `number` | The instance ID of the device that will receive the command. |
| `switchStates` | `any[]` | An array containing the IDs and desired states of the switches to update. |

### `switchStates` Array Structure

Each element in the `switchStates` array must contain the following properties:

| Property | Type | Description |
|---|---|---|
| `id` | `number` | The identifier of the switch to update. Used to construct the corresponding `Switch` field in the PGN message. |
| `state` | `boolean` | The desired switch state. `true` represents ON, while `false` represents OFF. |

## Switch State Mapping

The function converts the boolean state of each switch into a value understood by the PGN command.

| `entry.state` | Command Value | Description |
|---|---|---|
| `true` | `"On"` | Turns the switch ON. |
| `false` | `"Off"` | Turns the switch OFF. |
| Any other value (including `undefined`) | `"0b11"` | Uses the default binary value. |

## Command Structure

Before sending the command, the function constructs a `doCommand` object with the following structure:

```typescript
{
    pgn: switchSendPgn,
    src: 255,
    fields: {
        Instance: instance,
        Switch1: "On",
        Switch2: "Off",
        Switch3: "0b11"
    }
}
```

The example above illustrates the expected structure; the actual switch fields are generated dynamically based on the contents of `switchStates`.

**Command properties:**

- **`pgn`**: Specifies the PGN associated with the outgoing switch command.
- **`src`**: Set to `255`, representing a general broadcast source. Although the Viam documentation indicates that this field is optional, it is explicitly included because omitting it causes an error in the current implementation.
- **`fields.Instance`**: Identifies the device instance that the command is intended for.
- **`fields.SwitchX`**: Contains the requested state for each switch, where `X` corresponds to the switch ID.

## Execution Flow

1. **Initialize the command object:** Creates the PGN command with the supplied PGN number, broadcast source (`255`), and target device instance.
2. **Iterate through the switches:** Loops through every entry in the `switchStates` array.
3. **Determine switch state:** Checks the boolean value of each switch:
   - If `true`, assigns `"On"`.
   - If `false`, assigns `"Off"`.
   - Otherwise, retains the default value of `"0b11"`.
4. **Populate command fields:** Dynamically adds each switch to the `fields` object using the format `Switch{id}`.
5. **Send the command:** Calls `senderClient.doCommand(doObj)` to transmit the completed command through the `all-pgn` client.

## Example Usage

```typescript
const switchStates = [
    { id: 1, state: true },
    { id: 2, state: false },
    { id: 3, state: true },
    { id: 4, state: false }
];

setNewSwitchStatuses(123456, 1, switchStates);
```

In this example:

- PGN `123456` is used for the outgoing command.
- Device instance `1` is targeted.
- Switches 1 and 3 are set to ON.
- Switches 2 and 4 are set to OFF.

The resulting command fields would be:

```typescript
{
    Instance: 1,
    Switch1: "On",
    Switch2: "Off",
    Switch3: "On",
    Switch4: "Off"
}
```

## Dependencies and Requirements

- **Viam TypeScript SDK:** Used to communicate with the device through the `doCommand()` interface.
- **`senderClient`:** Must be an initialized Viam client referencing the `all-pgn` resource.
- **PGN identifier:** A valid PGN must be supplied through `switchSendPgn`.
- **Device instance:** A valid instance ID must be supplied to identify the target device.

## Notes

- The function dynamically generates switch fields, so the number of switches processed depends on the length of the `switchStates` array.
- The function does not validate switch IDs or the contents of the `switchStates` array.
- The function currently uses `any` for the `switchStates` parameter and command object.
- The `doCommand()` call is not awaited, so this implementation does not explicitly wait for the command to complete or handle asynchronous errors.
- The default value `"0b11"` is used when a switch state is neither `true` nor `false`. This may be useful for representing an unspecified or unchanged switch state, depending on the PGN implementation.

