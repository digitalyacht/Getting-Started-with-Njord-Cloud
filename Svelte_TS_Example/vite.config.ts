import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		host: '0.0.0.0', // to enable webRTC stuff else server isn't config'd correctly, localhost doesn't work as we need external connection. todo: needs to do a check if we are running on prod or dev
	},
});
