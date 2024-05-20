
let a=document.getElementsByTagName('li');

// Now it give a html collection 
console.log(a);
a[0].style.color="cyan";

//To convert html collection into array then use Array.from() 

let arr=Array.from(a);
console.log(arr);
console.log(typeof arr); // object

arr.forEach((element)=>{
    element.style.color="Blue";
})



