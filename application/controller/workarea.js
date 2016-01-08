var simple = require('simple');
var workarea= new simple.simplecontroler();
workarea.getall = function(vic,city)
{
	console.log(vic,city);
	var mod = this.loadmodel('workarea');
	mod.list(vic,city,function(doc)
	{
		
		workarea.jsonResp(doc);
	});
}
module.exports = workarea;