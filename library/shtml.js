
var shtml = function()
{

}

shtml.prototype.parse = function(dt)
{
	var ui ='';
	var cfg  = require('simple').config
	var fs = require('fs');
	var pt = require('path');
	var i=0;
	var ret = false;
	ui = dt.replace(/\$html\((\w+)\);/g, function(x,y,z){	
	   try{	 
		   i++;
		  // console.log(y);
		   
		  var path = cfg.viewpath + '/'+y+'.html';
		  path = pt.normalize(path);
	     var res =fs.readFileSync(path);
	     if(res !== undefined)
		  return res.toString();
		 else
		   return '&nbsp';
				 
	   }
	   catch(err){console.log(err);}
				 
			 });
	
	 if(ui !== undefined)
	 {
	  if(i!==0 )
	     ui = this.parse(ui);
	  
      return ui;
	  
	 }
	 else return '';
}

shtml.prototype.parseconfig = function(dt, partern)
{
	var ui ='';
	var cfg  = require('simple').config
	var fs = require('fs');
	var pt = require('path');
	var i=0;
	var ret = false;
	
	ui = dt.replace(partern, function(x,y,z){	
	   try{	 
		   i++;
		  // console.log(y);
		   
		  var path = cfg[y];
		  path = pt.normalize(path);
	    // var res =fs.readFileSync(path);
	   //  if(res !== undefined)
		  return path.toString();
		// else
		 //  return '&nbsp';
				 
	   }
	   catch(err){console.log(err);}
				 
			 });
	
	 if(ui !== undefined)
	 {
	  if(i!==0 )
	     ui = this.parse(ui);
	  
      return ui;
	  
	 }
	 else return '';
}

shtml.prototype.parseother = function(dt, partern,callback)
{
	var ui ='';
	var cfg  = require('simple').config
	var fs = require('fs');
	var pt = require('path');
	var i=0;
	var ret = false;
	
	ui = dt.replace(partern, function(x,y,z){	
	   try{	 
		   i++;
		   console.log(y);
		  return callback(y) 
		 // var path = cfg[y];
		  //path = pt.normalize(path);
	    // var res =fs.readFileSync(path);
	   //  if(res !== undefined)
		 // return path.toString();
		// else
		 //  return '&nbsp';
				 
	   }
	   catch(err){console.log(err);}
				 
			 });
	
	 if(ui !== undefined)
	 {
	  if(i!==0 )
	     ui = this.parse(ui);
	  
      return ui;
	  
	 }
	 else return '';
}

shtml.prototype.baseurl= function(str)
{
	
  return this.parseconfig(str, /(\$_BASEURL)/g)	
}

shtml.prototype.addlink = function(str)
{
	
	return this.parseother(str, /\$link\(([-A-Z0-9+&@#\/%?=~_|!:,.;]*[A-Z0-9+&@#\/%=~_|])\);/g, function(y){ return 'link rel="import" href="'+y+'"'; console.log(y);});
}
module.exports = new shtml();




