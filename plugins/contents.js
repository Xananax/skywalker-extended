var plainText = 'txt text conf def list log in md markdown css styl stylus less sass scss html htm ejs jade haml js coffee typescript ts ls xml json csv ini yaml';

module.exports = function(tree,key){

	tree.extensionFilter(plainText,function(next,done){
		var props = this[key];
		require('fs').readFile(props.path,{encoding:'utf8'},function(err,contents){
			if(err){
				props.error = err;
				return next();
			}
			props.setProp('contents',contents);
			next();
		})
	});

	return 'contents';

}