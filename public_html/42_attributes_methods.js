/*
1) getAttribute() -> this method are used to get the attribute value of html Element;

Example- here i want to get the value of name attribute from the id of get-attribute.


let getId=document.getElementById('get-attribute');

let value=getId.getAttribute('name')

console.log(value);  //String

console.log(typeof value);  //String


------------------------------------------------------------------------------------------------

2) hasAttribute() -> The hasAttribute() method in JavaScript is used to check whether a specified
attribute exists on an element. This method is particularly useful when you want to determine if
an element has a specific attribute before you perform some action with its value. It returns true
if the attribute exists, and false otherwise.

*/

//Example 1-> 

/*

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hasAttribute Example</title>
</head>
<body>
    <input id="input1" type="text" value="Hello, World!">
    <input id="input2" type="text" name="username">

    <script>
        const input1 = document.getElementById('input1');
        const input2 = document.getElementById('input2');

        if (input1.hasAttribute('value')) {
            console.log('input1 has a "value" attribute.');
        } else {
            console.log('input1 does not have a "value" attribute.');
        }

        if (input2.hasAttribute('value')) {
            console.log('input2 has a "value" attribute.');
        } else {
            console.log('input2 does not have a "value" attribute.');
        }

        // Checking for the 'name' attribute
        if (input2.hasAttribute('name')) {
            console.log('input2 has a "name" attribute.');
        } else {
            console.log('input2 does not have a "name" attribute.');
        }
    </script>
</body>
</html>

-----------------------------------------------------------------------------

Example 2 -> 

let getId=document.getElementById('get-attribute');

let name=getId.hasAttribute('name');
let classname =getId.hasAttribute('class');
let style=getId.hasAttribute('style');


console.log(name);  
console.log(style);
console.log(style);


--------------------------------------------------------------------------------------

3) JavaScript setAttribute() -> 

The setAttribute() method is used to set or add an attribute to a particular element and provides
a value to it. If the attribute already exists, it only set or changes the value of the attribute.
So, we can also use the setAttribute() method to update the existing attribute's value. 

If the corresponding attribute does not exist, it will create a new attribute with the specified
name and value. This method does not return any value. The attribute name automatically converts
into lowercase when we use it on an HTML element.

Although we can add the style attribute using the setAttribute() method,
but it is recommended not to use this method for styling. For adding styles,
we can use the properties of the style object that will effectively change the style.
It can be clear with the following code.

** Incorrect way

It is recommended not to use it to change the style.

element.setAttribute("style", "background-color: blue;"); 

**** Correct way

The correct way to change the style is given below.

element.setAttribute.backgroundColor = "blue";  

Example -> 

<html>  
<head>  
<title> JavaScript setAttribute() method </title>  
<script>  
function fun() {  
document.getElementById("link").setAttribute("href", "https://www.javatpoint.com/");  
}  
</script>  
</head>  
  
<body style = "text-align: center;">  
<h2> It is an example of adding an attribute using the setAttribute() method. </h2>  
<a id = "link"> javaTpoint.com </a>  
<p> Click the follwing button to see the effect. </p>  
<button onclick = "fun()"> Add attribute </button>  
</body>  
</html>  




------------------------------------------------------------------------------------

How to define two classes with in class properties.

here i define two class name -> class1 val

Ex- 

<input id ="get-attribute" value="Submit" type="submit" name="Lalit" class="class1 val"/>


let a =document.getElementById('get-attribute');

console.log(a.getAttribute('class'));

let b =document.getElementsByClassName('val');

console.log(a.getAttribute('class'));

console.log(b[0].style.background='red');



----------------------------------------------------------------------------
4) removeAttribute()-> 

The removeAttribute() method in JavaScript is used to remove an attribute from an HTML element.
If the attribute exists on the element, it will be removed; if the attribute does not exist,
the method does nothing. This is particularly useful for dynamically altering the behavior or
presentation of elements based on certain conditions or interactions in your web applications.


Example-> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Remove Attribute Example</title>
</head>
<body>
    <button id="myButton" onclick="alert('Button clicked!');" disabled>Click me!</button>
    <button onclick="enableButton()">Enable Button</button>

    <script>
        function enableButton() {
            const button = document.getElementById('myButton');
            // Remove the 'disabled' attribute to enable the button
            button.removeAttribute('disabled');
        }
    </script>
</body>
</html>


-------------------------------------------------------------------------
5) attributes properties are used to get all attributes of the html element.

In JavaScript, the attributes property of a DOM element provides a way to access all the
attributes of that element as a NamedNodeMap. This map is a collection of nodes where each node 
corresponds to one attribute of the DOM element. Each node in this collection includes information 
such as the attribute's name and value.

Ex- 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Attributes Property Example</title>
</head>
<body>
    <div id="info" class="container" data-info="1234" style="color: red;">Hello, world!</div>
    <script>
        // Access the div element
        const div = document.getElementById('info');

        // Accessing all attributes using the `attributes` property
        console.log('Attributes of the div:');
        for (let i = 0; i < div.attributes.length; i++) {
            const attr = div.attributes[i];
            console.log(`${attr.name}: ${attr.value}`);
        }

        // Example of modifying an attribute and seeing the change in the attributes collection
        div.setAttribute('data-info', '4321'); // Modifying an existing attribute

        // Adding a new attribute
        div.setAttribute('data-new', 'new value');

        // Output updated attributes
        console.log('Updated attributes of the div:');
        for (let i = 0; i < div.attributes.length; i++) {
            const attr = div.attributes[i];
            console.log(`${attr.name}: ${attr.value}`);
        }
    </script>
</body>
</html>

Example 2 -> 

let a =document.getElementById('get-attribute');

console.log(a.attributes);


---------------------------------------------------------------------------------------

6) How to create custom attributes?

if you want to create custom attributes then you can use data-attributeName syntax for
creating custom attributes and these all custom attributes are available in dataset attributes.

syntax -> data-attributeName

Examle -> 

<input id ="get-attribute" data-game="PubG" data-info="two player are allowed"/>


*/


let a =document.getElementById('get-attribute');

console.log(a.dataset);  // output DOMStringMap {game: 'PubG', info: 'two player are allowed'}

// also you can get a specific attribute value

console.log(a.dataset.game) // i get PubG

