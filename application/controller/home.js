var simple = require('simple');
var home = new simple.simplecontroler();

home.index = function()
{
	this.loadviewpart('header');
	this.loadviewpart('footer');
	this.showviews({dyn:'', title:"lang patat"}, this.res);
}

module.exports = home;