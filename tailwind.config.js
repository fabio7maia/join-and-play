/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx', './node_modules/react-xp-ui/dist/**/*.js'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
};
