module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
		"google",
		"prettier",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	parser: "@typescript-eslint/parser",
	plugins: ["react", "@emotion", "@typescript-eslint"],
	rules: {
		"@emotion/jsx-import": "error",
		"@emotion/syntax-preference": [2, "string"],
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-empty-function": "off",
		"require-jsdoc": "off",
		"valid-jsdoc": "off",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"no-unused-vars": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
	},
};
