const webpackSync = require('webpack');
const modern = require("./webpack.modern.js")
const legacy = require("./webpack.legacy.js")

const webpack = (config) => new Promise((res, rej) => {
	webpackSync(config, (err, stats) => {
		if (err) rej(err)
		res(stats)
	})
})

const start = async () => {
	try {
		await webpack(modern) // For modern browsers
		await webpack(legacy) // For legacy browsers
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

start()