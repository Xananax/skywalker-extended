var sass = require('node-sass');

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the sass plugin');
	}

	tree.extensionFilter('sass scss',function(next,done){
		var props = this[key];
		var contents = props.contents;
		sass.render({
			data: contents
		,	includePaths:[props.dirname]
		,	success:function(css){
				props.setProp('contents',css);
				next();
			}
		,	error:function(error){
				props.error = error;
				next();
			}
		});
	});

	return 'sass';

}