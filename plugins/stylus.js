var stylus = require('stylus');

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the stylus plugin');
	}

	tree.extensionFilter('styl stylus',function(next,done){
		var props = this[key];
		var contents = props.contents;
		stylus.render(contents, { filename: props.path }, function(err, css){
			if(err){props.error = err;return next();}
			props.setProp('contents',css);
			next();
		});
	});

	return 'stylus';

}