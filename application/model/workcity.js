var simple = require('simple');
var workcity = new simple.simplemodel();
workcity.modelname = "workcity";
workcity.add = function(obj, callback)
{
	
	

var wrkc = {};
this.list(obj.country, obj.state, function(doc)
   {
	
	   if(doc !== undefined && Object.keys(doc).length !==0)
	   {
		  
		   wrkc._id = doc[0]._id;
	   }
	if(obj.state !== undefined)
	{
		 wrkc.state = obj.state;
	}
	wrkc.city = obj.city;
	wrkc.country= obj.country;
	console.log(obj.city);
   // console.log(wrkc);
    workcity.insertOrUpdate(wrkc,callback); 
   });
   
}
workcity.list = function(country,state,callback)
{  
	var regext = new RegExp(country,'i');
	var regexci = new RegExp(state,'i');
	console.log(regext,regexci);
	this.find({country:regext,state:regexci},{},{},true,callback);
}
module.exports = workcity;
