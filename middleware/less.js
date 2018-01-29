import path from 'path';
import lessMiddleware from 'less-middleware';
import LessPluginNpmImport from 'less-plugin-npm-import';
import LessPluginAutoPrefix from 'less-plugin-autoprefix';
import sass2less from 'less-plugin-sass2less';
import LessPluginFunctions from 'less-plugin-functions';

const autoprefixPlugin = new LessPluginAutoPrefix({browsers: [">5%"]});
const npmImportPlugin = new LessPluginNpmImport({prefix: "~"});
const functions = new LessPluginFunctions();

module.exports = lessMiddleware(path.join(__dirname, 'client', 'less'), {
	render: {
		plugins: [autoprefixPlugin, npmImportPlugin, functions, sass2less],
		sourceMap: {
			sourceMapFileInline: true,
			outputSourceFiles: true,
		}
	},
	dest: path.join(__dirname, 'public'),
	preprocess: {
		path: (pathName, req) => {
			return pathName.replace(path.sep + 'css' + path.sep, path.sep);
		}
	},
	debug: false
});

