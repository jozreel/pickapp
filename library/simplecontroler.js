
var simplecontroler = function ()
{
	//console.log('control');
   this.req=null;
   
   
}
simplecontroler.prototype.create= function(resp,req)
{
	//console.log('hello');
  this.res = resp;
  this.req=req
  this.load  = require('./ajsload');
  
  
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

simplecontroler.prototype.loadviewpart = function(view)
{
	 //console.log('hi');
		return this.load.loadviewpart(view,this.res);
	
	
}

simplecontroler.prototype.showviews = function(args,res)
{
	 //console.log('hi');
		return this.load.showLoadedViews(args,res);
	
	
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