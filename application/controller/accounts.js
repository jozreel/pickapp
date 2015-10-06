var simple = require('simple');
var accounts = new simple.simplecontroler();
accounts.add = function()
{
	var v = this.loadview('accounts',{title:"Accounts"}, this.res);
}

accounts.passdata = function()
{
	console.log('popo');
	var mod = this.loadmodel('account');
	mod.add(this.req.postdata, function(r){
	  accounts.jsonResp(r);
	});
}

accounts.master = function()
{
	var v = this.loadview('master',{title:"Master Accounts"}, this.res);
}

accounts.category = function()
{
	var v = this.loadview('category',{title:"Account categories"}, this.res);
}

accounts.addcategory = function()
{
	
	var mod = this.loadmodel('accountcategory');
	mod.add(this.req.postdata, function(r){
		 accounts.res.writeHead(200, {'Content-Type':'text/json'});
	   var jsn = JSON.stringify(r);
	  // console.log(jsn);
	   accounts.res.end(jsn);
	});
}

accounts.categories = function() {
	
	var mod = this.loadmodel('accountcategory');
	mod.findcat(function(arr){
		accounts.jsonResp(arr);
	},true)
}
accounts.masteraccounts = function()
{
	
	var mod = this.loadmodel('account');
	mod.findmaster(function(arr){
		//console.log(arr);
		accounts.jsonResp(arr);
	},true)
}

accounts.accounts = function()
{
	
	var mod = this.loadmodel('account');
	mod.findaccount(function(arr){
		//console.log(arr);
		accounts.jsonResp(arr);
	},true)
}
accounts.index = function()
{
	var v = this.loadview('accountslanding',{title:"Account categories"}, this.res);
}


module.exports = accounts;