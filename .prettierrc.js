/** @type {import('prettier').Options} */
const prettierConfig = {
	semi: false,
	singleQuote: true,
	trailingComma: "all",
	endOfLine: "lf",
	useTabs: true,
	singleAttributePerLine: true,
	jsxSingleQuote: true,
	printWidth: 100,
	tabWidth: 2,
	quoteProps: "as-needed",
};

module.exports = prettierConfig;
