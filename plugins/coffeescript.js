var c = require("coffee-script");

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the coffeescript plugin');
	}

	tree.extensionFilter('coffee coffeescript',function(next,done){
		var props = this[key];
		var contents = props.contents;
		try{
			var x = c.compile(contents);
			eval('result='+x);
			props.setProp('bin',result);
		}catch(err){
			props.error = err;
		}
		next();
	});

	return 'coffeescript';

}