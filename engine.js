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
var ShapeAttributes=Shape.extend({});
var Square=Shape.extend({
 create:function(){
    Element=document.createElement("DIV");
    Element.className="elementToCling";
    Element.ondblclick= function(ev){ev = ev || window.event; new elmMouseEvents()._mouseDblClick(ev); };
    Element.onmousedown=function(ev){ev = ev || window.event; new elmMouseEvents()._mouseDown(ev);};
    document.body.appendChild(Element); 
 }
});




var mouseEvent=Class.extend({
    getMouseOffset:function(target, ev){
	var docPos    = this.getElmPosition(target);
	var mousePos  = this.mouseCoords(ev);
        
        document.getElementById("eXPosition").value=docPos.x;
        document.getElementById("effYPosition").value=docPos.y;
        
        //MouseOffset.x=mousePos.x - docPos.x;
        //MouseOffset.y=mousePos.y - docPos.y;
        MouseOffset={x:mousePos.x - docPos.x,y:mousePos.y - docPos.y};
        
	//MouseOffset= {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};

        
    } ,
     mouseCoords: function(ev){
        if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
    },
    getElmPosition:function(e){
           var left = 0;
           var top  = 0;
           while (e.offsetParent){
                   left += e.offsetLeft;
                   top  += e.offsetTop;
                   e     = e.offsetParent;
           }
           left += e.offsetLeft;
           top  += e.offsetTop;
           return {x:left, y:top};   
    }
});
var docMouseEvent=mouseEvent.extend({
    mouseMove: function(ev){
	var mousePos = this.mouseCoords(ev);
        
        document.getElementById("MouseXPosition").value=mousePos.x;
        document.getElementById("MouseYPosition").value=mousePos.y;

        if(Element!==null && Element!==undefined){
          Element.style.position = 'absolute';
          Element.style.top      = mousePos.y+"px";
          Element.style.left     = mousePos.x+"px";
          //document.getElementById("offXPosition").value=this.MouseOffset.x;
          //document.getElementById("offYPosition").value=this.MouseOffset.y;  
         }
    },
    mouseUp: function(ev){
        Element=null;
        MouseOffset= {x:0, y:0};
    } 
});
var elmMouseEvents=mouseEvent.extend({
    _mouseDblClick: function(ev){
        var target   = ev.target || ev.srcElement;
        var TextElement=document.createElement("textarea");
        target.appendChild(TextElement);
    },
    _mouseDown:function(ev){
        Element=ev.target || ev.srcElement;
        var mouseOffset   = this.getMouseOffset(Element, ev);
        
    }
});



document.onmousemove= function(ev){ev = ev || window.event; new docMouseEvent().mouseMove(ev);};
document.onmouseup= function(ev){ev = ev || window.event; new docMouseEvent().mouseUp(ev);};

