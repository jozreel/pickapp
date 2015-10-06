var Simple = require('simplemodel');
var coa= new Simple();
coa.modelname = 'coa';

coa.create = function()
{
	this.accounts = [];
}

coa.addAccount = function(name, description, category, master, accountno)
{   
   this.accountname= name;
   this.accountdescription = description;
   this.accountcategory= category;
   this.masteraccount = master;
   this.accountno = accountno;
   this.save(function(res) {
     console.log(res);
   }, 'A');
   
	
}

