var simple = require('simple');
var template = new simple.simplemodel();
template.modelname = "template";
template.addtemplate = function(obj,callback)
{
	this.insertcounters('templateid');
	this.generateNextSequence('templateid', function(next){
		template.innerHtm = encodeURI(obj.htm);
	    template.placeholder='\{{'+next+'\}}';
	    template.templateid = next;
		template.templatename = encodeURI(obj.templatename);
		template.filename= encodeURI(obj.filename);
		template.tarray= obj.tarray;
		 //template.keywords = obj.keywords.split(',');
		 //template.meta= encodeURI(obj.meta);
	     template.save(callback,'A')
	});
	
	
}

template.getAll = function(callback)
{
 // console.log('hi');
 this.findall(callback,true);
}


module.exports = template;
