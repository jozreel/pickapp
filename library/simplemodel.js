
var mongo = require('./mongodriver');

var simplemodel = function(p) {
  this.modelname ='default';
}
simplemodel.prototype= new mongo();
simplemodel.prototype.constructor = simplemodel;

simplemodel.prototype.save = function(callback, event)
{
  var temp =this.prepare();
   //console.log(this);
   delete temp._id;
   //console.log(temp);
   if(event ==='A')
     this.insert(temp,callback);
   if(event ==='E')
    { 
     
      var objid = this.createObjectId(this._id)
      this.updateOne({_id:objid},temp, callback);
    }
  
}

simplemodel.prototype.checkecnoded =function(str)
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

simplemodel.prototype.prepare =function()
{
  var temp = {};
   var props = Object.getOwnPropertyNames(this);
	for(var x in props)
	 {
   //  console.log(typeof this[props[x]]);
		 if((typeof this[props[x]] === 'function') ||(props[x] ==='modelname'))
     { 
      continue
     }
       temp[props[x]] = this[props[x]];
	 }
   return temp;
}
simplemodel.prototype.deleteone = function(callback)
{
 // console.log(this);
  var objid = this.createObjectId(this._id);
  this.removeone({_id:objid},callback);
}

simplemodel.prototype.gridsave = function(fdata,callback)
{
   var temp =this.prepare();
   //console.log(this);
   //delete temp._id;
   //console.log(temp);
   
     this.savetogrid(fdata,temp,callback);
}







module.exports = simplemodel;

