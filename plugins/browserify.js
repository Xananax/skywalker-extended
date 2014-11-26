var browserify = require('browserify');

module.exports = function(tree,key){

	tree.fileFilter(/\.bs\.js$/,function(next,done){
		var props = this[key];
		var opts = tree.obtainFilterOptions('coffeescript',{
			common:{
				basedir:props.dirname
			}
		,	dev:{debug:true}
		,	prod:{}
		});		
		var b = browserify(opts);
		b.add(props.path);
		var c = b.bundle(function(err,buf){
			if(err){
				props.error = err;
				if(tree.devMode()=='development'){throw err;}
				return next();
			}
			props.setProp('rendered',buf.toString());
			next();
		});
	});

	return 'coffeescript';

}