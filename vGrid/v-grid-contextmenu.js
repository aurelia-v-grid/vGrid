/*
/!**
 * Created by vegar on 3/23/2016.
 *!/
 * just playing around with menu I want to add, just need to figure out how that works
 *
var contextmenu = document.getElementById("supergrid");
contextmenu.addEventListener("contextmenu",function(e){
  event.preventDefault();
  var menu = document.createElement("DIV");
  menu.classList.add("simpleGrid-menu")
  var ul = document.createElement("UL");
  var li = document.createElement("LI");
  li.innerHTML = '<a href="#"><li>Menu 1</li></a>';
  ul.appendChild(li);
  var li = document.createElement("LI");
  li.innerHTML = '<a href="#"><li>Menu 1</li></a>';
  ul.appendChild(li);
  var li = document.createElement("LI");
  li.innerHTML = '<a href="#"><li>Menu 1</li></a>';
  ul.appendChild(li);
  menu.appendChild(ul);
  var body = document.getElementsByTagName("BODY")[0]
  body.appendChild(menu);


  //get x and y values of the click event
  var pageX = e.pageX;
  var pageY = e.pageY;

  //position menu div near mouse cliked area
  menu.style.top= pageY + "px";
  menu.style.left=pageX + "px";

  var mwidth = 200;
  var mheight = 200;
  var screenWidth = window.screenX;
  var screenHeight = window.screenY;

  //if window is scrolled
  var scrTop = window.scrollTop;

  //if the menu is close to right edge of the window
  if(pageX+mwidth > -screenWidth){
    menu.style.left=pageX-mwidth;
  }

  //if the menu is close to bottom edge of the window
  if(pageY+mheight > screenHeight+scrTop){
    menu.style.top =pageY-mheight;
  }

  //finally show the menu
  menu.style.display="block"

  body.addEventListener("click",function(e){
    menu.remove();


  });



},false);*/
