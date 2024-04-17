/*
<!DOCTYPE html>
<html>
    <head>
        <title>This is Lalit</title>
    </head>
    <body>
        <div>
            <h1>Brother</h1>
            <h2>Sister</h2>
        </div>
    </body>
</html>

1)Child Node -> head and body are the child node of the html tag.
2)Descendant Node -> div,h1 and h2 are the descendant node of the html.

console.log(document.body.firstChild);  // it give first child of body
console.log(document.body.lastChild);  // it give last child of body
console.log(document.body.childNodes);  // it give all children of body tag in form of node list 

 
let arr=Array.from(document.body.childNodes);
console.log(arr);

Note:- If you want to convert a node list into a array then use Array.from();



*/