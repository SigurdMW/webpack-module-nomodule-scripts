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
		const test = await webpack(modern) // For modern browsers
		const test2 = await webpack(legacy) // For legacy browsers
	} catch (e) {
		console.log("DID ERROR", e)
		process.exit(1)
	}
}

start()