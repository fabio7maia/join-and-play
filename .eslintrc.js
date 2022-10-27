module.exports = {
	extends: 'next/core-web-vitals',
	plugins: ['@typescript-eslint', 'react', 'simple-import-sort', 'sonarjs'],
	rules: {
		indent: 'off',
		'no-undef': 'off',
		'@typescript-eslint/indent': 'off',
		'no-unused-vars': 'off',
		'default-case': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'no-console': 'warn',
		'no-debugger': 'warn',
		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					// `react` first, `next` second, then packages starting with a character
					['^react$', '^next', '^[a-z]'],
					// Packages starting with `@`
					['^@'],
					// Packages starting with `~`
					['^~'],
					// Imports starting with `../`
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					// Imports starting with `./`
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
					// Style imports
					['^.+\\.s?css$'],
					// Side effect imports
					['^\\u0000'],
				],
			},
		],
	},
};
