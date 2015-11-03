
var simplecontroler = function ()
{
	//console.log('control');
   this.req=null;
   this.viewholder =[];
   
   
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
	   //console.log(this.req.method);
		return this.load.view(vw,args,res,this.req.ctr);
	
	
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

simplecontroler.prototype.showtemplate =function()
{var res = this.res;
  var cfg = require('../config/config');
  var temp = require('./template');
  var template = new temp()
  var sc= this;
	//var tempname = this.templatename;
	if(cfg.templatable ===true)
	{
		//console.log('inthis');
		this.templateid = cfg.templateid;
		template.loadtemplate(this.templateid, function(arr,tname, err)
		{
			//console.log(arr);
			//for(var att in arr.media)
			//{
				
			//}
			if(arr.success !==undefined && arr.success ===false)
			 sc.jsonResp(arr);
			else
			  sc.load.showintemplate(tname,arr,res,false);// use this as the callback to load template;
		}
		);
		
	}
}

module.exports = simplecontroler;