module.exports = {
	extends: 'next/core-web-vitals',
	plugins: ['@typescript-eslint', 'react', 'sonarjs'],
	rules: {
		indent: 'off',
		'no-undef': 'off',
		'@typescript-eslint/indent': 'off',
		'no-unused-vars': 'off',
		'default-case': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'no-console': 'warn',
		'no-debugger': 'warn',
	},
};
