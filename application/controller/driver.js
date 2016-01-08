var simple = require('simple');
var driver = new simple.simplecontroler();

driver.register = function()
{
	
	if(this.req.postdata.password === this.req.postdata.passwordr)
	{
 
	var md= this.loadmodel('driver');
	
	this.req.postdata.password = this.req.secure.encrypt(this.req.postdata.password);
	this.req.postdata.passwordr = this.req.secure.encrypt(this.req.postdata.passwordr)
   
	md.add(this.req.postdata, function(r){console.log(r);  driver.jsonResp(r)})
	   }
	   else
	   {
		   this.jsonResp({success:false, error:'password not match'});
	   }
	  
}
module.exports= driver;