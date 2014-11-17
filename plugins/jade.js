var jade = require("jade");

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the jade plugin');
	}

	tree.extensionFilter('jade',function(next,done){
		var props = this[key];
		var contents = props.contents;
		try{
			var func = jade.compile(contents,{filename:props.path})
			props.setProp('bin',func);
		}catch(err){
			props.error = err;
		}
		next();
	});

	return 'jade';

}