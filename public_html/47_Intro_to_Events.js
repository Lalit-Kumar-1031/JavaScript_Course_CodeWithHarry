/*
Browser Events -> basically browser events are a signal that indicate something happen in the browser that happening called event;

Type of events

1) Mouse events:

click -> onclick ->	When mouse click on an element
mouseover -> onmouseover ->	When the cursor of the mouse comes over the element
mouseout -> onmouseout	-> When the cursor of the mouse leaves an element
mousedown -> onmousedown	-> When the mouse button is pressed over the element
mouseup ->	onmouseup -> When the mouse button is released over the element
mousemove ->	onmousemove -> 	When the mouse movement takes place.

Example ->

<html>  
<head> Javascript Events </head>  
<body>  
<script language="Javascript" type="text/Javascript">  
    <!--  
    function clickevent()  
    {  
        document.write("This is JavaTpoint");  
    }  
    //-->  
</script>  
<form>  
<input type="button" onclick="clickevent()" value="Who's this?"/>  
</form>  
</body>  
</html>  


//------------------------------------------------------------------------------------------

2)Keyboard events:


Keydown & Keyup ->	onkeydown & onkeyup -> 	When the user press and then release the key


Example ->

<html>
<head> Javascript Events</head>
<body>
<h2> Enter something here</h2>
<input type="text" id="input1" onkeydown="keydownevent()"/>
<script>
<!--
    function keydownevent()
    {
        document.getElementById("input1");
        alert("Pressed a key");
    }
//-->
</script>
</body>
</html>

//----------------------------------------------------------------------------------------

3)Form events:

focus ->	onfocus	 -> When the user focuses on an element
submit ->	onsubmit -> When the user submits the form
blur ->	onblur ->	When the focus is away from a form element
change ->	onchange -> When the user modifies or changes the value of a form element



//-------------------------------------------------------------------------------------------

4)Window/Document events

load ->	onload	-> When the browser finishes the loading of the page
unload ->	onunload ->	When the visitor leaves the current webpage, the browser unloads it
resize	-> onresize	-> When the visitor resizes the window of the browser

Example -> 

<html>  
<head>Javascript Events</head>  
</br>  
<body onload="window.alert('Page successfully loaded');">  
<script>  
<!--  
document.write("The page is loaded successfully");  
//-->  
</script>  
</body>  
</html>  
 
*/

//New way to handle events

let div1 = document.getElementsByClassName('div1')[0];

div1.onclick = () => {
    let div2 = document.getElementsByClassName('div1')[0];

    div2.innerHTML = "<h1>This is the way of handle events <h1>";
}

// Remember -> agar apne html aur javascript dono me koi event laga rkha h to js wala event mana jayega;