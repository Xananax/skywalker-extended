var Tree = require('skywalker');
var extend = require('node.extend');

require('./plugins')(Tree);

Tree.prototype.filterOptions = function(options){
	if(!arguments.length){return this._filters_options || {};}
	this._filters_options = extend({},this._filters_options,options);
	return this;
}

Tree.prototype.devMode = function(mode){
	if(!arguments.length){return this._dev_mode || 'development';}
	this._dev_mode = mode;
	return this;
}

Tree.prototype.obtainFilterOptions = function(name,defs){
	var d = extend({},(this.devMode() == 'development' ? defs.dev : defs.prod),defs.common);
	var opts = extend(d,this.filterOptions()[name]);
	return opts;
}

module.exports = Tree;