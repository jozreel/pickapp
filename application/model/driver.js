var Simple= require('simple');
var driver = new Simple.simplemodel();
driver.modelname = 'driver'
driver.add = function(obj,callback)
{
	
	var extmsg ="";
	if(obj.event = 'E')
	{
		this.id = obj.id;
	}
	this.firstname = obj.fname;
	this.lastname = obj.lname;
	this.alias = obj.alias;
	this.email = obj.email;
	this.password = obj.password;
	this.trialperiod = obj.trialperiod;
	this.address= {};
	this.address.country = obj.country;
	this.address.street =obj.street;
	this.address.town = obj.town;
	this.address.state = obj.state;
	this.address.terminal =obj.terminal;
	this.address.finalstop = obj.finalstop;
	this.taxi ={};
	this.taxi.vmodel = obj.vmodel;
	this.taxi.vregno = obj.vregno;
	this.taxi.vshortdesc= obj.vdesc;
	if(obj.vpic !== undefined && obj.vpic.size < 10000)
	{
		this.vpic = obj.vpic;
	}
	else{
		extmsg = "your taxi image too big select smaller";
	}
	if(obj.avatar !== undefined && obj.avatar.size < 10000)
	{
		this.avatar = obj.image
	}
	else{
		extmsg += " your image too big select smaller";
	}
	if(obj.busstop !=undefined)
	{
		this.address.busstop=obj.busstop;
	}
	
	var me = this.prepare();
	this.insertOrUpdate(me, function(doc){doc.extraamessage = extmsg; callback(doc);}, obj.event);
	
}
driver.updatelocation = function(obj,callback)
{
	this._id = obj.id;
	this.lastlat = obj.lat;
	this.lastlng = obj.lng;
	this.save(callback,'E');
	
}
module.exports=driver;

