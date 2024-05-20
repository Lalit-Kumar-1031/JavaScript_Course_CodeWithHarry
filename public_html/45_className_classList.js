/*

1) className -> 

In JavaScript, className and classList are properties used to get and set the class attribute of an element in 
the DOM (Document Object Model). They provide different ways to interact with the class names of HTML elements, 
offering flexibility depending on what you need to accomplish.

className -> 
Description: The className property of an HTML element is a string representing the class or classes assigned to the element.
 You can read it to get all classes of an element in one string, or you can set it to change the element's class or classes.

Usage:

Get classes: element.className returns a string containing all the classes separated by spaces.

Set classes:Assigning a string to element.className replaces all existing classes with the new class or classes specified in the string.

Example -> 

var element = document.getElementById("myElement");
console.log(element.className);  // Output might be "class1 class2"

// Setting a new class name
element.className = "class3 class4";    // Replaces existing classes with "class3" and "class4"
console.log(element.className);  // Output is now "class3" and "class4"




------------------------------------------------------------------------------------------------
2) classlist -> 


Description: The classList property is a more modern and powerful alternative to className. It returns a live DOMTokenList 
collection of the class attributes of the element, providing methods to add, remove, toggle, and check for classes.

Usage:
Add a class: element.classList.add("newClass") adds "newClass" to the element, if it doesn’t already have it.

Remove a class: element.classList.remove("existingClass") removes "existingClass" from the element.

Toggle a class: element.classList.toggle("classToToggle") adds the class if the element does not already have it,
and removes it if it does.

Check if a class exists: element.classList.contains("someClass") returns true if the class exists on the element, otherwise false.


Example -> 

var element = document.getElementById("myElement");

element.classList.add("newClass");          // Adds "newClass" to the element
element.classList.remove("oldClass");       // Removes "oldClass" from the element
element.classList.toggle("activeClass");    // Toggles "activeClass" on the element

if (element.classList.contains("activeClass")) {
  console.log("Element is active.");
}




*/