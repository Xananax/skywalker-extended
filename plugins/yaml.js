var YAML = require('yamljs');

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the yaml plugin');
	}

	tree.fileFilter(/\.yaml$/,function(next,done){
		var props = this[key];
		var contents = props.contents;
		try{
			var y = YAML.parse(contents);
			props.setProp('data',y);
		}catch(err){
			props.error = err;
			if(tree.devMode()=='development'){throw err;}
		}
		next();
	});

	return 'yaml';

}