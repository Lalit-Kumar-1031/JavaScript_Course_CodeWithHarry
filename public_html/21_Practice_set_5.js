//Q.1  

/*
let arr=[10,21,34];

let num=prompt("Enter number :");
num=Number.parseInt(num);

arr.push(num);
document.write(arr);


Q.2


let arr=[10,21,34];

let num;
do 
{
    num =prompt("Enter no :");
    num=Number.parseInt(num);
    arr.push(num);

} while(num!=0);


document.write(arr); 

Q.3 


let arr =[1,20,23,12,40,10];

let newArr=arr.filter((value,index)=>{
    return value%10==0;
});

document.write(newArr);

Q.4

*/


let arr =[1,20,23,12,10,10];

let newArr =arr.map((val,index)=>{
    return val*val;
});

document.write(newArr);

