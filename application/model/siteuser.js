var simple = require('simple');
var siteuser = new simple.simplemodel();
siteuser.modelname = 'siteuser';

siteuser.sendtodb = function(obj,callback)
{
	var uo = this;
	
	  //this.insertcounters('userids');
	  this.generateNextSequence('userids', function(next){
	  uo.username = obj.username;
	  uo.userid = next;
	  uo.password = obj.password;
    uo.group="user";
	  uo.save(callback,'A');
	  //console.log(uo);
	  
	  });
	  
	
}
siteuser.finduser = function(obj,callback)
{
  var uname = obj.username;
  var passwd = obj.password;
  console.log(passwd);
  this.find({username:uname, password:passwd},{},{},true,callback)
}
module.exports = siteuser;
