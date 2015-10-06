var simple = require('simple');
var admin= new simple.simplecontroler();

  admin.index =function()
	{	

	  var view = this.loadview('admin',{dyn:'', title:"Bootik Inovative automated shop"}, this.res);
	  
	}
	
module.exports = admin;