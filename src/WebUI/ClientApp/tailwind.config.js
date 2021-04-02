module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		backgroundColor: () => ({
			primary: "#1da1f2",
			secondary: "#1da0f2",
			white: "#fff",
			gray: "#ccd6dd",
		}),
		textColor: () => ({
			primary: "#1da1f2",
			secondary: "#1da0f2",
			white: "#fff",
		}),
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
