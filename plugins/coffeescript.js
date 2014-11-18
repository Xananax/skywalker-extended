var c = require("coffee-script")
,	btoa = require('btoa')
;

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the coffeescript plugin');
	}

	tree.extensionFilter('coffee coffeescript',function(next,done){
		var props = this[key];
		var contents = props.contents;
		var opts = tree.obtainFilterOptions('coffeescript',{
			common:{filename:props.path}
		,	dev:{sourceMap:true}
		,	prod:{}
		});
		try{
			var x = c.compile(contents,opts);
			if(opts.sourceMap){
				var srcmap = JSON.parse(x.v3SourceMap);
				srcmap.sources[0] = "user entered coffeescript";
				srcmap.sourcesContent = contents;
				srcmap.file = "js compiled from dynamic coffeescript";
				var datauri = 'data:application/json;charset=utf-8;base64,'+btoa(JSON.stringify(srcmap));
				x.js+= "\n//@ sourceMappingURL="+datauri;
				props.setProp('rendered',x.js);
				eval('result='+x.js);
				props.setProp('bin',result);
			}
			else{			
				eval('result='+x);
				props.setProp('bin',result);
				props.setProp('rendered',x);
			}
		}catch(err){
			props.error = err;
		}
		next();
	});

	return 'coffeescript';

}