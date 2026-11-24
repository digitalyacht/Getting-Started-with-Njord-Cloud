import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MACHINE_HOST: {
		public: true // in a production application you'll want to consider not having this public
	},
	MACHINE_PAYLOAD: {
		public: true // in a production application you'll want to consider not having this public
	},
	MACHINE_AUTH_ENTITY: {
		public: true // in a production application you'll want to consider not having this public
	},
});