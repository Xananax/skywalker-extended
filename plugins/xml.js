var xml = require("node-xml-lite");

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the xml plugin');
	}

	tree.fileFilter(/\.xml$/,function(next,done){
		var props = this[key];
		var contents = props.contents;
		try{
			var x = xml.parseString(contents);
			props.setProp('data',x);
		}catch(err){
			props.error = err;
		}
		next();
	});

	return 'xml';

}