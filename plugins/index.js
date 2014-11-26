var plugins = {};

var makeMethod = function(plugin,n){
	return function(){
		this.plugin(plugin);
		return this;
	}
}

module.exports = function(Tree){
	require('fs').readdirSync(__dirname + '/').forEach(function(file) {
		if(file !== 'index.js') {
			var filterName = file.replace('.js','');
			var filterPath = __dirname+'/'+file;
			Tree.prototype['filter_'+filterName] = makeMethod(require(filterPath),filterName);
		}
	});
}