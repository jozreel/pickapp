//alert("hi");
var obj = Object.create(HTMLElement).prototype
//var ele = document.createElement('bo-ja');


//n.tagName='bo-ja';

var ele = document.createElement('bo-ja');
obj.tagName = "bo-ja";
ele.style.height = "100px";
ele.style.width = "100px";
ele.style.display = "block";
ele.style.backgroundColor = "red";
function bld()
{var dv = document.getElementById('tt');

var sel = window.getSelection();
var str = sel.toString();
var res = str.bold();
var rng = sel.getRangeAt(0);
console.log(rng);
//rng.deleteContents();
//var ele = document.createElement('span');
//ele.innerHTML = res;
//rng.toString().bold();
//var tn = document.createTextNode('');
//var ob = Object.create(HTMLElement).prototype;
//ob.innerHtml = res;
//tn.iinnerHtml = res;
//rng.insertNode(ele);
//dv.innerHTML = res;
}



//document.body.appendChild(ele);



