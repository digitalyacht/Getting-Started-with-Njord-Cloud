# Parent Guide Steps
* Connect to your device via a terminal or directly, see `General Requirements`
* Log in
* Identify the device you're connecting, see `Listing USB Devices`

## VIAM setup

* Log into your VIAM account [here](https://app.viam.com)
* Select the correct organization at the top right of the screen (you can skip this step if your account is only linked to one organization)
* Select your boat
* Select the Module section in the bottom left to expand the menu (Image step 1)
* Select viamboat by viam-labs (Image step 2)
* Find the module `sensor > viam-labs:viamboat:boat-all-pgn` and click add (Image step 3)
* Name the sensor something memorable like `iKonvert-network`
* Pass the directory of the device in explained `Format` section

<div align="center">
    <img src="../../images/accessory tutorials/iKonvert_viam.jpg" width=70%>
</div>

## Format

For my example I will enter:

```
{
   "reader": "ikonvert:/dev/ttyUSB0"
}
```

This is because we are connecting an iKonvert device and it was found in `/dev/ttyUSB0`

You should then be able to see the readings in the GetReadings section of the page

<div align="center">
    <img src="../../images/accessory tutorials/iKonvert_viam_2.jpg" width=70%>
</div>

## Troubleshooting

If you don't see any readings and get an error along the lines of `nil readings`, please disconnect the iKonvert from the NMEA bus while keeping it plugged in on the USB and then reconnect it once the LEDs on the device turn off.