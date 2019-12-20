const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin") // https://github.com/numical/script-ext-html-webpack-plugin

const modern = {
	entry: './src/index.js',
	output: {
		filename: 'main.modern.[contenthash].js',
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
									'Chrome >= 60',
									'Safari >= 10.1',
									'iOS >= 10.3',
									'Firefox >= 54',
									'Edge >= 15'
								]
							}
						}]
					]
				}
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new ScriptExtHtmlWebpackPlugin({
			sync: 'important',
		module: [/main.modern.*.js/]
		})
	]
}

module.exports = modern