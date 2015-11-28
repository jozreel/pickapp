var simple = require('simple');
var invcategory = new simple.simplemodel();
invcategory.modelname = "invcategory";

invcategory.addcategory = function(obj,callback)
{   
	this.name = obj.name;
	this.description =obj.description;
	this.save(callback,'A');
}
invcategory.editcategory = function(obj,callback)
{   this._id = obj._id;
	this.name = obj.name;
	this.description =obj.description;
	this.save(callback,'E');
}
invcategory.getcategories =function(callback)
{
	this.findall(callback,true);
}
invcategory.removecategory = function(arr,callback)
{
	for(var it in arr)
	{
	
	  var objid = this.createObjectId(arr[it]);
	  arr[it] = objid;
	}
	
	this.removegroup('_id',arr,callback);
}
module.exports = invcategory;