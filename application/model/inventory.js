var simple = require('simple');
var inventory = new simple.simplemodel();
inventory.modelname= 'inventory';
inventory.add = function(obj,callback)
{
  inventory.name= obj.name;
  inventory.sku=obj.sku;
  inventory.image= obj.image;
  inventory.desc=obj.desc;
  inventory.manu=obj.manu;
  inventory.model=obj.model;
  inventory.uprice=obj.uprice;
  inventory.serial=obj.serial;
  this.save(callback,'A');

}
inventory.modify = function(obj,callback)
{
  
 
  inventory.name= obj.name;
  inventory._id = obj._id;
  inventory.sku=obj.sku;
  //console.log('image',obj.image );
  if(obj.image !==undefined)
     inventory.image= obj.image;
  inventory.desc=obj.desc;
  inventory.manu=obj.manu;
  inventory.model=obj.model;
  inventory.uprice=obj.uprice;
  inventory.serial=obj.serial;
  this.save(callback, 'E');
}
inventory.getAll = function(callback)
{
 // console.log('hi');
 this.findall(callback,true);
}
inventory.removeinv = function(obj, callback)
{
  this._id = obj._id;
  this.deleteone(callback);
}
module.exports= inventory;