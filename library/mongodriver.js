
var DB = require('mongodb').Db;

var mongodriver =function()
{
 
  this.MongoClient = require('mongodb').MongoClient;
 this.Server =  require('mongodb').Server;
 this.assert = require('assert');
 this.db = 'mongosb';
 this.connectionString = 'mongodb://dbuser:passwd@localhost:27017/bootik'; //abuild from config;
mongodriver.prototype.crudConnet = function(){ 
	var db =new DB('bootik', new Server('localhost', 27017));
  // Establish connection to db
  db.open(function(err, db) {
    assert.equal(null, err);

    // Add a user to the database
    db.addUser('jozreel', 'pass', {roles:[
         { role: "readWrite", db: "bootik" },
         { role: "read", db: "products" },
         { role: "read", db: "sales" },
         { role: "readWrite", db: "accounts" }]},function(err, result) {
      assert.equal(null, err);

      // Authenticate
      db.authenticate('jozreel', 'pass', function(err, result) {
        assert.equal(true, result);

        // Logout the db
        db.logout(function(err, result) {
          assert.equal(true, result);

          // Remove the user
          db.removeUser('jozreel', function(err, result) {
            assert.equal(true, result);

            db.close();
          });
        });
      });
    });
  });
}
//b = new Mongo().getDB("myDatabase");
mongodriver.prototype.connect =function(){
  var obj = this;
  var db =new DB('bootik', new this.Server('localhost', 27017));
  db.open(function(err,db)
  {
    if(err)
      console.log(err);
  });
  
  
/*MongoClient.connect("mongodb://dbuser:passwd@localhost:27017/bootik", function(err,db)
{
	if(err)
	   console.log(err);
  obj.db=db;

	var collection = db.collection('test');
	 var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
   // var user2 = {name: 'modulus user', age: 22, roles: ['user']};
   // var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};
   collection.insert([user1], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
	   db.close();
   });
      //Close connection
     // db.close();
     
}
);	*/
}



mongodriver.prototype.removeone = function(cat, callback)
{
  var res = {};
  res.success=true;
  var obj1 = this;
  this.MongoClient.connect(this.connectionString, function(err, db)
  {
   if(err)
       throw err;
    var collection = db.collection(obj1.modelname);
    collection.deleteOne(
      cat,
      function(err, results) {
        try{
        if(err)
        {
           console.log(err)
           res.error = err;
           res.success = false;
        }
         console.log(results);
         res.results = results;
         callback(res);
        }
        catch(error){console.log(error);}
      }
   );
  }
  );
  
}

mongodriver.prototype.insert = function(obj,callback)
{
  var obj1 = this;
  //console.log(this.MongoClient);
  this.MongoClient.connect(this.connectionString, function(err, db)
  {
    var res ={};
    res.success = true;
    if(err)
      console.log(err)
      //console.log(obj);
      var collection = db.collection(obj1.modelname);
      collection.insertOne(obj,{w:1}, function(err, result){
        
        if(err)
        {
           res.success = false;
           res.error=err;
        }
         db.close();
         if (callback && typeof(callback) == "function")  
              callback(res);
           
      });
    
  }
  );
}

mongodriver.prototype.createObjectId =function(id)
{
  var Objectid = require('mongodb').ObjectID;
  var id = new Objectid(id);
  return id;
}

mongodriver.prototype.updateOne =function(cat, vals, callback)
{var obj1 =this;

  var res = {};
  res.success=true;
 //console.log(cat);
  this.MongoClient.connect(this.connectionString, function(err, db)
  {
    if(err)
    {
      console.log(err);
      res.error=err;
      res.success=false;
    }
       
      var collection = db.collection(obj1.modelname);
      console.log(obj1.modelname);
     // console.log(vals);
      collection.updateOne(cat, {$set: vals, $currentDate: { "lastModified": true }},{w:1}, function(err,result)
      {
        if(err)
          console.log(err);
          db.close();
          if (callback && typeof(callback) == "function")  
              callback(res);
      }
      );
  });
}


mongodriver.prototype.updateMany =function(cat, vals)
{var obj1 =this;
 //console.log(cat);
   this.MongoClient.connect(this.connectionString, function(err, db)
  {
    if(err)
      console.log(err)
      //console.log(obj);
      var collection = db.collection(obj1.modelname);
      collection.updateMany(cat, {$set: vals, $currentDate: { "lastModified": true }},{w:1}, function(err,result)
      {
        if(err)
          console.log(err);
          db.close();
      }
      );
  });
}
mongodriver.prototype.replace=function(id, rep)
{
  var obj1 = this;
  this.mongoClient.connect(this.connectionString, function(err, db)
  {
    if(err)
        throw err;
     var collection = db.collection(obj1.modelname);
     collection.replaceOne({'_id':id}, rep,{w:1}, function(err ,result) {
       if(err)
         console.log(err);
         db.close();
     })
  });
  
}



mongodriver.prototype.find = function(cond,opt, coll,callback)
{
  var obj = this;
  this.MongoClient.connect(this.connectionString, function(err, db)
  {
   if(err)
       throw err;
   // console.log(opt);
    var collection = db.collection(obj.modelname);
    if(opt!==null)
    {
        collection.find(cond,opt).count(function(err,count){ 
          if(err)
            {
              throw err;
              console.log(err);
            }
          if(count >0){
             var cursor = collection.find(cond,opt);  
            // db.close();
             obj.traverseCursor(cursor,db, callback,count,coll);
             } 
             else
             {   db.close();
                 callback({});
             }
        });
    }
     else if(opt===null)
     {
        collection.find(cond).count(function(err,count){ 
          if(count >0){
            
            var cursor = collection.find(cond);  obj.traverseCursor(cursor,db, callback,count,coll);
            }
             else 
             { 
               callback({});
              }
         });
     }
  }
  );
  
}



mongodriver.prototype.findall = function(callback,coll)
{
  
  var obj = this;
  this.MongoClient.connect(this.connectionString, function(err, db)
  {
    if(err)
      throw err;
    var collection = db.collection(obj.modelname);
    collection.find().count(function(err,count){
      if(err)
      {
        throw err;
        console.log(err);
      }
      if(count > 0)
      {
       var cussor = collection.find();
       
       
       obj.traverseCursor(cussor,db, callback,count,coll);
      }
     
    });
  //  this.assert.equal(err,null)
   // obj.traverseCursor(cussor,db, callback);
    //callback(cussor);
    
  }
  );
  
}


mongodriver.prototype.test = function()
{
    
}
//mongoDbDriver.prototype.save(obj)

mongodriver.prototype.getDb = function()
{
  //console.log(this.db);
  return this.db;
}
mongodriver.prototype.close = function()
{
  this.db.close();
}
}


mongodriver.prototype.traverseCursor =function(cursor,db, callback,count,coll)
 {
	 var obj=this;
   var itter = 0;
  var tmparr =[];
  
	 cursor.each(function(err, doc) {
     
      obj.assert.equal(err, null);
	  if(doc!==null)
	  {
       itter++;
       if(coll === true)
       {
         //console.log(doc);
         tmparr.push(doc);
         if(itter == count)
         {
            db.close();  
            
            callback(tmparr);
            
         }
       
       }
       else
       {
        callback(doc,count,itter);
       }
    // 
		 
	  }
    else
    {
      //db.close();
    }
	 }
	 );
   if(itter == count)
      db.close();
    //console.log('door');
     
 }
 
 mongodriver.prototype.searchword =function(needle, callback, batch)
{
   var res = Array();
   var ids = Array();
  // var itter = 0;
   var obj = this;
   
   if(needle !== undefined)
   {
   this.findall(function(doc, count,itter){
     try{
      for(var indx in doc)
      {
         
         if(typeof doc[indx] === 'string')
           {
              if(doc[indx].toLowerCase().match(new RegExp(needle.toLowerCase()),"i") !==null)
              {
                
            
                if(batch)
                {
                if(ids.lastIndexOf(doc['_id']) === -1)
                   {
                      
                     // console.log((doc[indx].search(new RegExp(needle,"i"))),doc[indx]);
                       res.push(doc);
                       ids.push(doc['_id']);
                       //console.log(res);
                       break;
                   }
                }
                else
                {
                  callback(doc);
                  break;
                }
              }
           }
        
      }
      if(batch && itter === count)
      {
       
         callback(res);
      }
     }
     catch(err)
     {
       if(err)
         console.log(err);
     }
   },false);
   }
   else{
    this.findall(callback, true)
   }
}
mongodriver.prototype.getMappedObject = function(obj)
{
   var temp = {};
   for(var key in obj)
   {
      temp.key = o= obj[key];
      
   }
   return temp;
}
 


module.exports =  mongodriver;

