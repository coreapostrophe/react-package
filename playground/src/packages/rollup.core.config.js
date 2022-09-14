import nodeResolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import strip from "@rollup/plugin-strip";
import visualizer from "rollup-plugin-visualizer";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import postcssUrl from "postcss-url";
import commonjs from "@rollup/plugin-commonjs";
import autoprefixer from "autoprefixer";

export const getCorePlugins = ({
	moduleName = "fabulist",
	moduleIncludes = [],
}) => [
	nodeResolve({
		exportConditions: ["default", "module", "import"],
	}),
	nodePolyfills(),
	commonjs(),
	typescript({
		filterRoot: "./",
		declaration: true,
		declarationDir: "types",
		tsconfig: "../tsconfig.json",
		include: [
			`./src/**/*`,
			...moduleIncludes.map((module) => `../${module}/src/**/*`),
		],
	}),
	babel({
		babelHelpers: "bundled",
		configFile: "../babel.config.js",
	}),
	postcss({
		to: `dist/${moduleName}.css`,
		// extract: `${moduleName}.css`,
		sourceMap: true,
		autoModules: true,
		plugins: [
			autoprefixer(),
			postcssUrl({
				url: "copy",
				assetsPath: "assets",
			}),
		],
	}),
	strip(),
	visualizer({
		title: `${moduleName} Visualizer`,
		template: "treemap",
	}),
	del({ targets: ["dist/**/*"] }),
];

export const getRollupConfig = ({
	mainUrl = "./dist/index.js",
	sourceUrl = "./index.ts",
	moduleUrl = "./dist/index.es.js",
	typingsUrl = "./dist/index.d.ts",
	moduleName = "",
	moduleIncludes = [],
}) => [
	{
		input: sourceUrl,
		output: [
			{
				format: "cjs",
				exports: "named",
				file: mainUrl,
				sourcemap: true,
			},
			{
				format: "es",
				exports: "named",
				file: moduleUrl,
				sourcemap: true,
			},
		],
		onwarn(warning, warn) {
			if (warning.id.includes("redux-toolkit.esm.js")) return;
			warn(warning);
		},
		plugins: getCorePlugins({ moduleName, moduleIncludes }),
		external: ["react", "react-dom"],
	},
	{
		input: `dist/${moduleName}/types/${moduleName}/src/index.d.ts`,
		output: [{ file: typingsUrl, format: "esm" }],
		external: [/\.(css|scss)$/],
		plugins: [
			dts(),
			del({
				targets: [`dist/${moduleName}`],
				hook: "buildEnd",
			}),
		],
	},
];
