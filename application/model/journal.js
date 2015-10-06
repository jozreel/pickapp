var simple = require('simple');
var journal = new simple.simplemodel();
journal.modelname = 'journal';


journal.addentry = function(obj, callback)
{
	this.date = obj.date;
	this.cr = obj.cr;
	this.dr=obj.dr;
	this.desc = obj.desc;
	if(obj.event ==="A")
	   this.save(callback,'A');
	
}
module.exports = journal;