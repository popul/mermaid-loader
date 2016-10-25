var expect = require('chai').expect;
var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var outputPath = path.join(__dirname, 'output');

var pathToMermaidLoader = path.resolve(__dirname, '../index.js');

describe('Outputs PNG files', function() {
	test(
		'Outputs a Gantt diagram', 
		'?name=[name].png!./test/gantt.mmd',
		'gantt.png'
	);
	test(
		'Outputs a flowchart', 
		'?name=[name].png!./test/flowchart.mmd',
		'flowchart.png'
	);
	test(
		'Outputs a big flowchart', 
		'?name=[name].png!./test/bigflowchart.mmd',
		'bigflowchart.png'
	);	
	test(
		'Outputs a sequence diagram', 
		'!./test/seq.mmd',
		'seq.png'
	);
	test(
		'Outputs a sequence diagram with configuration', 
		'?name=seqConfig.png&diagramMarginX=100&diagramMarginY=50&height=50&width=100!./test/seq.mmd',
		'seqConfig.png'
	);
});

function test(testName, query, filename) {
	it(testName, function(done) {
		webpack({
			entry: pathToMermaidLoader + query,
			output: {
				path:  outputPath,
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

			fs.access(path.join(outputPath, filename), fs.F_OK, function(err) {
				const exists = !err;
				expect(exists).be.true;
				done();
			});
		});
	});
}