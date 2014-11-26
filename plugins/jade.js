var jade = require("jade");

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the jade plugin');
	}

	tree.extensionFilter('jade',function(next,done){
		var props = this[key];
		var contents = props.contents;
		var opts = tree.obtainFilterOptions('jade',{
			common:{filename:props.path}
		,	dev:{pretty:true}
		,	prod:{}
		});
		try{
			var func = jade.compile(contents,opts)
			props.setProp('bin',func);
		}catch(err){
			props.error = err;
			if(tree.devMode()=='development'){throw err;}
		}
		next();
	});

	return 'jade';

}