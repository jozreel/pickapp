
function xhrObject(){
	this.xhrObject = "undifined";
	 this.init = function()
	 {
		 
		 if(typeof XMLHttpRquest != 'undifined')
			 {
			  
			   return new XMLHttpRequest();
			 }
		 else if(window.ActiveXObject)
			 {
			   var versions =  ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0'];
			   for(var i= 0; i < versions.length; i++)
				   {
				     try
				     {
				    	 var xhr = new ActiveXObject(versions[i]);
				    	 return xhr;
				     }
				     catch(xhrError)
				   {
				    	 //follow through;
				   }
				   
				   }
				      
			}
		 throw new Error('XMLHTTP object not created please try again');
			 
		}
	 
	  this.createXHR = function()
	  {
		  this.xhrObject = this.init();
	  }
	  
	  this.ajaxGet = function(url, callback,data, error)
	  {
		  
		  var newUrl = "";
		  if(typeof data == 'object'&& typeof data != 'undefined')
			  {
			 
			   newUrl =  url+ "?"+this.serializeObjectUrl(data);
			  }
		  else newUrl = url;
		  this.xhrObject.open('get', newUrl, true);
		  this.readystateresponse(callback,error);
		  this.xhrObject.send(null);
	  }
	  
	  this.ajaxPost = function(url, callback,data,error)
	  {
		  
		  var newdata = "";
		  if(typeof data == "object" && typeof data !="undefined")
			 {
			   newdata = this.serializeObjectUrl(data);
			   
			 }
		  else if(typeof data == "string")
			  {
			  
			    newdata = this.serializeForm(data);
			    
			  }
		 
		  this.xhrObject.open("post", url, true);
		  this.xhrObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		  this.readystateresponse(callback,error);
		  this.xhrObject.send(newdata);
		 
		  
	  }
	  
	  this.readystateresponse = function(callback)
	  {
		  
		  var dataString = '';
		  xobj = this.xhrObject;
		  
		  this.xhrObject.onreadystatechange = function()
		  {
			 
			  if(xobj.readystate = 4)
				  {
				   if(xobj.status == 200 || xobj.status == 304)
					   {
					      var respData = xobj.getResponseHeader("Content-Type");
					      if(respData.toLowerCase() == "text/xml" || respData.toLowerCase() == "text/xml;charset=utf-8")
					    	  {
					    	  dataString = xobj.responseXML;
					    	  }
					      else if(respData.toLowerCase() =="text/plain"|| respData.toLowerCase() =="text/plain;charset=utf-8")
					    	  {
					    	  dataString = xobj.responseText;
					    	  }
					    
					   // call function in callback  passing the datastring as a parameter;
					      callback(dataString);
					   }
				   else
					   {
					      error = "internal error: " + xobj.responseText;
					      
					      //call callback function passing this to the error parameter;
					   }
				    
				  }
		  };
		  
		  
	  }
	  
	  this.serializeForm =  function(formid, obj)
	  {
		  
		 
		  var params = new Array();
		  var imgs = new Array();
		  var form =new Object();
		  if(typeof formid ==='string')
		     form= document.forms[formid];
	       else 
		   form = formid;
		   var children = form.childNodes;
		   //console.log(children);
		  
			  this.loopthrough(params,children);
			  if(obj == true)
			  {console.log('prms',params);
			   return JSON.stringify(this.deserializeUrl(params.join("&")));
			  }
			  else
			    return params.join("&");
			 	
		 //alert(params. join("&"));
		 
		  
	  }
	  
	  this.loopthrough = function(params, children)
	  {
		  
		  var elms =['fieldset','div','form'];
		  for(var child in children)
			  {
				 
			     
			     var newField =  children[child];
				
				 if(newField.tagName !== undefined)
				 {
				 if(elms.indexOf(newField.tagName.toLowerCase()) != -1)
				 {
					 
				     this.loopthrough(params,newField.childNodes);
					 
				 }
			    // console.log(newField.tagName)
			     switch(newField.tagName.toLowerCase())
			     {
			        case "button":
			        case "submit":
			        case "reset":
			        	break;
			        case "checkbox":
			        case "radio":
			        	if(!newField.checked)
			        		{
			        		
			        		break;
			        		}
							//alert(newField.checked);
							break;
			        case "input":
					    if(newField.name !==undefined && newField.name !=='')
						  params.push(this.urlEncodeField(newField.name,newField.value));
						  console.log(newField);
						break;
					case"paper-input":
					    if(newField.name !==undefined && newField.name !=='')
			           	 params.push(this.urlEncodeField(newField.name,newField.value));
						 console.log(newField.name);
			        	break;
			        case "select":
			        	params.push(this.urlEncodeField(newField.name, newField.options[newField.selectedIndex].value));
			        	break;
				    case "paper-radio-group":
					   params.push(this.urlEncodeField(newField.id, newField.getAttribute('selected')));
					  var gg= 'paper-radio-button[name="'+newField.getAttribute('selected')+'"]';
					  //console.log(newField.getAttribute('selected'));
					   params.push(this.urlEncodeField(newField.getAttribute('selected'), newField.querySelector(gg).textContent.trim()));
					   // console.log('rgp',newField.querySelector('paper-radio-button[name="'+newField.selected+'"]').textContent.trim());
					   break;
					   case "drop-down":
					      if(newField.name !== '' && newField.name && undefined && newField.name !== null)
					         params.push(this.urlEncodeField(newField.name, newField.value));
						 // console.log(newField.getAttribute('value'));
						// console.log(newField)
						  break;
					 case "file-select":
					       break;
			        default:
					     if(newField.name !==undefined && newField.name !==''&& newField.name !== null) params.push(this.urlEncodeField(newField.name, newField.value));
						 // console.log(newField.tagName)
					     break
				     
					   
			        	
			        
			        
			    	 
			     
				 
				 }
				 }
			  }
			  //console.log(params);
	  }
	
	  this.deserializeUrl = function(url)
	  {
		  var obj ={};
		  var arr =url.split('&');
		  for(var ob in arr)
		  { 
			  var spl = arr[ob].split('=');
			  //console.log(spl);
			  obj[spl[0]] = spl[1];
		  }
		  
		  return obj;
		  
	  }
	  this.serializeObjectUrl = function(url)
	  {
		  var params= new Array();
		  var keynames = Object.keys(url);
		  for(var i= 0; i<keynames.length;i++)
			  {
			    params.push(this.urlEncodeField(keynames[i], url[keynames[i]]));
			  }
		  //alert(params.join("&"));
		  return params.join("&");
	  }
	  
	  
	  this.urlEncodeField = function(sname, svalue)
	  {
		  var urlPart = encodeURIComponent(sname);
		  urlPart+="=";
		  urlPart += encodeURIComponent(svalue);
		  return urlPart;
	  }
	  
	 
		   
          
	}









//abjaxobject


function _abjax (){
		this._element= 'undefined';
		this.animate ='undefined';
		this.xhrobj = 'undefined';
		this.abmousedown = false;
		this.designelement ='undefined';
	    this._offset ='undefined';
	    this.style ='undefined';
		this.Style = function()
		{  
			//if(this.designelement == 'undefined')
			//   this.designelement = designclass; 
			////this.designelement.elementdesign= this._element;
		   // this.style= this.designelement;
			//return this.designelement;
			
		}
		
		this.setElement=function(element){
			if(typeof element === 'string')
			{
			    //this._element = document.getElementById(element);
				this._element = document.querySelector(element);
			}
			else this._element = element;
			//alert(this._element);
			 this.style = this.Style();
			return this;
		}
		this.anim = function(var1,var2,var3)
		{
			if(this.animate==='undefined')
				{ 
			      this.animate = new anim(this._element);
			      //alert(this.animate);
				}
			return this.animate;
		}
		
		this.xhr =function(){
			if(this.xhrobj ==='undefined')
				{
			    this.xhrobj = new xhrObject();
			    this.xhrobj.createXHR(); 
				}
			
			return this.xhrobj;
		}
		//add oatrameter to this function that accepts the function to be executed;
		this.readystate = function(callback)
		{//  alert('we ready to roll');
		  
			var  interval = setInterval(function(){
				if(document.readyState === "complete")
					{
				        console.log(document.readyState);
				         clearInterval(interval)
				         callback();
				         return true;
					}
				//else alert('no');
				          }, 10);
			        
			
		}
		this.serializeForm =function(obj)
		{
			
			 return this.xhr().serializeForm(this._element,obj);
			
		}
		//alert(document.body.clientWidth);
		//var el = document.getElementById('in');
		//el.oncontextmenu = RightMouseDown; 
		//el.onmousedown = doathing; // = showContextMenu;
		//el.onclick=doathing;


    this.allowDrop =function (ev) {
    ev.preventDefault();
     }

	this.drag =function(ev) {
	//alert("hi drag");
    ev.dataTransfer.setData("text", ev.target.id);
   // alert(ev.target.id)
     }

     this.drop=function(ev) {
    ev.preventDefault();
    
    var data = ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "newid"+Math.floor((Math.random()* 1000 )+ 1);
    //alert(nodeCopy.id);
    ev.target.appendChild(nodeCopy);
    this._element=nodeCopy;
    this.abdesignelement();
}


this.getElementUnderMouse =function(callback)
{ 
	//alert('yes');
	var elementId;
   this._element.onmousedown = function(e)
   {
	  // 
	   
	   e= e || window.event;
	   elementId = e.target ? e.target.id : e.srcElement.id;
	   elementId = document.getElementById(elementId);
	  // alert(elementId);
	   if(!elementId)
		   elementId=e.target ? e.target : e.srcElement;
	   //alert(elementId);
	  this._element = elementId;
	  if(callback)
	     this.callback();
   };

   
  
   //return elementId;
	//var el = document.getElementById(elem);
	//el.addEventListener("ondragstart", drag(event));
//	el.addEventListener("mousedown", function(){
		
		
			
//	});
	//var x = event.clientX, y = event.clientY;
	  // = document.elementFromPoint(x, y);
   }
   this.styleelementundermouse =function()
   {
	   curclass=this; 
	   this._element.onmousedown = function(e)
	   {
		  // 
		   
		   e= e || window.event;
		   elementId = e.target ? e.target.id : e.srcElement.id;
		   elementId = document.getElementById(elementId);
		  // alert(elementId);
		   if(!elementId)
			   elementId=e.target ? e.target : e.srcElement;
		   curclass._element = elementId;
		   //alert(elementId);
		   curclass.abdesignelement();
		   
		   
	   };
   }
   
   this.showContextMenu=function(ctx)
   {
   	
   	if(e.which==3)
   		{
   		  var el1= document.getElementById(ctx);
   		  
   		  el1.style.visibility='visible';
   		  el1.oncontextmenu = RightMouseDown;
   		  el1.style.zIndex='1';

   		}
   	//document.getElementByID('context')
   }
   this.RightMouseDown=function () { return false; },
   
   this.dragonclick=function()
   {
	   curclass=this; 
	   var elementId;
	   this._element.onmousedown = function(e)
	   {
		   e= e || window.event;
		   elementId = e.target ? e.target.id : e.srcElement.id;
		  // alert(elementId);
		   if(!elementId)
			   {
			   elementId=e.target ? e.target : e.srcElement;
			   newid= "newID"+DynIds.length;
			   DynIds.push(newid);
			   console.log(DynIds);
			   elementId.id = newid;
			   }
		   //alert(elementId);
		  // console.log(this);
		  curclass._element = elementId;
		  curclass.abmousedown =true;
		
	   curclass._element.addEventListener("dragstart", function(event)
	   {
		   //alert("hi");
		  
		   curclass.drag(event);
	   });
   };
   }
   
   this.alerthey=function(){alert("hey");},
   
   this.checkScreen=function()
   {
   	//alert(screen.width);
   	if(screen.width < 480)
   		{
   		    //alert
   		}
    	
   }



   this.checkDevice=function ()
   {

   		//alert(navigator.userAgent);
   		var useragent = navigator.userAgent.toLowerCase();
     
   	 if(useragent.search('ipad')){
   	   return 'ipad';
   	 }

   	 else  if(useragent.search('iphone')){
   	 return 'iphone';
   	 }


   	 else  if(useragent.search("android") !== -1){
             return 'android';
   	 }



   	 else  if(useragent.search('blackbery')){
   	  return 'blackberry';
   	 }
   	 else if(navigator.userAgent.match(/webOS/i)){
   	  //code for webOS here 
   	 }
   	 else{
   		 return 'desktop';
   	 }


   	
   }

   this.ismobile=function()
   {
      	if(checkDevice() !='desktop' && checkScreen() <1024)
      		return true;
      	else return false;
   }

  this.getselection=function()
  {
	  var text;
	 if(window.getSelection())
		 {
		   text = window.getSelection().toString();
		   
		 }
	 else
		 text = document.selection.createRange().text;
  }
  this.getselectionObject =function()
  {
	  if(window.getSelection())
		 {
		   return window.getSelection();
		   
		 }
	 else
		 return ocument.selection
  }
  
  this.bold=function(){this.executeCmd("bold");}
  this.italic= function(){this.executeCmd('italic');}
  this.underline= function(){this.executeCmd('underline');}
  this.strike= function(){this.executeCmd('strike');}
  this.getContent=function(){return this._element.innerHTML;}
  this.getValue=function(){return this._element.value;}
  this.Value=function(val){this._element.value = val;}
  
 this.click=function(callback)
  {
	
	 if(this._element != "undefined" || this._element != null)
	  this._element.onclick= function(){ callback();};
  }
  
  this.display=function(disp)
  {
	  this._element.style.display = disp;
  }
  
  this.move=function(callback)
  {
	  
	  if(this._element != "undefined" || this._element != null)
		  {
		  
		  this._element.onmousemove= function(e){ callback(e);};
		  }
  }
  this.leave = function(callback)
  {
	  if(this._element != "undefined" || this._element != null)
	  {
	  
	  this._element.onmouseleave= function(e){ callback(e);};
	  }
	  
  }
  this.transitionEnd = function(callback)
  {
	  if(this._element != "undefined" || this._element != null)	
	  {
		  
		  
		  this._element.addEventListener("webkitTransitionEnd", function(){callback();});
		  this._element.addEventListener("transitionend", function(){callback();});
		  }
  }
  this.offset =function()
  {
	 // console.log(this._element);
  	this._offset = {left : this._element.offsetLeft , top:this._element.offsetTop}
  	
  	
  	return this._offset;
  	}
 this.imageColor=function()
  {
	 //alert(canvas);
	  var canvas= this._element;
	 
	  var ctx = canvas.getContext('2d');
	  var hex="";
	  var rgb="";
	  var image2 = new image('images/colormap.gif', 'zabwicot color map', 334, 299,0, 0);
	 // console.log(image2);
	  var preview=true;
	 newImg =  image2.createElement();
	 image2.displayElement(ctx);
	  this.move(function(e){ 
		 var cvOffset =  _zabjax(canvas).offset();
		 var canvasX = Math.floor(e.pageX - cvOffset.left);
		 var canvasY = Math.floor(e.pageY - cvOffset.top);
		 var imgData = ctx.getImageData(canvasX, canvasY, 1,1);
		 var pxl = imgData.data;
		 var r = pxl[0].toString(16).length==1 ? pxl[0].toString(16)+pxl[0].toString(16):pxl[0].toString(16);
		 var g = pxl[1].toString(16).length==1 ? pxl[1].toString(16)+pxl[1].toString(16):pxl[1].toString(16);
		 var b = pxl[2].toString(16).length==1 ? pxl[2].toString(16)+pxl[2].toString(16):pxl[2].toString(16);
		// alert(cvOffset.top);
		 rgb = "rgb("+pxl[0]+","+pxl[1]+","+pxl[2]+")";
		 hex = "#"+r+""+g+""+b;
		 //console.log(hex);
		// color = hex;
		 //console.log(hex);
		 if(preview)
			 {
		 _zabjax('rnd').Style().backgroundcolor(rgb);
		 //document.getElementById("rnd").style.backgroundColor = rgb;
		 _zabjax('hex').Value(hex);
			 }
	  });
	  this.click(function()
			  {
		           _zabjax('sel').Style().backgroundcolor(rgb);
		           _zabjax('rnd').Style().backgroundcolor('#000000');
		           _zabjax('hex').Value(hex); 
		           preview = false;
			  });
	  this.leave(function(){preview = true;})
	  
  }
 this.executeCmd = function(cmd)
 {
	/* if(document.execCommand !='undefined')
		 {
		   document.execCommand(cmd);
		   
		 }
	 else
		 {*/
		   
		   var tag;
		   switch(cmd)
		   {
		   case 'bold':
			   tag = 'b';
			   break;
		   case 'italic':
		       tag = 'i';
			   break;
		   case 'underline':
		   		tag = 'u';
				   break;
		    case 'strike':
		   	    tag = 'strike';
				break;
			
		    default:
		    	tag = 'p';
		        break;
		   }
		   
		    var htm = document.createElement(tag);
		
			var parentEle=_zabjax().getselectionObject().anchorNode.parentElement;
		 //  console.log(parentEle);
	        var rng = _zabjax().getselectionObject().getRangeAt(0);
			var therange = rng.cloneContents();
			arr = therange.children;
			
			//if(therange.find(htm))
		    //console.log(therange.children);
	       
		  // x =  htm.innerHTML;
		  // y = document.createElement('p');
		   //y.innerHTML=x;
		  htm.appendChild(therange);
		  var z=htm.getElementsByTagName(tag);
		  var l = z.item(0);
		  var iner = htm.innerHTML.replace(vv, "");
		   if(l != null)
		   {
			   
			  var newtext = "";
			   for(var i=0; i<z.length; i++)
			  {
				 if(z[i].tagName.toLowerCase() == tag.toLowerCase())
				 {
					 var vv ="<"+tag+">";
					  var vv1 ="<"+tag+"/>";
					  
					 
					 newtext = iner.replace(vv, "");
					 newtext = newtext.replace(vv1, "");
					 
				 }
			  }
			  
			  var htm2 = document.createTextNode(newtext);
			  //document.removeChild(htm);
			   // console.log(htm2.innerHTML);
			   rng.deleteContents();
	           rng.insertNode(htm2);;
		     // htm.removeChild(therange);
			 // htm.appendChild(therange);
		      
		   }
		   else
		  {
			    
	       rng.deleteContents();
	       rng.insertNode(htm);
			  }		   
		  
		   
		   
		// }
 }
 
 this.disableFields=function(boolval,field)
	  {
		  var elms =['paper-radio-group','fieldset','div'];
          if(field !== undefined)
            var fm = field;
          else 
		    fm=this._element;
			if(fm !== undefined)
              fm.disabled = boolval;
          // console.log(fm);
           var arch = fm.childNodes;
         // console.log(arch.length);
          var i=1;
       for(var it in arch)
        {
     
        if(arch[it].tagName !== undefined)
        {
			
        if(elms.indexOf(arch[it].tagName.toLowerCase()) != -1)
        {
         // console.log(boolval);
         this.disableFields(boolval,arch[it])
        }
       
      arch[it].disabled=boolval;
        
      }
      }
 }
 
this.clearForm =function(bval)
{
	var elms =['paper-radio-group','fieldset','div'];
 // var frm = document.getElementById("form");
  if(!bval)
    this._element.reset();
  //enableedit(true);
  var arch = fm.childNodes;
  for(var it in arch)
        {
     
        if(arch[it].tagName !== undefined)
        {
			
        if(elms.indexOf(arch[it].tagName.toLowerCase()) != -1)
        {
         // console.log(boolval);
         this.clearform(true)
        }
       
      arch[it].reset();
        
      }
		}
  
//  document.querySelector('#unit').reset();
 // document.querySelector('#cat').reset();
}
 this.loadImage = function(isel, alt, callback)
	  {
		 
		  
		  
		  var reader = new FileReader();
		  
		  
		  var files = isel.rawfiles;
          var i=0;
          for(i=0; i<files.length; i++){
                var imageType = /image.*/;
 
                if (!files[i].type.match(imageType)) {
                  throw "File Type must be an image";
                    }
                    reader.readAsDataURL(files[i]);
              

              }
			  
			  var jsn =[];
	  
	 
		  var read = 0;
		  var obj={}
		  reader.onloadend = function(){
           //console.log(read);
             read++;
          var ig =encodeURI(reader.result);
    
            obj= {alt:alt, imagedata:encodeURI(ig)};
           jsn.push(obj);
		   
		   if(read === files.length)
		   {
			   
			  
			   if(jsn.length === 1)
			      callback(obj);
			   else
			      callback(jsn);
			   
			   
		   }
     //  params.push(this.urlEncodeField('image', jsn));
	   //callback
       
       };
	   
	   
    }
	
	
	
	this.disable = function(val)
	{
		if(this._element !==null)
		  this._element.disabled = val;
	}
		
}


function sajax(element)
{
	var zabjx = new _abjax();
	return zabjx.setElement(element);
}
