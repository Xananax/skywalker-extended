module.exports = function(tree,key){


	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the json plugin');
	}

	tree.fileFilter(/\.json$/,function(next,done){
		var props = this[key];
		var contents = props.contents;
		try{
			var json = JSON.parse(contents);
			props.setProp('data',json);
		}catch(err){
			props.error = err;
		}
		next();
	});

	return 'json';

}