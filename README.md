# Njord Cloud SDK Quickstart

The Njord Cloud is built on Viam Cloud Technology and allows developers to access a boat's real-time and historical NMEA 2000 data, stored in the Njord Cloud. You will need to have purchased, installed and configured a NjordLINK device before you can proceed, so that you have a valid Viam account and a device that is sending data to the cloud.

## Pre-requisites

Creat a new folder in which the NjordLink SDK will be stored. Download a ZIP file of this repository and unzip it in the new NjordLink SDK folder.

In the same folder, create an `.env` file with the following content and add the appropriate values for your device. The easiest way to get the values is through app.viam.com:

```
VITE_ORG_ID=...
VITE_HOST=...
VITE_API_KEY_ID=...
VITE_API_KEY_SECRET=...
```

The VITE_ORG_ID is the Organisation ID which you can get in the Settings page of that organisation.

The VITE_HOST can be copied from the Device's CONNECT page, as can the two API KEYs if you click on API KEYS option.

Install the required packages:

`npm install`

## Usage

Run `npm run dev` and visit `localhost:5173` in a browser.
