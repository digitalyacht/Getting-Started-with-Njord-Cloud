# Guide and Links
The code in this repo uses the viam:viamrtsp module

[GitHub link (has a useful readme too)](https://github.com/viam-modules/viamrtsp)

[VIAM module registry link](https://app.viam.com/module/viam/viamrtsp)

## Preface (general pitfalls are in here)

- This guide was developed with a Reolink TrackMix PoE, different cameras that ***SHOULD*** work with this can be found [on ipcamlive](https://www.ipcamlive.com/), if you scroll down to the footer and look at the 'Main partners' section.
- The process for this guide will vary to some degree based off the brand of camera you have, but this should cover the bases.
- You'll want to verify that your camera is working with an official app before using this module as you may encounter issues getting this module set up.
- If ONVIF discovery does not work, you'll want to get your cameras IP address from your router on another network discovery tool. The most common IP addresses to access your router are `192.168.1.1` and `192.168.0.1`.
- Some brands will require you to set up a local account for the camera so that you can access it from any local IP address, these credentials are what will be used for the `<username>:<password>`
- If you don't need to set up a username and password then your address will be slightly different (It will be noted at the appropriate point)

## Camera Discovery Methods

***PLEASE NOTE:*** I was unable to get the discovery working with the Reolink camera, this is likely going to be the same for all Reolink cameras and potentially other brands as the module was made built with a different camera in mind.

### ONVIF Auto-Discovery
- Uses ONVIF to find cameras on the local network
- Works via UDP multicast — camera and host must be on the same subnet
- Returns device info and RTSP endpoints automatically

**Using viamrtsp discovery tool:**
- Run the discovery binary to scan for ONVIF-compatible cameras
- It lists available cameras and their connection details

### Manual RTSP Input (Fallback method I used)
- If discovery fails, connect using a direct RTSP URL
- Formats:
    - `rtsp://<username>:<password>@<ip>:<port>/<path>` if you set up a local account.
    - `rtsp://<ip>:<port>/<path>` if you do not ***need*** to set a local account.
- Works with any RTSP-compatible camera
- The `<path>` is defined by the manufacturer, check their website or the user manual that came with your camera

## Setting Up a camera in Viam (Backend)

### 1. Add Camera Component
- Go to your machine in the Viam app
- Open the CONFIGURE tab
- Click + → Configuration block
- Search: `viamrtsp`
    - Its type will be: `camera`
- Click on `viamrtsp/rtsp`
- Click `Add Component`
- Provide the component a name and add the component

**NOTE:** You should now have a `viamrtsp` entry in your MODULES section (bottom left corner of the screen)

<div align="center">
<img src="../../images/rtsp cam guide/component search.png" width=70%>
</div>

### 2. Configure Attributes
Provide the RTSP stream details in JSON:

```json
{
    "rtp_passthrough": true,
    "rtsp_url": "rtsp://<username>:<password>@<ip>:<port>/<path>"
}
```
<div align="center">
<img src="../../images/rtsp cam guide/RTSP setup.png" width=70%>
</div>

### 3. Save & Test
- Save configuration
- Use the Test panel to verify the video stream

## Setting Up PTZ support in Viam (Backend)

### 1. Add PTZ Component
- Go to the CONFIGURE tab
- Go to the MODULES section (it may be minimised)
- Click on `viamrtsp`
- Click `Add` on `generic > viam:viamrtsp:onvif-ptz-client`
- Provide the component a name and add the component

<div align="center">
<img src="../../images/rtsp cam guide/add ONVIF PTZ.png" width=70%>
</div>

### 2. Configure Attributes
Provide the RTSP stream details in JSON then save:

```json
{
    "address": "<port>",
    "username": "<username>",
    "password": "<password>",
    "profile_token": "000"
}
```
<div align="center">
<img src="../../images/rtsp cam guide/RTSP setup.png" width=70%>
</div>

### 3. Get profiles

- In your component you want to go to the do command and get profiles available in your camera
```json
{"command": "get-profiles"}
```

### 4. Update Config
This process can be a bit repetitive to get the correct profile, the general flow is:

- Update the config
```json
{
    "address": "<port>",
    "username": "<username>",
    "password": "<password>",
    "profile_token": "<found_profile>"
}
```
- You'll want to use the camera controller tool in your NordLINK plus webapp to confirm if you have PTZ control
- You'll want to iterate through the options each time as some cameras don't support every movement option
- closing the popup window uses your changed settings, to avoid having to set these values each time you can save settings as a cookie

<div align="center">
<img src="../../images/rtsp cam guide/NjordLINK plus cam control.png" width=70%>
</div>