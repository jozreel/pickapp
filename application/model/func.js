var simple = require('simple');
var func = new simple.simplemodel();
func.modelname = 'func';

func.name="jeanelle";
func.age=8;
func.address={home:'tsavanne', work:'potersville'};

func.add = function()
{
	
  this.save();

}
 func.mod = function(cat, vals)
 {
	  
     cat={age:8};
     vals={age:400};
	 this.updateMany(cat,vals)
 }
 
 func.getAll = function(callback)
 {
	
	this.findall(callback);
 }
 
 func.get = function(callback, cond)
 {
	cond= {'age':{$gt:100}};
	opt={fields:{_id:0}}
	this.find(cond,opt,callback);
 }
 
 func.g = function()
 {
	 this.findAll();
 }
 
 
module.exports=func;