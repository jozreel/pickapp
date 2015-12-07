var common = function(){}

common.prototype.getheaderdetails = function(obj)
{
	
	obj.req.session.start();
	if(obj.req.session.get('login')=== 'true')
	{
		
		obj.viewholder.user = obj.req.session.get('username');
		obj.viewholder.useraction='<a class="plainlink" href ="/user/logout">Logout</a>';
	}
	else{
	obj.viewholder.user="Guest"
	obj.viewholder.useraction='<a class="plainlink" href ="/user/login">Login</a>';
	}
	
}
module.exports= new common();

