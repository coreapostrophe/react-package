import pkg from "./package.json";
import { getRollupConfig } from "../rollup.core.config";

module.exports = getRollupConfig({
	mainUrl: pkg.main,
	moduleUrl: pkg.module,
	sourceUrl: pkg.source,
	typingsUrl: pkg.typings,
	moduleName: "sample",
	moduleIncludes: [],
});
