var stylus = require('stylus');

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the stylus plugin');
	}

	tree.extensionFilter('styl stylus',function(next,done){
		var props = this[key];
		var contents = props.contents;
		var opts = tree.obtainFilterOptions('stylus',{
			common:{
				filename:props.path
			,	paths:[props.dirname]
			}
		,	dev:{sourcemap:{inline:true}}
		,	prod:{compress:true}
		});
		stylus.render(contents,opts, function(err, css){
			if(err){
				var msg = err.message.replace(/\n/g,'\\A ').replace(/"/g,'\\"');
				css = 'body::after{z-index:99999;position:absolute;top:0;left:0;width:100%;background:red;color:white;display:block;white-space:pre;padding:1em;box-sizing:border-box;content:"'+msg+'"}'
				props.error = err;
				if(tree.devMode()=='development'){throw err;}
			}
			props.setProp('rendered',css);
			next();
		});
	});

	return 'stylus';

}