module.exports = {
	exclude: "node_modules/**",
	presets: [
		[
			"@babel/preset-react",
			{ runtime: "automatic", importSource: "@emotion/react" },
		],
		["@babel/preset-env", { targets: { node: "current" } }],
		"@babel/preset-typescript",
	],
	plugins: ["@emotion/babel-plugin"],
};
