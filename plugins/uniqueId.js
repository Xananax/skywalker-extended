var ids = [];

var MakeAttempts = function(a){
	var i = 0, test,n=0;
	return function(){
		if(i<2){
			test = a[i];
			i++;
		}else{
			test = a[0]+'_'+n;
			n++;
		}
		if(ids.indexOf(test)>=0){return false;}
		return test;
	}
	attemptId++;
};

module.exports = function(tree,key){

	tree.fileFilter(null,function(next,done){
		var props = this[key];
		var nextAttempt = MakeAttempts([props.name.toLowerCase(),props.filename.toLowerCase(),props.path.toLowerCase()]);
		var id = nextAttempt();
		while(id==false){
			id = nextAttempt();
		}
		this[key].setProp('uniqueId',id);
		next();
	});

	return 'uniqueId';

}