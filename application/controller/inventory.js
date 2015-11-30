var simple = require('simple');
var inventory= new simple.simplecontroler();

 function testlogin()
 {
   if(inventory.req.session.get('login'))
   {
     return true;
   }
   else{
     inventory.req.redirect.redirect('https://'+inventory.req.hostname+':4433/user/login');
   }
 }

  inventory.add =function(test, car)
	{
    
	 if(testlogin())
    {
	  
	 
	   this.viewholder.title = "this is the inventory page";
	  // console.log('sda');
	   this.req.session.get('username');
	   
	   
	   
	   var view = this.loadview('inventory');
   }
   
	  
	}
	
	inventory.passdata = function()
	{
		 if(testlogin())
    {
	    var mymod = this.loadmodel('inventory');
	   if(this.req.postdata.event == 'A')
		   mymod.add(this.req.postdata, function(r){inventory.jsonResp(r);});
	   if(this.req.postdata.event == 'E')
	       mymod.modify(this.req.postdata, function(r){inventory.jsonResp(r);});
    }
        
	}
	inventory.viewall =function()
	{
		if(testlogin())
    {
		var mymod = this.loadmodel('inventory');
		
		mymod.getAll(this.display);
    }
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
	  
	//   console.log(strdoc);
      
      inventory.res.writeHead(200, {'Content-Type':'text/json'});
	  //var view = inventory.loadview('admin',{dyn:strdoc}, inventory.res);
	   var strdoc =JSON.stringify(docs);
	  
	  
	 //console.log(r.length);
	 inventory.res.end(strdoc);
   }
 /* inventory.jsonResp =function(r)
  {
	  
	 // console.log(r);
	   inventory.res.writeHead(200, {'Content-Type':'text/json'});
	   var jsn = JSON.stringify(r);
	  // console.log(jsn);
	   inventory.res.end(jsn);
  }
  */
  inventory.search=function(txt)
  {
	 // console.log(txt);
   if(testlogin())
    {
	  var mymod = this.loadmodel('inventory');
	 // console.log("hi");
	  mymod.search(txt,showres);
    }
	  
  }
  inventory.delete = function()
  {
    if(testlogin())
    {
	   var mymod = this.loadmodel('inventory');
	   
	  mymod.removeinv(this.req.postdata, this.jsonResp);
    }
  }
  inventory.index = function()
  {
	 this.viewholder.title = "this is the inventory page";
	 this.loadview('admin');
  }
  
  function showres(doc)
  {
	  //console.log(doc);
	  inventory.jsonResp(doc);
  }
  inventory.category = function()
  {
    if(testlogin())
    {
	  this.loadview('category');
    }
  }
  inventory.addcategory = function()
  {
    if(testlogin())
    {
    var obj=this;
	  var invmod = this.loadmodel('invcategory');
	  invmod.addcategory(this.req.postdata,
    function(r){obj.jsonResp(r);} );
    }
  }
  inventory.editcategory = function()
  {
    if(testlogin())
    {
    var obj=this;
    
	  var invmod = this.loadmodel('invcategory');
	  invmod.editcategory(this.req.postdata,
    function(r){obj.jsonResp(r);} );
    }
  }
  
   inventory.getcategory = function()
  {
    if(testlogin())
    {
    var obj=this;
	  var invmod = this.loadmodel('invcategory');
   
	  invmod.getcategories(function(r){
      obj.jsonResp(r);
    }
      );
    }
  }
   inventory.testdata = function()
  {
    
	 this.loadview('test');
  }
  inventory.removecategory = function()
  {
    if(testlogin())
    {
     var obj = this.req.postdata;
    
    var mod = this.loadmodel('invcategory');
   
     mod.removecategory(obj.ids, this.jsonResp);
    }
  }
  
  inventory.units = function()
  {
    if(testlogin())
    {
    this.loadview('unit');
    }
  }
  
  inventory.getunits = function()
  {
    if(testlogin())
    {
    var obj = this;
    var invmod = this.loadmodel('unit');
    invmod.getunits(function(r)
    {
     
       obj.jsonResp(r);
    });
    }
  }
  inventory.addunit = function()
  {
    if(testlogin())
    {
     var invmod = this.loadmodel('unit');
     invmod.addunit(this.req.postdata, this.jsonResp)
    }
  }
  inventory.editunit = function()
  {
    if(testlogin())
    {
    var obj=this;
    
	  var invmod = this.loadmodel('unit');
	  invmod.editunit(this.req.postdata,
    function(r){obj.jsonResp(r);} );
    }
  }
  inventory.instore=function()
  {
    
    var mod = this.loadmodel('inventory');
   
    mod.find({instore:'true'},{},{},true,
    function(doc)
    {
      var decd = mod.decodeallValues(doc);
      
      mod.convertImagesToBase64(decd);
      inventory.jsonResp(decd);
    }
    );
  }
  inventory.page = function(num)
  {
    

    var mod = this.loadmodel('inventory');
    mod.paginate(parseInt(num), function(r){inventory.jsonResp(r)});
  }
  
  inventory.job=function(data,next)
  {
   /// console.log(this.req.requestdata);
    console.log(data);
  //  console.log(next);
  }
  inventory.updatecart = function()
  {
   if(this.req.session.get('login')&& this.req.session.get('group')=='user')
   {
     this.updatecartdb();
   }
   else
   {
     this.updatecartsession();
   }
  }
  
  inventory.updatecartdb = function()
  {
    var cart = [];
     if(this.req.session.get('login')&& this.req.session.get('group')=='user')
   {
     
      if(this.req.postdata.event == 'A')
     {
         var incomingdata = this.req.postdata.cartdata;
         var mod = this.loadmodel('cart');
         cart.savecart(incomingdata, function(doc)
         {
           inventory.jsonResp(doc);
         });
     }
   }
    
  }
  
  inventory.updatecartsession = function()
  { 
    
      
    var cart=[];
  
   
     
     if(this.req.postdata.event == 'A')
     {
     
       if(this.req.session.get('cart') !== '')  
          cart = JSON.parse(this.req.session.get('cart'));
      
       var incomingdata = this.req.postdata.cartdata;
      
       var count = 1;
       for(var item in cart)
       {
         console.log(item);
         if(cart[item].itemid === incomingdata.itemid)
         {
          
          count = parseInt(cart[item].count)+1;
          cart[item].count=count;
          console.log(cart);
          break;
         }
        
       }
       if(count === 1)
       {
       incomingdata.count = count;
       cart.push(incomingdata);
       }
      // console.log(cart);
       this.req.session.change("cart", JSON.stringify(cart));
       length = 0;
       for(var item in cart)
       {
         length+= cart[item].count;
       }
        inventory.jsonResp({sucess:true, count:length});
       
     }
   
  }
  
  
  inventory.getcartitems = function()
  {
   if(this.req.session.get('login')&& this.req.session.get('group')=='user')
   {
     this.getcartitemsdb();
   }
   else
   {
     this.getcartitemssession();
   }
      
  }
  
  inventory.getcartitemssession = function()
  {
    
    var length=0;
    if(this.req.session.get('cart') !== '')  
     {
     
      var cart =  JSON.parse(this.req.session.get('cart'));
     
       for(var item in cart)
       {
        
         length+= cart[item].count;
       }
     
     }
     
     inventory.jsonResp({sucess:true, count:length});
    
  }
  
  inventory.findcartitemssession = function()
  {
   
    if(this.req.session.get('login')==='true')
    {
     
    var cart = JSON.parse(this.req.session.get('cart'));
    
    var arr=[];
    var mod = this.loadmodel('inventory');
    for(var it in cart)
    {
     
      var objid = mod.createObjectId(cart[it].itemid);
	    arr[it] = objid;
    }
      console.log('lplp');
    
    mod.find({'_id': {$in:arr}},{name:true, desc:true, image:true,price:true},{sort:'name'},true,function(doc)
    {var decd = mod.decodeallValues(doc);
      
      mod.convertImagesToBase64(decd);
      
      inventory.jsonResp(decd);
    });
    }
    else
    {
      
      inventory.jsonResp({});
    } 
  }
  inventory.showcartsession = function()
  {
    if(this.req.session.get('login')=== 'true')
	{
		
		this.viewholder.user = this.req.session.get('username');
		this.viewholder.useraction='<a class="plainlink" href ="/user/logout">Logout</a>';
	}
	else{this.viewholder.user="Guest"
	this.viewholder.useraction='<a class="plainlink" href ="/user/login">Login</a>';
	}
    this.loadview('cart');
  }
	module.exports = inventory;
	