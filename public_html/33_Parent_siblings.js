// console.log(document.body.firstChild.parentElement);
// console.log(document.body.firstChild.parentNode);

/*
Remember ---> parentElement must have an element node.ParentElement can not be an comment or text node.

also all Elements are node but all nodes are not element.

thats why parent node can be Element,text and comment node.


----------------------------------------------------------------

as we know document.documentElement give the html element if we try to get ParentNode of html element then 
it give document but if we will try to get ParentElement then it give null because html element have not
any valid parent element thats why he give null.

console.log(document.documentElement.parentNode);  // give document
console.log(document.documentElement.parentElement); // give null


---------------------------------------------------------------------




previousSibling -> this property are used to get previous element from the element tree.
nextSibling -> this property are used to get next element from the element tree.

for example -> head ka nextSibling body element hai and body ka previousSibling head Hai

console.log(document.body.previousSibling);  //
console.log(document.head.nextSibling)

*/