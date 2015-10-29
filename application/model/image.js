var simple = require('simple');
var image = new simple.simplemodel();
image.modelname = "image";
image.addimage = function(obj,callback)
{
	var im = this;
	this.insertcounters('imageid');
	//console.log(obj);
	this.generateNextSequence('imageid', function(next){
		
		var imagedata = obj.imagedata;
	    image.placeholder= '\{{imagemedia'+next+'\}}';
	    image.imageid = 'imagemedia'+next;
		image.alt=encodeURI(obj.alt);
		image.name=encodeURI(obj.name);
		image.filename=encodeURI(obj.filename);
		image.type=encodeURI(obj.filetype);
		 //image.keywords = obj.keywords.split(',');
		 //image.meta= encodeURI(obj.meta);
	    // image.save(callback,'A')
		image.gridsave(imagedata,callback)
	});
	
	
}
image.getallFromPipe = function(res)
{
   var img = this;
  this.findall(function(doc){
  console.log(doc);
  doc.forEach(function(element) {
  img.pipefromgrid(element.gridid,res);
  });
  },true);
}

image.getall = function(callback)
{
	var Buffer =require('buffer').Buffer;
	
	var img = this;
	
	//this.findall(callback,true);
	this.findall(function(doc){
		
		 var i=0;
		 var arr=[];
		doc.forEach(function(element) {
			var rp={};
			var buffarr =[];
			 i++;
			 var buff='';
			 //var bf= new Buffer('');
			var allimages = doc;
			img.streamfromgrid(element.gridid,function(doc,se,sc)
		    {
				//console.log(doc, 'll');
				if(doc !==null)
		          {
					  
					 //doc.copy(bf,bf.length);
					  buffarr.push(doc);
					// console.log(bf);
		          // console.log(doc.toString());
			      // console.log(doc);
		         //  buff +=doc.toString().trim();
				   //console.log(buff);
				  
		          }
				if(se)
		        {
					var bfct = Buffer.concat(buffarr);
					//console.log(bfct);
				   //console.log('final');
		           rp.imagedata = bfct.toString('base64');
		           rp.alt= element.alt;
				   rp.type =element.type
				   rp.placeholder = decodeURI(element.placeholder);
				   rp.imageid = decodeURI(element.imageid);
				   arr.push(rp);
				   //console.log(rp);
				   if(arr.length === allimages.length)
				      callback(arr);
		          // obj.res.end('');
		           }
		          
		
		//
		
		}, false);});
			//img.streamt(element.gridid);
			//img.streamfromgrid(element.gridid,);
		}, true);
}

module.exports = image;
