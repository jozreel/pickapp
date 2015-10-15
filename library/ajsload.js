var cfg = require('../config/config');
var pt = require('path');
var world = require('world');
var ajsloadable = function()
{
	this.viewpth = cfg.viewpath;
	this.html = "";
	//console.log(this.html);
}

ajsloadable.prototype.view=function(view, args, resp,cache)
{
	
	//resp.writeHead(200, {'Content-Type':'text/html'});
	//var res = 'hello';
	var fs = require('fs');
	
	var path = cfg.viewpath + '/'+view+'.html';
	path = pt.normalize(path);
	var obj = this;
	//cache file depending on weather values stored in dbase is different from values in file ... todo
	if(cache == true)
	{
	if((resp.cache !== undefined && !resp.cache.cacheFile(path,true)) || resp.cache === undefined)
	//{
	//console.log(path);
	
	 fs.readFile(path, function(err, data)
		 {
			 
			 var vals = args;
			 var dt = data.toString();
			 var shtml = require('simple').shtml;
			 dt =shtml.parse(dt);
			 //var pt= '/\{{(\w+)\}}/';
			var ui=  obj.parse(vals,dt)
			
			 obj.output(resp,ui,path);
			 //console.log(resp);
		
		
		 }
		 ); 
		  	 
			  
			  
	}
	else
	{
		 fs.readFile(path, function(err, data)
		 {
			 //prevent from breaking if file not found
			 
			 var vals = args;
			 var dt = data.toString();
			 var shtml = require('simple').shtml;
			 dt =shtml.parse(dt);
			 //var pt= '/\{{(\w+)\}}/';
			var ui=  obj.parse(vals,dt)
			
			 obj.output(resp,ui,path);
			 //console.log(resp);
		
		
		 }
		 ); 
	}		  
			
		//return res;	
}


ajsloadable.prototype.parse = function(vals, dt)
{
	var ui= dt.replace(/\%(\w+)\%/g, function(x){
				 var key = x.slice(1,-1);
				 //console.log(key);
				 if(vals[key])
				 {
				   return vals[key];
				 }
				 else
				 {
					 return '';
				 }
				 
			 });
          return ui;
			 
}

ajsloadable.prototype.output = function(resp,ui,fname,cache)
{
	if(cache == true)
	{
	if((resp.cache !== undefined && !resp.cache.cacheFile(fname, true)) || res.cache == undefined)
		      resp.cache.writemime('html',ui,fname,'text',true);
	}
	else
	 resp.cache.writemime('html',ui,fname,'text',true);
	  
			
}

ajsloadable.prototype.zoutput = function(resp,ui,fname)
{
	       var zlib = require('zlib');
			 if(resp.compress !==undefined && resp.compress.compress === true)
			 {
				  //var raw = fs.createReadStream('index.html');
				  if (resp.compress.acceptEncoding.match(/\bdeflate\b/)) {
                     zlib.deflate(ui, function (err, buffer) {
						 if (err) throw err;
						 resp.writeHead(200, {
							 'Content-Encoding': 'deflate'
							  },{'Content-Type':'text/html'});
							  resp.end(buffer);
					  
					 });
                     } 
					 else if (resp.compress.acceptEncoding.match(/\bgzip\b/)) {
						  zlib.gzip(ui, function (err, buffer) {
						 if (err) throw err;
                         resp.writeHead(200, { 'content-encoding': 'gzip' },{'Content-Type':'text/html'});
						  
						  resp.end(buffer);
                   });
			 }
			 }
			 else
			 {
	         resp.writeHead(200, {'Content-Type':'text/html'});
			 resp.write(ui);	
			 resp.end("");
			 }
			 
}



ajsloadable.prototype.loadviewpart=function(view,resp)
{
	//console.log(resp);
	var obj = this;
	var fs = require('fs');
	var path = cfg.viewpath + '/'+view+'.html';
	path = pt.normalize(path);
	if((resp.cache !== undefined && !resp.cache.cacheFile(path,true)) || resp.cache === undefined)
	{
	 var res =fs.readFileSync(path);
	 
		
		 //console.log(this.html); 
		 obj.html += res.toString();
		 var shtml = require('simple').shtml;
	     obj.html = shtml.parse(obj.html);
	}
		
	
			  
	  
			  
			
	//return res.toString();
}

ajsloadable.prototype.showLoadedViews = function(args,resp)
{  
	
	if(this.html !=='')
	{
	  
	  var ui = this.parse(args, this.html)
	  //console.log(this.html);
	  this.zoutput(resp, ui);
	  this.html = "";
	}
	else
	 {
		 resp.end('');
	 }
}



ajsloadable.prototype.model = function(model)
{
	
	var mod = require('../application/model/'+model);
	//console.log(mod);
	return mod;
	
}
module.exports = new ajsloadable();