var simple = require('simple');
var html= new simple.simplecontroler();

html.add= function()
{
	//console.log(this.req.postdata);
	var mod = this.load.model('html');
	mod.addpage(this.req.postdata, function(r){html.jsonResp(r);});
	
}
html.index= function()
{
	this.loadview('fend', {title:'Modify pages'}, this.res)
}
html.widgets = function()
{
	this.loadview('widget', {title:'Modify pages'}, this.res)
}

html.findwidgets = function()
{
	var mymod = this.loadmodel('widget');
		
    mymod.getAll(function(doc){
		//console.log(decodeURI(doc[1].innerHtm));
		html.jsonResp(doc);
		
		});
}

html.findtemplates = function()
{
	var mymod = this.loadmodel('template');
		
    mymod.getAll(function(doc){
		//console.log(decodeURI(doc[1].innerHtm));
		html.jsonResp(doc);
		
		});
}

html.findimages = function()
{
	var mymod = this.loadmodel('image');
    console.log('lp');
    mymod.getall(function(doc){
		//console.log(decodeURI(doc[1].innerHtm));
		html.jsonResp(doc);
		
		});
}


html.addwidget = function()
{
	//console.log(this.req.postdata, 'data');
	var mod = this.load.model('widget');
	if(this.req.postdata == undefined)
	   html.jsonResp({sucess:false,error:"no item added"})
	mod.addwidget(this.req.postdata,function(doc){
		html.jsonResp(doc);
	});
}

html.templates = function()
{
	this.loadview('template', {title:'Templte Administration'}, this.res)
}

html.images = function()
{
	this.loadview('image', {title:'Image'}, this.res)
}

html.addtemplate = function()
{
	var mod = this.load.model('template');
	console.log(this.req.postdata.tarray);
	mod.addtemplate(this.req.postdata,function(doc){
		html.jsonResp(doc);
	})
}

html.addimage = function()
{
	console.log('jojo');
	var mod = this.load.model('image');
	mod.addimage(this.req.postdata,function(doc){
		html.jsonResp(doc);
	})
}
html.templatetofile=function()
{
	var ht = this;
	var pt= require('simple').config.viewpath
	//var ind = pt.lastIndexOf("/");
	//var v = pt.substring(0, ind);
	console.log(this.req.postdata);
    require("fs").writeFile(pt+decodeURI(this.req.postdata.filename),decodeURI(this.req.postdata.filedata), function(err) {
     if(err)
	 {
	   this.res.end('{success:false,error:'+err+'}');
       console.log(err);
	 }
	   
	 ht.addtemplate();
	 
	   //console.log(ht.req.postdata.tarray);
	 });
      
}

module.exports = html;