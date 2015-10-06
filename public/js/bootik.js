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
}

function setEvent(ev)
{
  document.getElementById('ev').value=ev;
  disableForm('form', false);
}

function deleteobj(apaser)
{
  
    apaser.jsonstring = '{"_id":"'+document.getElementById('_id').value+'"}';
        apaser.rspelement  = document.getElementById("ptoast");
         
         apaser.respfunc=resp;
         apaser.submit=true;
  //apaser.
}


