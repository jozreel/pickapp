
var simplecontroler = function ()
{
	
   this.req=null;
   this.load  = require('./ajsload');
}
simplecontroler.prototype.create= function(resp,req)
{
	//console.log('hello');
  this.res = resp;
  this.req=req
  
  
  
}
simplecontroler.prototype.writeres= function(txt)
{
	//console.log(this.req);
 this.res.write(txt);
}
simplecontroler.prototype.loadview = function(vw,args,res)
{
	 //console.log('hi');
		return this.load.view(vw,args,res);
	
	
}

simplecontroler.prototype.loadmodel = function(name)
{
	
		return this.load.model(name);
	
	
}

simplecontroler.prototype.jsonResp =function(r)
{
	
       
	   this.res.writeHead(200, {'Content-Type':'text/plain'});
	   var jsn = JSON.stringify(r);
	   
	    this.res.end(jsn);
}

module.exports = simplecontroler;