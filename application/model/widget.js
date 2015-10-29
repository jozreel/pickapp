var simple = require('simple');
var widget = new simple.simplemodel();
widget.modelname = "widget";
widget.addwidget = function(obj,callback)
{
	var wid = this;
	this.insertcounters('widgetid');
	this.generateNextSequence('widgetid', function(next){
		//var l = encodeURI(obj.htm);
		//console.log(decodeURI(l));
		//try{console.log(decodeURIComponent(obj.htm))}catch(err){console.log(err);}
		//var regx = new RegExp(/%\d[\dA-F]/g);
		
		 widget.innerHtm = widget.checkecnoded(obj.htm);
	    widget.placeholder='\{{'+next+'\}}';
	    widget.widgetid = next;
		widget.name = encodeURI(obj.widgetname);
		widget.media = obj.media;
		 //widget.keywords = obj.keywords.split(',');
		 //widget.meta= encodeURI(obj.meta);
		// console.log(typeof obj);
	     widget.save(callback,'A')
	});
	
	
}

widget.getAll = function(callback)
{
  console.log('hi');
 this.findall(callback,true);
}

module.exports = widget;
