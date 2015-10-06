//controler.prototype
var simple = require('simple');
var func = new simple.simplecontroler();

  func.ja =function(test, car)
	{	
	//var mongo = simple.mongo;
	//mongo.connect();
	//mongo.getDb();
	 //console.log(test, car);
	/* this.req.session.set('name' ,'joelle');
	 this.req.session.set('surname' ,'Laurent');
	 var mymod = this.loadmodel('func');
	  mymod.get(printit);*/
	 var args ='';
	 var name = this.req.session.get('name');
	 var surname = this.req.session.get('surname');
	 args = {name:name, surname:'laurent'}
	 this.req.session.create();
	
	var myview = this.loadview('home', args, this.res);
	//this.res.end();
	}

  function printit(val)
  {
	  //console.log(val.name, val._id);
  }
module.exports= func;

