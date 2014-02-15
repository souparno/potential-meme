(function(){
this.Class=function(){};
Class.extend=function(property){
  for(var name in property){
    this.prototype[name]=property[name];    
  }
  return this;
};
}());





var Shape=Class.extend({});
var Square=Shape.extend({
 create:function(){
    Element=document.createElement("DIV");
    Element.className="elementToCling";
    Element.ondblclick= function(ev){ev = ev || window.event; new ShapeMouseEvents().shape_mouseDblClick(ev); };
    Element.onmousedown=function(ev){ev = ev || window.event; new ShapeMouseEvents().shape_mouseDown(ev);};
    document.body.appendChild(Element); 
 }
});




var mouseEvent=Class.extend({
     mouseCoords: function(ev){
        if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
    }
});
var docMouseEvent=mouseEvent.extend({
    mouseMove: function(ev){
	var mousePos = this.mouseCoords(ev);
        document.getElementById("MouseXPosition").value=mousePos.x;
        document.getElementById("MouseYPosition").value=mousePos.y;
       if(Element!==null){
          Element.style.position = 'absolute';
          Element.style.top      = mousePos.y+"px";
          Element.style.left     = mousePos.x+"px";
        }
    },
    mouseUp: function(ev){
        Element=null;
    } 
});
var ShapeMouseEvents=mouseEvent.extend({
    shape_mouseDblClick: function(ev){
        var target   = ev.target || ev.srcElement;
        var TextElement=document.createElement("textarea");
        target.appendChild(TextElement);
    },
    shape_mouseDown:function(ev){
        Element=ev.target || ev.srcElement;
    }
});



document.onmousemove= function(ev){ev = ev || window.event; new docMouseEvent().mouseMove(ev);};
document.onmouseup= function(ev){ev = ev || window.event; new docMouseEvent().mouseUp(ev);};

