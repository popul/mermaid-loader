"use strict";

//var marked = require("marked");
var loaderUtils = require("loader-utils");
var assign = require("object-assign");
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

// default option
var options = {
};

module.exports = function (mermaidGraph) {
    var callback = this.async();

    // merge params and default config
    var query = loaderUtils.parseQuery(this.query);
    var configKey = query.config || "mermaidLoader";
    var options = assign({}, options, query, this.options[configKey]);

    this.cacheable();
 
    var childArgs = [
      path.join(__dirname, 'phantom-mermaid.js'),
      mermaidGraph
    ]
     
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err) {
            return callback(err);
        }
        callback(null, stdout);
    });
//    return marked(markdown);
};