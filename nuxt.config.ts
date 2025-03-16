// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		keepalive: true,
	},

	compatibilityDate: "2024-11-01",
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	experimental: {
		clientFallback: true,
		typedPages: true,
	},
	i18n: {
		defaultLocale: "ru",
		experimental: {
			typedOptionsAndMessages: "all",

			typedPages: true,
		},
		locales: [
			{ code: "en", language: "en-US" },
			{ code: "ru", language: "ru-RU" },
		],
	},
	modules: [
		"@nuxt/eslint",
		"@nuxtjs/tailwindcss",
		"@nuxt/fonts",
		"@vueuse/nuxt",
		"@nuxtjs/i18n",
	],
	runtimeConfig: {
		public: {
			API: process.env.API || "http://127.0.0.1:8080/ps_storage/",
		},
	},
})
