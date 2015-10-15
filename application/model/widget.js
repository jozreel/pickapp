var simple = require('simple');
var widget = new simple.simplemodel();
widget.modelname = "widget";
widget.addwidget = function(obj,callback)
{
	this.insertcounters('widgetid');
	this.generateNextSequence('widgetid', function(next){
		//var l = encodeURI(obj.htm);
		//console.log(decodeURI(l));
		//try{console.log(decodeURIComponent(obj.htm))}catch(err){console.log(err);}
		var regx = new RegExp(/%\d[\dA-F]/g);
		
		 widget.innerHtm = widget.checkencoded(obj.htm);
	    widget.placeholder='\{{'+next+'\}}';
	    widget.widgetid = next;
		widget.name = encodeURI(obj.widgetname);
		 //widget.keywords = obj.keywords.split(',');
		 //widget.meta= encodeURI(obj.meta);
	    widget.save(callback,'A')
	});
	
	
}

widget.getAll = function(callback)
{
 // console.log('hi');
 this.findall(callback,true);
}

module.exports = widget;
