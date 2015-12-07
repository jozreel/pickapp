var simple = require('simple');
var taxdef = new simple.simplemodel();
taxdef.modelname=taxdef;
taxdef.global = function(obj, callback)
{
	this.findall(function(doc)
	{
	console.log(doc);
	if(doc.success !== false)
    if(obj.event ==='E')
	  this._id = obj._id;
	this.definitions = obj.definitions;
	this.save(callback,obj.event);
	},true);
	
}

module.exports = taxdef;