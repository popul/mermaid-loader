var webpack = require('webpack');
var path = require('path');
var pathToMermaidLoader = path.resolve(__dirname, '../index.js');

var config = {
	entry: [
		"./example/index.js",
		"file?name=[name].[ext]!./example/index.html"
	],
	output: {
		path: "output",
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.mmd$/, loader: pathToMermaidLoader},
			{ test: /\.js$/, loader: 'babel'}
		]
	}
};

if (process.env.NODE_ENV !== "production") {
  config.entry = [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server'
  ].concat(config.entry);
}

module.exports = config;