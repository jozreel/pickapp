var cfg = require('../config/config');
var pt = require('path');
var world = require('world');
var ajsloadable = function()
{
	this.viewpth = global.viewpath;
}

ajsloadable.prototype.view=function(view, args, resp)
{
	
	resp.writeHead(200, {'Content-Type':'text/html'});
	//var res = 'hello';
	var fs = require('fs');
	var path = cfg.viewpath + '/'+view+'.html';
	path = pt.normalize(path);
	
	 fs.readFile(path, function(err, data)
		 {
			 
			 var vals = args;
			 var dt = data.toString();
			 //var pt= '/\{{(\w+)\}}/';
			 
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
				 
			 })
			 
			 
			 //console.log(resp);
	
			 resp.write(ui);	
			 resp.end("");
		 }
		 ); 
		  	 
			  
			  
			  
			
		//return res;	
}

ajsloadable.prototype.viewpart=function(view, args, resp)
{
	
	var fs = require('fs');
	var path = cfg.viewpath + '/'+view+'.html';
	path = pt.normalize(path);
	
	 var res =fs.readFileSync(path)
			  
			  
			  
			
	return res.toString();
}

ajsloadable.prototype.model = function(model)
{
	
	var mod = require('../application/model/'+model);
	//console.log(mod);
	return mod;
	
}
module.exports = new ajsloadable();