
/*
 1) insertAdjacentHTML() -> beforebegin -> it insert the html before begin of the selected element.

let first= document.getElementById('me1');


Here test div are inserted before begin of the me1 div (Selected element)

first.insertAdjacentHTML('beforebegin','<div class="test"> Before Begin</div>');

--------------------------------------------------------------------------------------------------------------


//  2) insertAdjacentHTML() -> beforeend -> it insert the html before end of the selected element.

let first= document.getElementById('me1');


//Here test div are inserted before end of the me1 div (Selected element)

first.insertAdjacentHTML('beforeend','<div class="test"> Before End</div>');


---------------------------------------------------------------------------------------------------------------------------------------


//  3) insertAdjacentHTML() -> afterbegin -> it insert the html after begin of the selected element.

let first= document.getElementById('me1');


//Here test div are inserted after begin of the me1 div (Selected element) or it inserted at first  child position of the selected element

first.insertAdjacentHTML('afterbegin','<div class="test"> After Begin</div>');


------------------------------------------------------------------------------------------------------------------------------------


//  4) insertAdjacentHTML() -> afterend -> it insert the html after end of the selected element.

let first= document.getElementById('me1');


//Here test div are inserted after end of the me1 div (Selected element)

first.insertAdjacentHTML('afterend','<div class="test"> After End </div>');

--------------------------------------------------------------------------------------------------
*/
// 5) remove() method -> are used to remove the html Element;

let first= document.getElementById('me1');

first.remove();