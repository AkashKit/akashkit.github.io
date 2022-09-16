import React, {useState, useEffect, useRef} from "react";
import ReactDOM from "react-dom";

function Canvas() {
  const canvas = useRef();
  let offsetX;
  let offsetY;
  let scrollX;
  let scrollY;
  let mouseX;
  let mouseY;
  useEffect(() =>{
    offsetX = canvas.current.offsetLeft;
    offsetY = canvas.current.offsetTop;
    scrollX = canvas.current.scrollLeft;
    scrollY = canvas.current.scrollTop;
    draw();
  })
  let startX;
  let startY;
  let selectedText = -1;
  const [state, setState] = useState({
                                      texts: [{
                                                height: 40,
                                                text: "zczczc",
                                                width: 60.609375,
                                                x: 20,
                                                y: 20
                                              }],
                                    });

  var texts = state.texts;

  // clear the canvas & redraw all texts
  function draw() {
      const ctx = canvas.current.getContext("2d");  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < texts.length; i++) {
          var text = texts[i];
          ctx.fillText(text.text, text.x, text.y);
      }
    }

    function textHittest(x, y, textIndex) {
        var text = state.texts[textIndex];
        return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
    }
  
    function handleMouseDown(e) {
      e.preventDefault();
      
      startX = parseInt(e.clientX - offsetX);
      startY = parseInt(e.clientY - offsetY);
      // Put your mousedown stuff here
      console.log(texts.length);
      for (var i = 0; i <= texts.length; i++) {
        console.log(textHittest(startX, startY, i));
        if (textHittest(startX, startY, i)) {
          selectedText = i;
        }
      }
    }

  function handleMouseMove(e){
    console.log(selectedText);
    if (selectedText < 0) {
      return;
    }
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    var text = state.texts[selectedText];

    console.log(text);
    setState(prevState => {
      prevState.map(drag_text =>{
        if (drag_text == text) {
          return {
              ...drag_text,
              x: dx,
              y: dy
          }
        }
      })
        
    });
  };





  return (
    <main>
      <div>
        {state.x || state.y
          ? "The mouse is at x: " + state.x + ", y: " + state.y
          : "Move the mouse over this box"}
      </div>
      <canvas id="canvas" ref={canvas} width={300} height={300} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown}/>
    </main>
  );
}

export default Canvas;