
var redirect = function(req, res)
{

	this.res = res;
	
}
redirect.prototype.redirect =function(locate)
{
	this.res.writeHead(302, {'Location': locat});
    this.res.end();
}
module.exports = redirect;