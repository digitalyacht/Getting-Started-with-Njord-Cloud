import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_MACHINE_HOST: {
		public: true
	},
	PUBLIC_MACHINE_PAYLOAD: {
		public: true
	},
	PUBLIC_MACHINE_AUTH_ENTITY: {
		public: true
	},
});