
/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
	extends: [
		'prettier',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'next/core-web-vitals',
	],

	plugins: ['import-helpers', 'unused-imports'],

	rules: {
		'object-shorthand': ['error', 'always'],

		'import/no-unresolved': 'off',
		'import/named': 'off',

		'unused-imports/no-unused-imports': 'error',

		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
		],
		'@typescript-eslint/no-empty-interface': 'off',

		'react-hooks/exhaustive-deps': 'off',

		'import-helpers/order-imports': [
			'warn',
			{
				newlinesBetween: 'always',
				groups: [
					['parent', 'sibling', 'index'],
				],
				alphabetize: { order: 'asc', ignoreCase: true },
			},
		],
	},
}

module.exports = eslintConfig
