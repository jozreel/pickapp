var simple = require('simple');
var home = new simple.simplecontroler();

home.index = function()
{
	this.req.session.start();
	if(this.req.session.get('login')=== 'true')
	{
		
		this.viewholder.user = this.req.session.get('username');
		this.viewholder.useraction='<a class="plainlink" href ="/user/logout">Logout</a>';
	}
	else{this.viewholder.user="Guest"
	this.req.session.set('user','guest');
	this.req.session.expmins=20;
	this.req.session.set('cart', '[]');
    if(!this.req.session.isset)
	   this.req.session.create();
	this.viewholder.useraction='<a class="plainlink" href ="/user/login">Login</a>';
	}
	
	//this.loadviewpart('header');
	//this.loadviewpart('footer');
	//this.showviews({dyn:'', title:"lang patat"}, this.res);
	this.loadview('home');
}

module.exports = home;