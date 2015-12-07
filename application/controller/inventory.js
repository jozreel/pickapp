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
    
    if(this.req.session.get('login')&& this.req.session.get('group')=='user')
   {
       
         var userid = this.req.session.get('username');
       
         var incomingdata = this.req.postdata.cartdata;
         var mod = this.loadmodel('cart');
        
          mod.findusercart(userid, function(doc)
          {
           
            if(Object.keys(doc).length >0)
            {
             
             mod.updatecart(doc,incomingdata.itemid,function(doc1)
             {
               
               inventory.jsonResp(doc1);
             });
             
            }
            else
            {
             
              
               incomingdata.userid = userid;
               mod.savecart(incomingdata, function(doc)
                 {
                     inventory.jsonResp(doc);
               });
              
            }
            
        
            
          }
          );
        
     }
   
    
  }
  
  inventory.updatecartsession = function()
  { //fix this
    
      
    var cart={};
  
   
      
     if(this.req.postdata.event == 'A')
     {
     
       if(this.req.session.get('cart') !== '')  
          cart = JSON.parse(this.req.session.get('cart'));
          
       var incomingdata = this.req.postdata.cartdata;
       
       var count = 1;
       for(var item in cart.items)
       {
        // console.log(item);
         if(cart.items[item].itemid === incomingdata.itemid)
         {
          
          count = parseInt(cart.items[item].count)+1;
          cart.items[item].count=count;
          cart.count =parseInt(cart.count)+1;
          break;
         }
        
       }
       if(count === 1)
       {
       incomingdata.count = count;
        
       cart.items.push(incomingdata);
       cart.count+=1
      
       }
      // console.log(cart);
       this.req.session.change("cart", JSON.stringify(cart));
       length = 0;
      
         length+= cart.count;
       
        inventory.jsonResp({sucess:true, count:length});
       
     }
   
  }
  
  
  inventory.getcartitems = function()
  {
   
   if(this.req.session.get('login')&& this.req.session.get('group')=='user')
   {
     this.getcartitemsdb(this.req.session.get('username'));
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
     
      length = cart.count;
     
     }
     
     inventory.jsonResp({sucess:true, count:length});
    
  }
  
  
  inventory.getcartitemsdb = function(userid)
  {
      var mod = this.loadmodel('cart');
        
       mod.findusercart(userid, function(doc)
       {
         inventory.jsonResp({success:true, count:doc.count});
       });
  }
  
  inventory.findcartitems = function()
  {
   
    var cart;
    var inv = this;
    if(this.req.session.get('login') === 'true')
    {
      var mod = this.loadmodel('cart');
      mod.findusercart(this.req.session.get('username'),function(doc)
      {
       
        
        
        inv.findcartitemssession(doc);
      }
      );
    }
    else
    {
     cart = JSON.parse(this.req.session.get('cart'));
      this.findcartitemssession(cart);
    }
  }
  
  inventory.findcartitemssession = function(cart)
  {
   
   
   /* var arr=[];
    var mod = this.loadmodel('inventory');
    for(var it in cart.items)
    {
     
      var objid = mod.createObjectId(cart.items[it].itemid);
     console.log(objid);
	    arr[it] = objid;
    }
     
    
    mod.find({'_id': {$in:arr}},{name:true, desc:true, image:true,price:true},{sort:'name'},true,function(doc)
    {var decd = mod.decodeallValues(doc);
     
      mod.convertImagesToBase64(decd);
    // decd.count = 
      for(var it in decd)
      {
        decd[it].count = inventory.addcartdata(cart,decd[it]._id);
      }
      inventory.jsonResp(decd);
    });*/
    
    
    
    
    
    
    
    var itemid;
   
    var docs =[];
   
    var dc;
    var arr=[];
    var mod = this.loadmodel('inventory');
    for(var it in cart.items)
    {
     
      var objid = mod.createObjectId(cart.items[it].itemid);
     
	    arr[it] = objid;
    }
   var stop = 1;
  var curr = 0;
  var total = 0.00;
   var async = require('async');
  
   async.whilst(
      function () { return curr < stop;},
     function(callback)
     {
      mod.find({'_id': {$in:arr}},{name:true, desc:true, image:true,price:true},{sort:'name'},false,function(doc,count)
      {
       
       if(stop === 0)
          stop=count;
      curr ++;
      if(doc._id !== undefined) 
      {
       itemid = doc._id.toString();
      
     
       for(var it in cart.items)
       {
      
         if(cart.items[it].itemid === itemid)
         {
           
             doc.count = cart.items[it].count;
             
             break;

             
         }
         
       }
      }
       if(doc.uprice !== '')
       {
        
        total = total + (parseFloat(doc.uprice) * doc.count);
        //console.log(count);
         
       }
     //  var d = JSON.stringify(doc);
       
       docs.push(doc);
       
       
       
       if(curr === count)
       {
         
         callback(null, total);
       }
     
    }); 
   
     
     },
   
   function(err, tot)
     {
       if(err)
        console.log(err);
     
      var obj = {}; 
       var decd = mod.decodeallValues(docs);
       mod.convertImagesToBase64(decd);
      
       obj.total = total.toFixed(2);
       obj.items = JSON.stringify(decd);
    //// decd.count = 
      // console.log(JSON.parse(obj));
     
      inventory.jsonResp(obj);
     }
   );  

    
   
  }
  inventory.showcart = function()
  {
   var common = require('./common');
	
	  common.getheaderdetails(this);
  
    this.loadview('cart');
  }
  inventory.addcartdata = function(cart,item)
  {
     for(var it in cart.items)
       {
      
         if(cart.items[it].itemid === item.toString())
         {
           
            return cart.items[it].count;
           
            break;
         }
       }
       return 0;
       
  }
 
	module.exports = inventory;
	