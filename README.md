# Skywalker-Extended

Builds on [skywalker](https://github.com/Xananax/skywalker) and provides several filters and convenience functions.  

Automatically parses:
- stylus, less, sass
- markdown
- json, xml, yaml
- coffeescript
- plain text files
- browserifies js files that have extension '.bs.js'

Additionally:
- Provides human-readable size reading ("Mb", "Kb"...)
- Gets image sizes and ratios
- Provides a checksum for filenames (can be used to identify them)
- Provides a uniqueId for each file

Use the filters as they are or as a basis for implementing your own.
More to come!

----
## Filters

Each filter can be set on by calling `filter_<filter_name>`  
For example:
```js
        var Tree = require('skywalker-x')
        var t = Tree(dir)
            .ignoreDotFiles()
            .filter_contents()
            .filter_json()
            .filter_stylus()
            .filter_websafe()
            .start(function(err,results){
                //do something here
            });
```

you can set filters options like so:
```js
    t.filterOptions({jade:{/**options**/}});
```
You can call options several times with different options, they will all merge.

You can also set
```js
    t.devMode('development');
```
To set sensible default options (source maps, debug, etc);

To get an idea of filters and what they can do, refer to the `/filters` directory, and check out the tests.

---
## Additional functions
skywalker-extended extends (duh) skywalker with the following functions (on top of the series of `filter_XXX()` ones):

- `t.filterOptions({})` to set options for certain filters
- `t.devMode(string)` to set mode. Defaults to 'development'
- `t.obtainFilterOptions(pluginName,defs)` this is used internally by the plugins to retrieve their own options.

---
## License
MIT
