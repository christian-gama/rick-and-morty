// @ts-nocheck

/** @type {import('jest').Config} */
const jestConfig = {
	testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': [
			'@swc/jest',
			{
				jsc: {
					parser: {
						syntax: 'typescript',
						tsx: true,
						decorators: false,
						dynamicImport: false,
					},
					transform: {
						react: {
							pragma: 'React.createElement',
							pragmaFrag: 'React.Fragment',
							throwIfNamespace: true,
							useBuiltins: false,
							runtime: 'automatic',
						},
					},
				},
			},
		],
	},
	setupFilesAfterEnv: ['./jest.setup.ts'],
	transformIgnorePatterns: ['/node_modules/'],
	testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
	moduleNameMapper: {
		'@/testutil/(.*)': '<rootDir>/testutil/$1',
		'@/(.*)': '<rootDir>/src/$1',
	},
}

module.exports = jestConfig
