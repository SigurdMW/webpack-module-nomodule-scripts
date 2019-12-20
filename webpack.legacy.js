const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNoModulePlugin = require('webpack-nomodule-plugin').WebpackNoModulePlugin; // https://github.com/swimmadude66/webpack-nomodule-plugin
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const legacy = {
	entry: WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, './dist/main.modern.*.js')]),
	output: {
		filename: 'main.legacy.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [{
			test: /\.(js|jsx|mjs)$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							modules: false,
							useBuiltIns: 'usage',
							corejs: { version: 3, proposals: true },
							targets: {
								browsers: [
									'> 1%',
									'last 2 versions',
									'Firefox ESR'
								]
							}
						}]
					]
				}
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './dist/index.html')
		}),
		new WebpackNoModulePlugin({
            filePatterns: ['main.legacy.*.js']
        })
	]
}

module.exports = legacy