var simple = require('simple');
var accountcategory = new simple.simplemodel();
accountcategory.modelname= "accountcategory";
accountcategory.add = function(obj,callback)
{
	
	this.categoryname= encodeURI(obj.catname);
	this.categoryno = encodeURI(obj.catno);
	this.categorydescription = encodeURI(obj.categorydescription);
	if(obj.event=='A')
	  this.save(callback,'A');
	if(obj.event =='E')
	   this.modify(callback,'E');
	
}

accountcategory.findcat= function(callback)
{   
	this.findall(callback,true);
}

module.exports = accountcategory;