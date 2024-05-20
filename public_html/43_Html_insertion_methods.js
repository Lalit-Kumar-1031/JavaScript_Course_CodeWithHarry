/*

1) common sense method for inserting html into a dom ?

 let first=document.getElementById('me1');

 first.innerHTML=first.innerHTML + '<div>This is second me<div>';

this is the common sense method for insert html into html Element.

//----------------------------------------------------------------------------

 2) createElement() method -> How to insert html into dom?

step 1 - create a html element

let first=document.getElementById('me1');

let element=document.createElement('div');

 here i have created div element

 step 2 - put the value of this html element

element.innerHTML='<h2> This is H2 Heading </h2>';

here i put the h2 element into the created div element

step 3 - now append this div element into the selected html element 

first.appendChild(element);

now its done 

//Also append() or aappendChild() both are same.

Note :-  append() method are used to insert the html at end of the selected element(first)

//-----------------------------------------------------------------------------------------


// 2) prepend() method are used to insert the html at beginning of the selected element(first)

let first=document.getElementById('me1');

let element=document.createElement('div');


element.innerHTML='<h2> This is H2 Heading </h2>';

first.prepend(element);


//----------------------------------------------------------------------------



// 3) before() method are used to insert the html at before of the selected element(first)

let first=document.getElementById('me1');

let element=document.createElement('div');


element.innerHTML='<h2> This is H2 Heading </h2>';

first.before(element);


//------------------------------------------------------------------------------------------



// 4) after() method are used to insert the html at after of the selected element(first)

let first=document.getElementById('me1');

let element=document.createElement('div');


element.innerHTML='<h2> This is H2 Heading </h2>';

first.after(element);

//--------------------------------------------------------------------------------------------------
*/

// 5) replaceWith() method are used to replace the selected element with new created html element;

// Let take an example

// i want to replace div(first) with new created element that contains h2 tag;



let first=document.getElementById('me1');

let element=document.createElement('div');


element.innerHTML='<h2> This is H2 Heading </h2>';

first.replaceWith(element);