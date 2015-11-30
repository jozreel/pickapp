var simple = require('simple');
var cart = new simple();

cart.savecart = function(obj, callback)
{
    this.insertcounters('cartid');
	//console.log(obj);
	this.generateNextSequence('cartid', function(next){
	this.cartid = next;
	this.items = obj.items;
	this.save(callback,'A');
	});
}

cart.updateCart = function(obj, callback)
{
   
}
