var simple = require('simple');
var unit = new simple.simplemodel();
unit.modelname = "unit";

unit.addunit = function(obj,callback)
{   
	this.name = obj.name;
	this.description =obj.description;
	this.save(callback,'A');
}
unit.editunit = function(obj,callback)
{   this._id = obj._id;
	this.name = obj.name;
	this.description =obj.description;
	this.save(callback,'E');
}
unit.getunits =function(callback)
{
	this.findall(callback,true);
}
unit.removeunit= function(arr,callback)
{
	for(var it in arr)
	{
	
	  var objid = this.createObjectId(arr[it]);
	  arr[it] = objid;
	}
	
	this.removegroup('_id',arr,callback);
}
module.exports = unit;