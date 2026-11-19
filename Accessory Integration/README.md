# General Requirements

Either peripherals or SSH knowledge
* Peripherals: Keyboard, Mouse, Micro-HDMI compatible media cable and monitor
* SSH: Your device IP address and a terminal tool your comfortable with using

Logging into your device:
* username: viam
* password: njord

We recommend that you change your device password if you plan you make the device publicly accessible to the internet.

# Terminal Commands

## Listing USB Devices

`lsusb` and `ls -l /dev/ttyUSB*`

This command lists what usb devices are connected to the NjordLINK plus.

For simplicity, I'd recommend running the commands before plugging in the device so you can compare the results once you have plugged in your device.

* `lsusb` can be used to confirm that the device is plugged in
* `ls -l /dev/ttyUSB*` is to find the value you need to put into VIAM to get your device to be picked up by VIAM

<div align="center">
    <img src="../images/accessory tutorials/device_commands.png" width=70%>
</div>

In this case we can see that I have connected a device and it can be accessed via `/dev/ttyUSB0`

If you notice that a device has been (re-assigned / stops working) after your NjordLINK plus has been restarted then you may have to do this step again & then reconfigure your device on VIAM.

## Changing Device Password

`passwd`

You'll be prompted for your:
* Current password
* New password
* Confirmation of new password

Please keep note of your password or change it to something rememberable as we will not be able to help you recover your password.

# Next Steps
Look at the sub-folders to get a guide specifically required for the devices oyu can use with the NjordLINK plus...
