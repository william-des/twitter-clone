module.exports = {
	purge: {
		content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
		options: {
			safelist: [/^text-/, /^h-/, /^w-/, /^w-/]
		}
	},
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
				"309px": "309px",
				"275px": "275px",
				"56px": "56px",
				"600px": "600px",
				"2px": "2px",
			},
			boxShadow: {
				"offset-0": "0 0 4px 2px rgba(0, 0, 0, 0.1)",
			},
			minWidth: {
				4: "1rem",
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
