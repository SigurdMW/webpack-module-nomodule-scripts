const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNoModulePlugin = require('webpack-nomodule-plugin').WebpackNoModulePlugin; // https://github.com/swimmadude66/webpack-nomodule-plugin
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const legacy = {
	entry: [
		// https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import#working-with-webpack-and-babel-preset-env
		"core-js/modules/es.promise",
		"core-js/modules/es.array.iterator",

		// IE 10 polyfills required by react-dom. https://reactjs.org/docs/javascript-environment-requirements.html
		"core-js/es/map",
		"core-js/es/set",
		'./src/index.js'
	],
	stats: true,
	output: {
		filename: 'main.legacy.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							modules: false,
							useBuiltIns: 'usage',
							corejs: { version: 3 },
							targets: {
								browsers: [
									'last 2 versions'
								]
							}
						}],
						"@babel/preset-react"
					]
				}
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.html')
		}),
		new WebpackNoModulePlugin({
            filePatterns: ['main.legacy.*.js']
        })
	]
}

module.exports = legacy