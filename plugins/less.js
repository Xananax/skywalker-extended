var less = require("less");

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the less plugin');
	}

	tree.extensionFilter('less',function(next,done){
		var props = this[key];
		var contents = props.contents;
		less.render(contents,function(err,output){
			if(err){props.error = err;return next();}
			props.setProp('contents',output);
			next();
		});
	});

	return 'less';

}