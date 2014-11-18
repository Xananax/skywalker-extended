var stylus = require('stylus');

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the stylus plugin');
	}

	tree.extensionFilter('styl stylus',function(next,done){
		var props = this[key];
		var contents = props.contents;
		var opts = tree.obtainFilterOptions('stylus',{
			common:{filename:props.path}
		,	dev:{sourcemap:{inline:true}}
		,	prod:{compress:true}
		});
		stylus.render(contents,opts, function(err, css){
			if(err){
				css = 'body:after{position:absolute;top:0;left:0;right:0;background:red;color:white;display:block;content:"'+err+'"}'
				props.error = err;
			}
			props.setProp('contents',css);
			next();
		});
	});

	return 'stylus';

}