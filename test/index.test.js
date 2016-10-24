var webpack = require('webpack');
var path = require('path');

var pathToMermaidLoader = path.resolve(__dirname, '../index.js');

describe('Mermaid loader for webpack', function() {
	it('load a file containing a graph', function(done) {
		webpack({
			entry: 'html!' + pathToMermaidLoader + '!./test/graph.mmd',
			output: {
				path:  __dirname + '/output',
				filename: 'bundle.mmd.js',
				libraryTargert: 'commonjs2'
			}
		}, function(err, stats) {
			if (err) {
				return done(err);
			}
			if (stats.hasErrors()) {
				return done(stats.compilation.errors[0]);
			}
			if (stats.hasWarnings()) {
				return done(stats.compilation.warnings[0]);
			}
			done();
		});
	});
});