mermaid-loader
===============

mermaid-loader for webpack using [mermaid](https://github.com/knsv/mermaid).


## Setup

[![npm status](https://nodei.co/npm/mermaid-loader.svg?downloads=true&stars=true)](https://npmjs.org/package/mermaid-loader)

[![dependencies](https://david-dm.org/popul/mermaid-loader.svg)](http://david-dm.org/popul/mermaid-loader)
[![devDependency Status](https://david-dm.org/popul/mermaid-loader/dev-status.svg)](https://david-dm.org/popul/mermaid-loader#info=devDependencies)

## Usage 

```javascript
var html = require("html!mermaid!./README.md");
```

### Recommended Configuration

Since mermaid's output is HTML, it's best served in conjunction with the [html-loader](https://github.com/webpack/html-loader). 

```javascript
{
    module: {
        loaders: [
            { test: /\.mermaid$/, loader: "html!mermaid" },
        ]
    }
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
