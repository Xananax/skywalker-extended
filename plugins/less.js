var less = require("less");

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the less plugin');
	}

	tree.extensionFilter('less',function(next,done){
		var props = this[key];
		var contents = props.contents;
		var opts = tree.obtainFilterOptions('less',{
			common:{filename:props.path}
		,	dev:{env: "development"}
		,	prod:{}
		});
		less.render(contents,function(err,output){
			if(err){
				props.error = err;
				if(tree.devMode()=='development'){throw err;}
				return next();
			}
			props.setProp('rendered',output);
			next();
		});
	});

	return 'less';

}