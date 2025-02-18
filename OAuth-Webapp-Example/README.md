# Viam Svelte OAuth Web Application Starter Kit

This basic Svelte web application is supposed to help you quickly build a simple web application, allowing you to use OAuth for identification and access to Viam machines and cloud APIs.

Setting up OAuth with Viam is straightforward. It is assumed that you already have Viam account and a related organization setup!

To get Viam OAuth Setup, follow the instructions in the next section.

## Setup Viam OAuth

If you are familiar with Viam OAuth already you can directly configure and use the commands below. If you are new to Viam OAuth I recommend to follow the instructions here: [Viam OAuth](https://docs.viam.com/manage/manage/oauth/)

### Useful Viam OAuth CLI Commands

Create Viam OAuth Application:

```bash
viam organization auth-service oauth-app create \
--org-id=<VIAM ORG ID> \
--client-name="Viam OAuth Template App" \
--client-authentication=required \
--enabled-grants="password, authorization_code" \
--logout-uri="http://localhost:5173/logout" \
--origin-uris="http://localhost:5173" \
--redirect-uris="http://localhost:5173/auth" \
--pkce=not_required \
--url-validation=allow_wildcards
```

> **Note:** Make sure to store the received credentials `Client ID` and `Client Secret` securely!

Update Viam OAuth Application:

```bash
viam organization auth-service oauth-app update \
--org-id=<VIAM ORG ID> \
--client-id=<VIAM OAUTH CLIENT ID> \
--<KEY>=<VALUE TO UPDATE>
```

Read Existing OAuth Application:

```bash
viam organization auth-service oauth-app read \
--org-id=<VIAM ORG ID> \
--client-id=<VIAM OAUTH CLIENT ID>
```

## Use Svelte Application

This web application is written in Svelte simply because we like the framework. Of course Viam OAuth isn't limited to Svelte and you may find the source code helpful for whatever framework you prefer.

If you are new to Svelte, I recommend you start here:

1. [Svelte Introduction](https://svelte.dev/docs/kit/introduction)
2. [Great Svelte Data Flow Video](https://youtu.be/j3aliHghr3E)

For the app to work, you will have to create a `.env` file in the project directory. The easiest way is to copy/rename the `.env.example` and fill in the required fields for which you had received the information while setting up Viam OAuth.

## Developing

Once you've created a project and installed dependencies with `npm install`, start a development server:

> **Note:** To get the app working, you will have to create a `.env`file with `Client ID` and `Client Secret` securely!

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
