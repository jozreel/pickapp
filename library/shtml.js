
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
module.exports = new shtml();




