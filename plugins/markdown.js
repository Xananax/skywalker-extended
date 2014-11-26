var markdown = require('markdown').markdown

module.exports = function(tree,key){

	if(!tree.pluginIsRegistered('contents')){
		throw new Error('contents plugin is required before the markdown plugin');
	}

	tree.fileFilter(/\.md$/,function(next,done){
		var props = this[key];
		var contents = props.contents;
		try{
			var md = markdown.toHTML(contents);
			props.setProp('rendered',md);
		}catch(err){
			props.error = err;
			if(tree.devMode()=='development'){throw err;}
		}
		next();
	});

	return 'markdown';

}