# Skywalker-Extended

Builds on [skywalker](https://github.com/Xananax/skywalker) and provides several filters and convenience functions.  

Automatically parses:
- stylus, less, sass
- markdown
- json, xml, yaml
- coffeescript
- plain text files

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

To get an idea of filters and what they can do, refer to the `/filters` directory, and check out the tests.

---
## License
MIT
