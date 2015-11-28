function disableForm(fid, boolval)
{
  var elms =['paper-radio-group','fieldset','div'];
  if(typeof fid ==='string')
     var fm = document.getElementById(fid);
  else fm=fid;
  fm.disabled = boolval;
 
  var arch = fm.childNodes;
 // console.log(arch);
 var i=1;
  for(var it in arch)
   {
     
     if(arch[it].tagName !== undefined)
     {
     if(elms.indexOf(arch[it].tagName.toLowerCase()) != -1)
        {
          
          disableForm(arch[it])
        }
      console.log(arch[it].tagName)
      arch[it].disabled=boolval;
        
   }
   }
}


function resp(str,elem)
{
   
   if(str.success===true)
       elem.innerHTML ='<p style="color:green;">Sucess item added</p>';
     else
       elem.innerHTML =str.error;
   elem.show();
   sajax('#form').clearForm();
}

function setEvent(ev)
{
  document.getElementById('ev').value=ev;
  disableForm('form', false);
}

function deleteobj(apaser)
{
  
    //apaser.jsonstring = jstring;
        apaser.rspelement  = document.getElementById("ptoast");
        
         apaser.respfunc=resp;
         apaser.submit=true;
        // console.log(apaser.jsonstring);
  //apaser.
}
 function toHTML(txt)
 {
  return txt.replace(/<([^<>]+\/?)>/g,'<br />&lt;$1&gt;<br />').
         replace(/<(\/[a-zA-Z]+(\-?[a-zA-Z]+)?)>/g,'<br />&lt;$1&gt;').
         replace(/"/g,'&quot;');
 }
 
 function rplacetags(str)
 {
   str.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
 }
 function removetags(str)
 {
   return str.replace(/(<[^<>]+>)/g,'')
 }
 
 
 function search(e,url)
   {
   
       e = e || window.event;
        if (e.keyCode == 13)
        {
          
           var val = encodeURI(document.querySelector('#search').value);
          
          
           var lst = document.getElementById('idd');
       
           
           
             lst.dataUrl =  url+val;
           
           
           
          
         //  return false;
        }
       // return true;
   }
  function displaySearch()
   {
     var search = document.getElementById("search");
     search.style.display = "inline-block";
   }
 
 
   function scrollHandler(element,functionCall)
   {
     
      element.onscroll =function(event){
     var scroller = event.target;
     
    if (scroller.clientHeight + scroller.scrollTop  === scroller.scrollHeight)
    {     //alert('lplpl')
          //element.scroller.style.overflow = "hidden";
          
          functionCall();
    }
           
     
    
   
    // console.log(document.documentElement.clientHeight);
    
    }
   }
 
 
 
 
 
 
 
 


