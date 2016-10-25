"use strict";

var fs = require('fs');
var loaderUtils = require("loader-utils");
var assign = require("object-assign");
var path = require('path');
var childProcess = require('child_process');
var binPath = './node_modules/.bin/mermaid';
var tmpFolder = '.tmpMermaid';

// default option
var options = {
};

module.exports = function (mermaidGraph) {
    var callback = this.async();

    // merge params and default config
    var query = loaderUtils.parseQuery(this.query);
    var configKey = query.config || "mermaidLoader";
    var options = this.options[configKey] || {};

    var config = {
        publicPath: false,
        name: "[name].png"
    };

    // options takes precedence over config
    Object.keys(options).forEach(function(attr) {
        config[attr] = parseInt(options[attr]) || options[attr];
    });

    // query takes precedence over config and options
    Object.keys(query).forEach(function(attr) {
        config[attr] = query[attr];
    });

    var self = this;

    var fileName = loaderUtils.interpolateName(this, '[name].mmd.png', {
        context: this.options.context
    });
    var filePath = loaderUtils.interpolateName(this, '[path][name].[ext]', {
        context: this.options.context
    });
    var url = loaderUtils.interpolateName(this, config.name, {
        context: config.context || this.options.context,
        content: mermaidGraph,
        regExp: config.regExp
    });

    this.cacheable && this.cacheable();

    var publicPath = "__webpack_public_path__ + " + JSON.stringify(url);

    if (config.publicPath) {
        // support functions as publicPath to generate them dynamically
        publicPath = JSON.stringify(
                typeof config.publicPath === "function" 
                 ? config.publicPath(url) 
                 : config.publicPath + url
        );
    }

    var seqDiagConfig = assign(
        {}, 
        query, 
        options);

    Object.keys(seqDiagConfig).forEach(function(attr) {
        seqDiagConfig[attr] = parseInt(seqDiagConfig[attr]) || seqDiagConfig[attr];
    });

    if (!fs.existsSync(tmpFolder)){
       fs.mkdirSync(tmpFolder);
    }
    
    var configDiagPath = './' + tmpFolder + '/seqDiagConfig.json'; 
    fs.writeFileSync(configDiagPath,  JSON.stringify(seqDiagConfig), 'utf-8'); 

    var childArgs = [
      '-o=' + tmpFolder,
      '-c=' + configDiagPath,
      filePath
    ];
    
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err) {
            return callback(err);
        }
        var imgPath = './' + tmpFolder + '/' + fileName;
        var content = fs.readFileSync(imgPath);

        self.emitFile(url, content);
        fs.unlinkSync(imgPath);
        fs.unlinkSync(configDiagPath);
        fs.rmdirSync('./' + tmpFolder);

        callback(null, "module.exports = " + publicPath + ";")
    });
};

module.exports.raw = true;