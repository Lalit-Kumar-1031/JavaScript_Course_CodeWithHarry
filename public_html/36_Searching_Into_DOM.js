

/* 
1) when you want to identify a html element uniquely then use getElementById for 
selecting that unique element.As we know id must be unique.

let home=document.getElementById('home');

home.style.color='red';
home.style.fontSize='32px';



Note :- if you are using css selector then keep in mind,

1) if css id selector -> # before id name


2) if css class selector -> . before class name


2) querySelectorAll -> return all elements that match the css selector value;

let items=document.querySelectorAll('.items');

console.log(items);
items[0].style.color='green';
items[1].style.color="pink";



let items=document.querySelectorAll('.items')[0];

// Efficient version of this method for selecting 1st Element;

3)  querySelector :-

let item=document.querySelector('.items');
items.style.color="gray";


Remember This :- 
in methods ko ap document ke alawa bhi use kar skte ho jaise agr apne koi
element select kiya h aur uske ander kafi element aur bhi hai to ap us parent element ke ander bhi
ye sare methods laga skte ho.

Example :-

1) I want to search only body 



let a=document.body.querySelectorAll('.items');

a[2].style.background="cyan";

2) i want to search only in tab id;


let b=document.body.querySelectorAll('#tab')[0].querySelector('.items');

b.style.background="violet";


with the help of these selector you can do nested selecting.


4) when you have 10 element and you want to apply same css on 8 element then you can use getElementsByClassName for 
selecting these 8 similar items.

Remember id always are unique but class can not be unique.

*/
let home=document.getElementsByClassName('items');

home[0].style.color='green';
home[0].style.fontSize='32px';


//5) in html , if you want to search the element with name property then you can use getElementsByName;


let  home1=document.getElementsByName('search');

home1[0].style.color='green';
home1[0].style.fontSize='92px';

Ex- <h1 name="search">Kumar </h1>

