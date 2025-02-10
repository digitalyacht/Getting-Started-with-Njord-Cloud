# Viam TypeScript SDK MQL/SQL Querying Quickstart

This example demonstrates how to connect to the Viam cloud and query historic data using MQL or SQL.

## Prerequisits

You need Node.js to be installed!
We recommend using the node version manager [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) however feel free to user your own preference.

Using nvm you can then install the required node/npm version:

```
nvm use 22
```

## Install Dependencies

From within the project folder run `npm install`.

## Create `.env` file

The `.env`file is used to store and load your credentials for accessing the data via the script.
Create a file with the name `.env` and add the following content including your personal credentials:

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

Edit `src/main.ts` to change the logic/queries being run. Edit `index.html` to change the layout of the app.
