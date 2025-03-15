// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},
	experimental: {
		clientFallback: true,
	},

	modules: [
		"@nuxt/eslint",
		"@nuxtjs/tailwindcss",
		"@nuxt/fonts",
		"@vueuse/nuxt",
	],
	runtimeConfig: {
		public: {
			API: process.env.API || "http://127.0.0.1:8080/ps_storage/",
		},
	},
})
