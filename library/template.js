
var template = function(){}
template.prototype.loadtemplate = function(tid)
{   
	var cont = this;
	var mod =this.load.model('templates');
	var widgetobj={};
	
	mod.find({tempid:tid},null,false,function(doc){
		var i=0;
		for(var wid in doc.widgets)
		{
			i++;
			cont.loadwidget(doc.widgets[wid], i , doc.widgets.length,widgetobj);
		}
	});
	
}
template.prototype.loadwidget = function(wid, itt,count,wo)
{
   
	var cont = this;
	var mod =this.load.model('widget');
	 mod.find({widgetid:wid}, null, false, function(doc){
	var htm = doc.html;
	cont.loadmedia(doc.media,function(arr)
	{
		for(var ind in arr)
		{
		  wo.ind = arr[ind];	
		}
	    wo.wid = htm;
		if(itt===count)
		{
			console.log(wo); // i guess you could load the file here buut replace placeholders first
		}
		 
	   //tmparr.push
	});
	//parsetexthere
	});
	
}
template.prototype.loadmedia = function(media,callback){
	
	var cont = this;
	var i=0;
	for(var med in media)
	{
		i++;
		if(media[med] !== Object)
		{
			temparrmed[med]= media[med]
		}
		else if(media[med].type === 'image')
			{
				cont.findimage(media[med].imageid,i,media.length,callback);
			}
			else if(media[med].type === 'video')
			{
				cont.findvideo(media[med].videoid,i,media.length,callback);
			}
			else if(media[med].type === 'audio')
			{
				cont.findaudio(media[med].audioid,i,media.length,callback);
		
			}
			else
			{
				cont.findfile(media[med].fileid,i,media.length,callback);
			}
		}
	
}

template.prototype.findimage = function(image,count,total, callback)
{
	var cont=this;
	var mod =this.load.model('image');
	mod.find({imageid:image},null, false,function(doc)
	{
		cont.itterate(doc.imageid, doc.imagedata,count, total,callback);
	});
}
template.prototype.findvideo = function(video,count,total, callback)
{
	var cont=this;
	var mod =this.load.model('video');
	mod.find({videoid:video},null, false,function(doc)
	{
	   cont.itterate(doc.videoid,doc.videodata,count, total,callback);
	});
}

template.prototype.findaudio = function(audio,count,total, callback)
{
	var cont=this;
	var mod =this.load.model('audio');
	mod.find({audioid:audio},null, false,function(doc)
	{
		 cont.itterate(doc.audioid, doc.audioodata,count, total,callback);
	});
}
template.prototype.findfile = function(file, count,total, callback)
{
	var cont=this;
	var mod =this.load.model('audio');
	mod.find({fileid:file},null, false,function(doc)
	{
		cont.itterate(doc.fileid,doc.filedata,count, total,callback);
	});
}

template.prototype.itterate = function(id, data,count,total,callback)
{
	
	var temp= {};
	temp[id] = data;
	if(count === total)
	{
		callback(temp);
	}
}

function callback(tmparr)
{
	//var tmparr = {};
	tmparr[id] = data;
	
}