var cache = function(req, res)
{
	this.req= req;
	this.res= res;
}

cache.prototype.cacheFile=function(fname)
{
	
	var cfg = require('../config/config');
	var path = cfg.publicpath + '/'+fname;
	var fs = require('fs');
	
	var stats = fs.statSync(path);
	var mtime = stats.mtime;
	var size = stats.size;
	
	var modSince = this.req.headers["if-modified-since"];
	//console.log(modSince);
	
	if(modSince !=null)
	{
		//console.log(modSince);	
	   modSince = new Date(modSince);
	if(modSince.getTime()==mtime.getTime())
	{
		
       this.res.writeHead(304,{"if-modified-since":mtime.toUTCString()});
		this.res.end();
		
		return true;
	}
	else
	   return false;
	}
	return false;
}

cache.prototype.writemime =function(ext, data,fname,mime)
{
	//console.log(fname);
	var cc;
	var ex;
	var prag;
	if(this.Cache_Control!=null) cc= this.Cache_Control; else cc = 'max-age=600';
	
	var cfg = require('../config/config');
	var path = cfg.publicpath + '/'+fname;
	var fs = require('fs');
	var stats = fs.statSync(path);
	var mtime = stats.mtime;
	var size = stats.size;
	this.res.setHeader("Cache-Control",cc);
	if(this.pragma !=null)
	{
		prag= this.Pragma;
		this.res.setHeader('Pragma', prag);
	}
	else this.res.setHeader('Pragma', 'no-cache');
	//console.log(ext);
	if(this.Expires!=null) 
	{
		ex= this.Expires;
	   var d =new Date();
	   d.setMinutes(d.getMinutes()+ex);
	
    this.res.setHeader("Expires", d.toUTCString());
	}
	else
	  this.res.setHeader("Expires", '-1');
	this.res.setHeader('Last-Modified', mtime);
	//console.log(this.res);
	this.res.writeHead(200, {'Content-Type':mime+'/'+ext});
	if(mime !=='text')
	 this.res.end(data, 'binary');
	else
	   this.res.end(data.toString());
	  // console.log(mime);
	  
}

module.exports = cache;