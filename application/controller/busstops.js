var simple = require('simple');
var busstops = new simple.simplecontroler();

busstops.getallstops = function(vic,city)
{
	var mod = this.loadmodel('busstops');
	mod.list(vic,city,function(doc)
	{
		console.log(vic,city);
		busstops.jsonResp(doc);
	});
}
module.exports = busstops;