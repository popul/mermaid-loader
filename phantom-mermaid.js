var args = require('system').args;

if (args.length === 1) {
  console.log('give mermaid graph string');
}

var fs = require('fs');
var page = require('webpage').create();
var r = page.injectJs('node_modules/mermaid/dist/mermaidAPI.min.js')

var svg = page.evaluate(function(graphDefinition) {
	mermaidAPI.initialize({
		startOnLoad: false
	});

	var graph = mermaidAPI.render(graphDefinition);
	return graph;
}, args[1]);

console.log(svg);

phantom.exit();