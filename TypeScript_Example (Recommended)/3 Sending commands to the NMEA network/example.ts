function setNewSwitchStatuses(switchSendPgn: number, instance: number, switchStates: any[]){
    let doObj: any = {
        "pgn": switchSendPgn,
        "src": 255, // general broadcast - according to the docs this value is optional but I get an error when it's not included
        "fields": {
            "Instance": instance, // device we are sending the message to
        }
    };

    // add switches to request (runs 28 times)
    for(let i = 0; i < switchStates.length; i++){
        let entry = switchStates[i];
        let value: any = "0b11";

        if (entry.state === true) value = "On";
        else if (entry.state === false) value = "Off";

        doObj.fields[`Switch${entry.id}`] = value;
    }

    console.log("sending command...");
    senderClient.doCommand(doObj); // this sender client refers to the sender module
}