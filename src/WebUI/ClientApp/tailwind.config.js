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
				quaternary: "#ebeef0",
			},
			spacing: {
				"350px": "350px",
				"275px": "275px",
				"56px": "56px",
				"600px": "600px",
			},
		},
	},
	variants: {
		extend: {
			opacity: ["disabled"],
		},
	},
	plugins: [],
};
