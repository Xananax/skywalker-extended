var path = require('path');
var dir = path.resolve(__dirname+'/files')
var pluginsDir = path.resolve(__dirname+'/../plugins')+'/';
var chai = require('chai')
var expect = chai.expect
var Tree = require('../index.js');
var fs = require('fs');
chai.should();

var getTree = function(){
	var t = Tree(dir).ignoreDotFiles();
	var plugins = Array.prototype.slice.call(arguments);
	while(plugins.length){
		var p = pluginsDir+plugins.shift();
		t.plugin(require(p));
	}
	return t;
}

describe('Size Plugin',function(){
	it("should provide human readable file sizes",function(done){
		getTree('size').start(function(err,file){
			file._.humanSize.should.be.a('string').and.match(/MB/);
			done();
		});
	});
});

describe('Checksum Plugin',function(){
	it("should provide a checksum based on filename",function(done){
		getTree('checksum').start(function(err,file){
			file['colorful-entrance.jpg']._.checksum.should.be.a('string').and.match(/2c4fd60febf5b5d67886ef664df04a8a8a244e7b/);
			done();
		});
	});
});

describe('Contents Plugin',function(){
	it("should retrieve contents of text files",function(done){
		getTree('contents').start(function(err,file){
			file['styles.css']._.should.have.property('contents');
			file['styles.css']._.contents.should.equal(fs.readFileSync(dir+'/styles.css',{encoding:'utf8'}));
			file['colorful-entrance.jpg']._.contents.should.be.empty();
			done();
		});
	});
});


describe('Images Plugin',function(){
	it("should retrieve info for images",function(done){
		getTree('images').start(function(err,file){
			var props = file['colorful-entrance.jpg']._;
			props.width.should.be.greaterThan(0);
			props.height.should.be.greaterThan(0);
			props.ratio.should.be.greaterThan(0);
			props.imageMode.should.match(/landscape|portrait|square/);
			done();
		});
	});
});


describe('Json Plugin',function(){
	it("should set json content on the file",function(done){
		getTree('contents','json').start(function(err,file){
			var props = file['dummy.json']._;
			props.should.have.property('data');
			props.data.should.have.property('someprop');
			props.data.someprop.should.be.equal('somevalue');
			done();
		});
	});
});


describe('Markdown Plugin',function(){
	it("should set markdown content on the file",function(done){
		getTree('contents','markdown').start(function(err,file){
			var props = file['README.md']._;
			props.should.have.property('rendered');
			var markdown = require('markdown').markdown;
			var source = require('fs').readFileSync(dir+'/README.md',{encoding:'utf8'});
			var rendered = markdown.toHTML(source);
			props.rendered.should.equal(rendered);
			done();
		});
	});
});


describe('UniqueId Plugin',function(){
	it("should provide a unique Id",function(done){
		getTree('uniqueId').start(function(err,file){
			var props = file['README.md']._;
			props.should.have.property('uniqueId');
			props.uniqueId.should.be.equal('readme');
			done();
		});
	});
});


describe('websafe Plugin',function(){
	it("should provide a websafe Id",function(done){
		getTree('websafe').start(function(err,file){
			var props = file['002 1376654587507.jpg']._;
			props.should.have.property('safename');
			props.safename.should.be.equal('002_1376654587507');
			done();
		});
	});
});


describe('XML Plugin',function(){
	it("Should read and parse XML files",function(done){
		getTree('contents','xml').start(function(err,file){
			var props = file['dummy.xml']._;
			props.should.have.property('data');
			props.data.name.should.equal('catalog');
			done();
		});
	});
});

describe('YAML Plugin',function(){
	it("Should read and parse YAML files",function(done){
		getTree('contents','yaml').start(function(err,file){
			var props = file['dummy.yaml']._;
			props.should.have.property('data');
			props.data.invoice.should.equal(34843);
			done();
		});
	});
});

describe('CoffeeScript Plugin',function(){
	it("Should read and parse CoffeeScript files",function(done){
		getTree('contents','coffeescript').start(function(err,file){
			var props = file['dummy.coffee']._;
			props.should.have.property('bin');
			props.should.have.property('rendered');
			props.bin(4).should.equal(64);
			done();
		});
	});
});

describe('Jade Plugin',function(){
	it("Should read and parse Jade files",function(done){
		getTree('contents','jade').start(function(err,file){
			var props = file['home.jade']._;
			props.should.have.property('bin');
			props.bin({prop:'prop'}).should.equal('\n<div id=\"something\">prop</div>');
			done();
		});
	});
});


describe('Less Plugin',function(){
	it("Should read and parse less files",function(done){
		var rendered = ".box {\n"+
			"  color: #fe33ac;\n"+
			"  border-color: #fdcdea;\n"+
			"}\n"+
			".box div {\n"+
			"  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n"+
			"  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n"+
			"}\n";
		getTree('contents','less').start(function(err,file){
			var props = file['dummy.less']._;
			props.should.have.property('rendered');
			props.rendered.should.equal(rendered);
			done();
		});
	});
});

describe('SASS Plugin',function(){
	it("Should read and parse SASS files",function(done){
		getTree('contents','sass').start(function(err,file){
			var props = file['dummy.sass']._;
			props.should.have.property('rendered');
			props.rendered.should.equal("/* line 1, stdin */\nbody {\n  background: blue; }\n  /* line 1, stdin */\n  body a {\n    color: black; }\n");
			done();
		});
	});
});

describe('Stylus Plugin',function(){
	it("Should read and parse stylus files",function(done){
		getTree('contents','stylus').start(function(err,file){
			var props = file['dummy.styl']._;
			props.should.have.property('rendered');
			props.rendered.should.equal("body {\n  font: 12px Helvetica, Arial, sans-serif;\n}\na.button {\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZmlsZXMvZHVtbXkuc3R5bCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQTtFQUNFLE1BQW1CLGtDQUFuQjs7QUFFRjtFQVBFLHVCQUFzQixJQUF0QjtFQUNBLG9CQUFtQixJQUFuQjtFQUNBLGVBQWMsSUFBZCIsImZpbGUiOiJkdW1teS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib3JkZXItcmFkaXVzKClcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzIGFyZ3VtZW50c1xuICAtbW96LWJvcmRlci1yYWRpdXMgYXJndW1lbnRzXG4gIGJvcmRlci1yYWRpdXMgYXJndW1lbnRzXG5cbmJvZHlcbiAgZm9udCAxMnB4IEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWZcblxuYS5idXR0b25cbiAgYm9yZGVyLXJhZGl1cyg1cHgpIl19 */");
			done();
		});
	});
});

describe('Browserify Plugin',function(){
	it("should browserify .bs.js files",function(done){
		getTree('browserify').start(function(err,file){
			var props = file['dummy.bs.js']._;
			props.should.have.property('rendered');
			props.rendered.should.match(/^\(function/);
			done();
		});
	});
});

describe('Setting plugins on',function(){
	it("should allow to set plugins by calling filter_<plugin_name>",function(){
		var t = Tree(dir)
			.ignoreDotFiles()
			.filter_contents()
			.filter_json()
			.filter_stylus()
			.filter_websafe();
		;
		t._plugins_set.length.should.equal(4);
	});
});

describe('Re-Processing on watch',function(){
	it("should set markdown content on the file",function(done){
		var filename = dir+'/read.md';
		var content = '## '+Math.random();
		var t = getTree('contents','markdown')
			.on('changed',function(file){
				var props = file._;
				props.should.have.property('rendered');
				var markdown = require('markdown').markdown;
				var source = fs.readFileSync(filename,{encoding:'utf8'});
				var rendered = markdown.toHTML(source);
				props.rendered.should.equal(rendered);
				t.unwatch();
				done();
			})
			.watch('gaze',function(err,file){
				fs.writeFileSync(filename,content,{encoding:'utf8'});
			});
	});
});