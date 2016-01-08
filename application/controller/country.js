var simple = require('simple');
var country = new simple.simplecontroler();
country.list = function()
{
	var fs = require('fs');
	var publicpath = require('simple').config.publicpath;
	fs.readFile(publicpath+'/static/countries.json', function(err,data)
	{
		if(err)
		{
			console.log(err);
		}
		var o = JSON.parse(data);
		country.res.writeHead(200,{'Content-Type': 'application/json'});
		country.res.end('{"a":"kkk"}');
	});
}
module.exports = country;