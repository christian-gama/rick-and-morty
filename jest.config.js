// @ts-nocheck

/** @type {import('jest').Config} */
const jestConfig = {
	testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
	maxWorkers: '66%',
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
		'@/(.*)': '<rootDir>/src/$1',
	},

}

module.exports = jestConfig
