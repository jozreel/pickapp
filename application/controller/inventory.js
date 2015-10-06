var simple = require('simple');
var inventory= new simple.simplecontroler();

  inventory.add =function(test, car)
	{	
	 
	  var mymod = this.loadmodel('inventory');
	  
	  var view = this.loadview('inventory',{dyn:'', title:"inventory"}, this.res);
	  
	}
	
	inventory.passdata = function()
	{
		console.log(this.req.postdata);
	    var mymod = this.loadmodel('inventory');
	   if(this.req.postdata.event == 'A')
		  mymod.add(this.req.postdata, this.jsonResp);
	   if(this.req.postdata.event == 'E')
	       mymod.modify(this.req.postdata, this.jsonResp);
        
	}
	inventory.viewall =function()
	{
		
		var mymod = this.loadmodel('inventory');
		
		mymod.getAll(this.display);
	}
	
	inventory.viewtable =function()
	{
		
		var mymod = this.loadmodel('inventory');
		
		mymod.getAll(this.display);
	}

  inventory.display=function(docs)
   {
	   
	    //console.log(docs,);
	  //console.log(docs);
	  // var r = Array();
	  // r.push(doc);
	  var strdoc =JSON.stringify(docs);
	//   console.log(strdoc);
      
      inventory.res.writeHead(200, {'Content-Type':'text/json'});
	  //var view = inventory.loadview('admin',{dyn:strdoc}, inventory.res);
	
	  
	  
	 //console.log(r.length);
	 inventory.res.end(strdoc);
   }
  inventory.jsonResp =function(r)
  {
	  
	 // console.log(r);
	   inventory.res.writeHead(200, {'Content-Type':'text/json'});
	   var jsn = JSON.stringify(r);
	  // console.log(jsn);
	   inventory.res.end(jsn);
  }
  
  inventory.search=function(txt)
  {
	 // console.log(txt);
	  var mymod = this.loadmodel('inventory');
	 // console.log("hi");
	  mymod.searchword(txt,showres,true);
	  
  }
  inventory.delete = function()
  {
	   var mymod = this.loadmodel('inventory');
	   
	  mymod.removeinv(this.req.postdata, this.jsonResp);
  }
  inventory.index = function()
  {
	 var view = this.loadview('admin',{dyn:'', title:"inventory"}, this.res);
  }
  
  function showres(doc)
  {
	  //console.log(doc);
	  inventory.jsonResp(doc);
  }
	module.exports = inventory;
	