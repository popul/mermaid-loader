mermaid-loader
===============

[![npm status](https://nodei.co/npm/mermaid-loader.svg?downloads=true&stars=true)](https://npmjs.org/package/mermaid-loader)

[![dependencies](https://david-dm.org/popul/mermaid-loader.svg)](http://david-dm.org/popul/mermaid-loader)
[![devDependency Status](https://david-dm.org/popul/mermaid-loader/dev-status.svg)](https://david-dm.org/popul/mermaid-loader#info=devDependencies)

mermaid-loader for webpack using [mermaid](https://github.com/knsv/mermaid).

It outputs PNG images from your mermaid diagrams. Can be useful for slides made with presentation frameworks like [Reveal](http://lab.hakim.se/reveal-js) or [Spectacle](https://formidable.com/open-source/spectacle/)

Here is a sequence diagram:
```
sequenceDiagram
A->> B: Query
B->> C: Forward query
Note right of C: Thinking...
C->> B: Response
B->> A: Forward response
```

Mermaid loader outputs this png:

![http://imgur.com/Bq9w9hG](http://imgur.com/Bq9w9hG)

## Installation

```npm i mermaid-loader -D```

## Usage 

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

```javascript
var html = require("mermaid!./diagram.mmd");
// => emits diagram.png as file in the output directory and returns the public url
// => returns i. e. "/public-path/diagram.png
```

By default the filename of the resulting file is the filename with `.mmd` extension replaced by `.png` extension

## Filename templates

You can configure a custom filename template for your file using the query
parameter `name`. For instance, to copy a file from your `context` directory
into the output directory retaining the full directory structure, you might
use `?name=[path][name].[ext]`.

mermaid-loader works like file-loader. More instructions [here](https://github.com/webpack/file-loader/blob/master/README.md#filename-templates).

### Recommended Configuration

```javascript
{
    module: {
        loaders: [
            { test: /\.mmd$/, loader: "mermaid" },
        ]
    }
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
