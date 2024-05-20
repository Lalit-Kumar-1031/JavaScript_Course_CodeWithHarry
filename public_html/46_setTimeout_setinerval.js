/*

1) setTimeout(function,delay,argu1,argu2,--) -> this method are used to run a specific code or function after the given time periods;

Example -> 1

setTimeout(function () {
    alert("Hello ,setTimeOut");
}, 2000);



//Example -> 2

let timerId = setTimeout(function () {
    alert("Hello ,I am inside the setTimeOut");
}, 6000);


let answer=prompt("Do want to cantinue?");

if(answer=='n'){
    clearTimeout(timerId);
}

//Example -> 3



sum=(n1,n2,n3)=>{
    console.log("Sum of these number : "+ (n1+n2+n3));
    return n1+n2+n3;
}

setTimeout(sum,3000,12,11,10);


//-----------------------------------------------------------------------------------------------

2) setInterval(function,gap,ar1,ar2--) ->  

setTimeOut and setinterval is similar in syntax but the basic differance in these two methods is setTimeout are run only 
once after given period of time but setIntervalare running  again and again afer given time period.



sum=(n1,n2,n3)=>{
    console.log("Sum of these number : "+ (n1+n2+n3));
    return n1+n2+n3;
}

setInterval(sum,3000,12,11,10);

 clearTimeout(timerId) -> iska use setTimeOut ka execution clear krne ke liye kiya jata hai
 clearInterval(timerid) -> iska use setInterval ka execution clear krne ke liye kiya jata hai


*/
clearInterval(timerid)

