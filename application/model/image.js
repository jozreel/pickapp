var simple = require('simple');
var image = new simple.simplemodel();
image.modelname = "image";
image.addimage = function(obj,callback)
{
	var im = this;
	//this.insertcounters('imageid');
	//console.log(obj);
	this.generateNextSequence('imageid', function(next){
		
		image.imagedata = image.checkecnoded(obj.imagedata);
	    image.placeholder='\{{mediaimage'+next+'\}}';
	    image.imageid = 'mediaimage'+next;
		image.alt=encodeURI(obj.alt);
		image.name=encodeURI(obj.name);
		 //image.keywords = obj.keywords.split(',');
		 //image.meta= encodeURI(obj.meta);
	     image.save(callback,'A')
	});
	
	
}

image.getall = function(callback)
{
	this.findall(callback,true);
}

module.exports = image;
