var simple = require('simple');
var admin = new simple.simplecontroler();

admin.addzone= function()
{
	console.log('lplp');
	this.loadview('addzone');
}
admin.bulkupdatebusstop = function()
{
	var obj = this.req.postdata;
	
	var mod = this.loadmodel('busstops');
	mod.updateandsave(obj,function(doc)
	{
		admin.jsonResp(doc);
	});
}
admin.addworkarea = function()
{
	var obj = this.req.postdata;
	var mod = this.loadmodel('workcity');
	
	mod.add(obj,function(doc)
	{
		console.log(doc);
	});
}
module.exports = admin;