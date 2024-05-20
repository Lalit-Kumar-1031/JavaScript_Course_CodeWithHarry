/*

console.log() vs console.dir()

1) log() -> it show the element in dom tree format
2) dir() ->  it show the element in object format and give its properties.

----------------------------------------------------------------------------------

Tagname/nodeName  ->

tagName -> tagName only exist for element node
nodeName -> nodeName exist for every node including text and comment node




console.dir(document.body.firstChild.tagName);  // it give undefine because text node not a element node
console.dir(document.body.firstElementChild.tagName); // it give div because div is a element node

console.dir(document.body.firstChild.nodeName);  // it give text 
console.dir(document.body.firstElementChild.nodeName); // it give div 

---------------------------------------------------------------------------------------------


//1) .innerHTML property -> .innerHTML property are used for geting the whole content of selected 
html element if that element contains html tag then it give these tag also;

innerHTML property are used for get and set the content of selected html element by selectors.


let table=document.getElementsByTagName('table');

console.log(table[0].innerHTML); // getting the whole HTML inside the table tag

table[0].innerHTML='<tr>Lalit<tr>'; // setting the HTML inside the table tag

console.log(table[0].innerHTML);


Note -> innerHTML property are work only for element Node;

2) outerHTML work same as innerHTML but innerHTML give the HTML of selected element but outerHTML 
give the innerHTML + itelf selected element



let table=document.getElementsByTagName('table');

console.log(table[0].outerHTML); // getting the whole HTML with selected elemnt

table[0].outerHTML='<table></table>'; // setting the HTML with selected elemnt

console.log(table[0].outerHTML);


// # how to get content of text and comment node

1) .data property
2) .nodeValue



console.log(document.body.firstChild.data);
console.log(document.body.firstChild.nodeValue);

textContent property -> this property are used to get the whole text of the web page


hidden property -> hidden property are used to hide or show the html element and you can get
 and set the hidden property true or false

*/

console.log(document.body.hidden); // get the hidden property value
console.log(document.body.hidden=true); // set the hidden proprty value


// you can hide any html element with this property;

// 1) firstly select that html element then set hidden=true ust like body







