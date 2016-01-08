var Simple = require('simple');
var subscribe = new Simple.simplecontroler();
subscribe.index= function()
{
	this.loadview('subscribe');
}

module.exports = subscribe;