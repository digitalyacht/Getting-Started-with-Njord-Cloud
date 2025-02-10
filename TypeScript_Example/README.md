# Viam TypeScript SDK MQL/SQL Querying Quickstart

This example demonstrates how to connect to the Viam app and make calls to it.

## Prerequisits

Install [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

Then install node/npm:

```
nvm use 22
```

## Setup

From within the project folder run `npm install`

Create a `.env` file in the project folder with the following content (replace the Organisation and API keys with the DY-Demo or your own Viam Account credentials):

```
VITE_ORG_ID="<ORG-ID>"
VITE_API_KEY_ID="<API-KEY-ID>"
VITE_API_KEY_SECRET="<API-KEY>"
```

## Usage

Run `npm run dev` 

<div align="center">
<img src="https://github.com/digitalyacht/Getting-Started-with-Njord-Cloud/blob/5d50a3e0b195bcee5ec81c3c6494d43e5bdca88a/images/VITE_Output.png" width=70%>
</div>

and visit `localhost:5173` in a browser. Press the button to execute the logic defined in `src/main.ts`.

<div align="center">
<img src="https://github.com/digitalyacht/Getting-Started-with-Njord-Cloud/blob/5d50a3e0b195bcee5ec81c3c6494d43e5bdca88a/images/TS_Output.png" width=70%>
</div>

## Code Modifications

Edit `src/main.ts` to change the logic being run. Edit `index.html` to change the layout of the app.

