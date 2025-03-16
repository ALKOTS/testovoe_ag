/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: ["class"],
	plugins: [],
	theme: {
		extend: {
			backgroundColor: {
				placeholder: "#F8F8F8",
			},
			colors: {
				submit: "#007AFF",
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
			gap: {
				3: "14px",
				7: "30px",
			},
			outlineColor: {
				input: "#DFDFDF",
			},
			padding: {
				input: "16px",
			},
			textColor: {
				gray: { hint: "#9E9E9E" },
				secondary: "#666666",
			},
		},
	},
}
