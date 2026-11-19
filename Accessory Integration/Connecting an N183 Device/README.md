# Parent Guide Steps
* Connect to your device via a terminal or directly, see `General Requirements`
* Log in
* Identify the device you're connecting, see `Listing USB Devices`

## VIAM setup

* Log into your VIAM account [here](https://app.viam.com)
* Select the correct organization at the top right of the screen (you can skip this step if your account is only linked to one organization)
* Select your boat
* Select the nmea0183 block (Image step 1)
* Pass the directory of the device in explained `Format` section (Image step 2)

<div align="center">
    <img src="../../images/accessory tutorials/n183_viam.jpg" width=70%>
</div>

## Format

For my example I will enter:

```
{
   "reader": "serial:/dev/ttyUSB1"
}
```

This is because we are connecting a serial device and it was found in `/dev/ttyUSB1`

You should then be able to see the readings in the GetReadings section of the page

<div align="center">
    <img src="../../images/accessory tutorials/n183_viam_2.jpg" width=70%>
</div>

List of suitable configs:
```
{
  "src": "udp:20009"
}

{
  "src": "net:3000"
}

{
  "src": "serial:/dev/tttyUSB0"
}

```