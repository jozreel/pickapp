var simple = require('simple');
var tax = new simple.simplemodel();
tax.modelname = 'tax';
tax.savetax = function(obj, callback)
{   if(obj._id !==undefined) this._id = obj._id;
	this.name = obj.name;
	this.description = obj.desc;
	this.percent = obj.percent;
	console.log(obj.event);
	this.save(callback,obj.event);
}

tax.delete = function(obj,callback)
{
	for(var it in obj)
	{
	
	  var objid = this.createObjectId(obj[it]);
	  obj[it] = objid;
	}
	console.log(obj);
	this.removegroup('_id',obj,callback);
	
}
tax.gettaxes = function(callback)
{
	this.findall(function(doc)
	{
		console.log(doc);
		 
		 var doc1 = tax.decodeallValues(doc);
		 callback(doc1);
	},true);
}


module.exports = tax;