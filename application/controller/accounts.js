var simple = require('simple');
var accounts = new simple.simplecontroler();
var paypal = require('paypal-rest-sdk');
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
	this.req.session.refresh();
	var v = this.loadview('accountslanding',{title:"Account categories"}, this.res);
}

accounts.checkout = function()
{
	this.loadview('checkout');
}

accounts.configurepaypal = function()
{
	paypal.configure({
  'mode': 'sandbox', //sandbox or live this will come from config
  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
     });
}

accounts.paypalcreatecard = function()
{
	
	
	 
	 
	 var card_data = {
  "type": "visa",
  "number": "4417119669820331",
  "expire_month": "11",
  "expire_year": "2018",
  "cvv2": "123",
  "first_name": "Joe",
  "last_name": "Shopper"
   };

}

accounts.paypalcardpayment = function()
{
	var reqobj = this.req.postdata;
	var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "credit_card",
        "funding_instruments": [{
            "credit_card": {
                "type": reqobj.cardtype,
                "number": reqobj.ccnumber,
                "expire_month": reqobj.expmonth,
                "expire_year": reqobj.expyear,
                "cvv2": reqobj.ccv,
                "first_name": reqobj.firstname,
                "last_name": reqobj.lastname,
                "billing_address": {
                    "line1": reqobj.addrline1,
                    "city": reqobj.city,
                    "state": reqobj.state,
                    "postal_code": reqobj.postal,
                    "country_code": reqobj.country
                }
            }
        }]
    },
    "transactions": [{
        "amount": {
            "total": reqobj.transaction.total,
            "currency": "USD",
            "details": {
                "subtotal": reqobj.subtotal,
                "tax": reqobj.tax,
                "shipping": reqobj.shipping,
            }
        },
        "description": reqobj.transactiondesc
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});
}

module.exports = accounts;