var simple = require('simple');
var html = new simple.simplemodel();
html.modelname = "html";
html.addpage = function(obj,callback)
{
	//this.insertcounters('pageid');
	this.generateNextSequence('pageid', function(next){
		html.innerHtm = encodeURI(obj.htm);
	    html.placeholder='\{'+next+'\}';
	    html.pageid = next;
		 html.keywords = obj.keywords.split(',');
		 html.meta= encodeURI(obj.meta);
	     html.save(callback,'A')
	});
	
	
}
html.getAll = function(callback)
{
 // console.log('hi');
 this.findall(callback,true);
}

module.exports = html;
