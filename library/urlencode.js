var urlencode = function(req, res)
{
	this.req= req;
	this.res= res;
}


urlencode.prototype.checkandencode =function(str)
{
  var retstr="";
  var regx = new RegExp(/%\d[\dA-F]/g);
		if(regx.test(str))
		{
		  
     retstr= str;
        //widget.innerHtm = obj.htm;
			//console.log('hi');
		}
    else
    {
      retstr =encodeURI(str);
    }
    return retstr;
}
urlencode.prototype.checkandecode =function(str)
{
  var retstr="";
  var regx = new RegExp(/%\d[\dA-F]/g);
		if(regx.test(str))
		{
		  retstr= decodeURI(str);
     //retstr= str;
        //widget.innerHtm = obj.htm;
			//console.log('hi');
		}
    else
    {
      retstr =str;
    }
    return retstr;
}

urlencode.prototype.addspecial=function(str)
{
  
  // console.log('inin');
   var st =str.replace(/&amp;/g, '&')
            .replace(/&quot;/g,'"')
            .replace(/&#39;/g, '\'')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/lt;/g, '<')
            .replace(/gt;/g, '>');
    // console.log(st);
     return st;
}

module.exports = urlencode;