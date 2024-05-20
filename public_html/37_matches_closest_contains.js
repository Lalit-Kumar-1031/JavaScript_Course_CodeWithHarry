/*

1) matches() ->matches() function is used to check if an element matches a specific CSS selector;

Ex- 
<ul id="birds">
  <li>Orange-winged parrot</li>
  <li class="endangered">Philippine eagle</li>
  <li>Great white pelican</li>
</ul>


const birds = document.querySelectorAll("li");

for (const bird of birds) {
  if (bird.matches(".endangered")) {
    console.log(`The ${bird.textContent} is endangered!`);
  }
}


result - This will log "The Philippine eagle is endangered!" to the console, 
since the element has indeed a class attribute with value endangered.


-----------------------------------------------------------------------------------------
2) closest() Method ->

The closest() function in JavaScript is used to find the closest ancestor of an element
that matches a specified CSS selector. It starts with the current element and moves up 
the DOM tree until it finds a match or reaches the topmost ancestor (the <html> element).

Ex _ 

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Example</title>
<style>
    .container {
        border: 1px solid black;
        padding: 10px;
    }

    .highlight {
        background-color: yellow;
    }
</style>
</head>
<body>

<div class="container">
    <h2>Title</h2>
    <p>This is paragraph 1</p>
    <div>
        <p class="highlight">This is paragraph 2</p>
        <button>Click me</button>
    </div>
</div>

<script>
    // Select the button
    const button = document.querySelector('button');

    // Find the closest ancestor of the button that has the class "container"
    const container = button.closest('.container');

    // Add a border to the container
    container.style.border = '2px solid red';
</script>

</body>
</html>


In this example:

We have a <div> with the class "container" containing nested elements like <h2>, <p>, and another <div>.
Inside the nested <div>, there's a <p> element with the class "highlight" and a <button>.
We select the <button> element using querySelector('button').

Then, we use closest('.container') to find the closest ancestor of the button that has the class "container".
Once we find the container, we modify its CSS to give it a red border.

So, closest() is useful when you want to access an ancestor element based on its relationship to a 
descendant element, particularly when you don't know the exact structure of the DOM or how many levels
 deep the ancestor is.



 ----------------------------------------------------------------------------------------------------

 3) contains()

 In JavaScript, the contains() function is used to check if a parent element contains a specific
child element. It's like asking, "Do you contain this?" and it returns true or false.


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Example</title>
<style>
    .container {
        border: 1px solid black;
        padding: 10px;
    }

    .highlight {
        background-color: yellow;
    }
</style>
</head>
<body>

<div class="container">
    <h2>Title</h2>
    <p>This is paragraph 1</p>
    <div>
        <p class="highlight">This is paragraph 2</p>
        <button>Click me</button>
    </div>
</div>

<script>
    // Select the container
    const container = document.querySelector('.container');

    // Select the paragraph with class "highlight"
    const paragraph = document.querySelector('.highlight');

    // Check if the container contains the paragraph
    if (container.contains(paragraph)) {
        console.log('Container contains the highlighted paragraph!');
    } else {
        console.log('Container does not contain the highlighted paragraph.');
    }
</script>

</body>
</html>


In this example:

We have a <div> element with the class "container" containing nested elements like <h2>, <p>, and another <div>.
Inside the nested <div>, there's a <p> element with the class "highlight".
We select the .container and .highlight elements using querySelector().

Then, we use container.contains(paragraph) to check if the container element contains the paragraph 
element with the class "highlight".

If the container contains the paragraph, it logs "Container contains the highlighted paragraph!";
 otherwise, it logs "Container does not contain the highlighted paragraph."
So, contains() is useful for checking the presence of a specific child element within a parent element,
 which can be handy for conditional logic or dynamic manipulation of elements on a webpage
 
 */