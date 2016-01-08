var simple = require('simple');
var busstops = new simple.simplemodel();
busstops.modelname ='busstops';
busstops.updateandsave = function(obj, callback)
{   var i = 0;
   this.list(obj.country, obj.stops[0].city ,  function(doc)
   {
	  var stps = {};
	   if(doc !== undefined && Object.keys(doc).length !==0)
	   {
		   stps._id = doc[0]._id;
		   console.log(stps);
	   }
		  for(var doc in obj.stops)
	     {  
	  
	      obj.stops[doc].city = obj.city;
		 }
	  
	   
	 
	 stps.stops = obj.stops;
	 stps.country = obj.country
	
	 busstops.insertOrUpdate(stps,callback); 
	 
	 
   });
	
}
busstops.list = function(country, city,callback)
{  
	var regext = new RegExp(country,'i');
	var regexci = new RegExp(city,'i');
	this.find({country:regext, 'stops.city':regexci},{},{},true,callback);
}
module.exports = busstops;