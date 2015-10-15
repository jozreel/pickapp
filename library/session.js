var session = function(requ, res){
	
	this.req = requ;
	this.resp=res;
	this.sessionVars={};
	this.sessionreqvars={};
	this.expdays =10;
	//console.log(this.bla);
	//this.parseCookies();
}
session.prototype.makeCookie = function(cname, cvalue, expdays)
{
	var d = new Date();
	d.setTime(d.getTime() + (expdays*24*60*60*1000));
	var exp = 'expires='+d.toUTCString();
	var ck = cname + "=" + cvalue + "; " + exp;
	return ck;
}

session.prototype.getCookie =function(cname)
{
	/*//console.log(this.req.headers.cookie);
	var name = cname+'=';
	var ckArray= this.req.headers.cookie.split(';');
	for(var x in ckArray)
	{
		var c = ckArray[x];
		while(c.charAt(0)==' ') c= c.substring(1);
		if (c.indexOf(name) == 0) 
		return c.substring(name.length, c.length);
	}
	return "";
	*/
}

session.prototype.create = function()
{
	var ck =[];
	var d = new Date();
	d.setTime(d.getTime() + (this.expdays*24*60*60*1000));
	var exp = 'expires='+d.toUTCString();
	
	for(var ses in this.sessionVars)
	{
		ck.push(ses + '='+ this.sessionVars[ses] + ';' +exp);
		
	}
	//ck = ck.slice(0,-1);
	//console.log(ck);
	this.resp.setHeader('Set-Cookie', ck);
	
	return ck;
}
session.prototype.set =function(cname,value)
{
	val = this.encrypt(value);
	// var ck = this.makeCookie(cname,val, 10);
	 //this.resp.setHeader('Set-Cookie', ck);
	 this.sessionVars[cname]=val;
	 
	// console.log(this.req.session.name);
}
session.prototype.get = function(cname)
{
	this.getallCookies();
    // console.log(this.sessionreqvars);
	 var ck = this.sessionreqvars[cname];
	// console.log(ck);
	 if(ck)
	  return ck;
	  else
	  return "";
	  
	// this.resp.setHeader('Set-Cookie', ck);
}

session.prototype.parseCookies = function()
{
	console.log(this.req.session.name);
	//console.log('hi');
	for(var x in this.req.session)
	{
		console.log(x.req.session);
		
		if(x!=='req' || x!=='resp')
		     this.set(x,this[x]);
	}
}


session.prototype.getallCookies =function()
{
	//console.log(this.sessionVars);
	 // var name = cname+'=';
	// console.log(this.req);
	var ckArray=[];
	if(this.req.headers.cookie)
	{
	  ckArray= this.req.headers.cookie.split(';');
	for(var x in ckArray)
	{
		var c = ckArray[x];
		while(c.charAt(0)==' ') c= c.substring(1);
		var ns = c.split('=');
		if( this.sessionreqvars[ns[0]])
		{
			//console.log('in');
		   delete this.sessionreqvars[ns[0]];
		   this.sessionreqvars[ns[0]]=ns[1];
		}
		else
		 this.sessionreqvars[ns[0]]=ns[1];
		
		
	}
	}
	
}

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

session.prototype.encrypt = function(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
session.prototype.decrypt = function(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

module.exports = session;






