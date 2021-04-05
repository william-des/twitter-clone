module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#1da1f2",
				secondary: "#1da0f2",
				white: "#fff",
				tertiary: "#ccd6dd",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
