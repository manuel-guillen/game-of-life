from_to = function (from, to, f) {
  			     if (from > to) return;
			       f(from); from_to(from+1, to, f);
		      }

getMousePosition = function(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return Point(evt.clientX - rect.left, evt.clientY - rect.top);
}
// =================================================

$(document).ready(function(e) {
  
  // =============== KEY VARIABLES =================
  const CELL_SIZE = 10;
  const GRAY = "#DDDDDD";
  const BLUE = "#386AFF";
  const WHITE = "#FFFFFF";

  var canvas = $("#canvas")[0];
  
  var width = canvas.width/CELL_SIZE;
  var height = canvas.height/CELL_SIZE;
  
  var context = canvas.getContext("2d");

  // ================ BOARD SETUP ==================

  var bm = LifeBoardManager(width, height);

  // ================ CANVAS SETUP =================
  context.strokeStyle = GRAY;

  drawBoard = function() {
    from_to(0, height-1, function(y) {
      from_to(0, width-1, function(x) {
        context.beginPath();
        context.rect(CELL_SIZE*x, CELL_SIZE*y, CELL_SIZE, CELL_SIZE);
        context.fillStyle = bm.getState(x,y) ? BLUE : WHITE;
        context.fill();
        context.stroke();
      });
    });  
  }
  drawBoard();

  // ============ MOUSE LISTENERS SETUP ============
  var holding = false;
  var dragged = false;
  
  canvas.addEventListener('mousedown', function(e) {holding = true;});
  canvas.addEventListener('mouseup',   function(e) {holding = false;});

  canvas.addEventListener('mousemove', function(evnt) {
    if (holding) {
      dragged = true;
      var point = getMousePosition(canvas, evnt);
      var x = Math.floor(point.getX()/CELL_SIZE);
      var y = Math.floor(point.getY()/CELL_SIZE);
      bm.setState(x,y, evnt.button === 0);
      drawBoard();
    }
  });
  
  canvas.addEventListener('click', function(evnt) {
    if (dragged) {
      dragged = false;
      return;
    }
    var point = getMousePosition(canvas, evnt);
    var x = Math.floor(point.getX()/CELL_SIZE);
    var y = Math.floor(point.getY()/CELL_SIZE);
    bm.flipState(x,y);
    drawBoard();
  });

  // =========== BUTTON LISTENERS SETUP ============
  var runButton = $("#runButton")[0];

  var stepAndDraw = function() {
    bm.lifeStep();
    drawBoard();
  }

  var running = false;
  var runningVar = null;
  
  runButton.addEventListener('click', function(e) {
    if(running) {
      clearTimeout(runningVar);
      runButton.innerHTML = 'Run';
      running = false;
    } else {
      runningVar = setInterval(stepAndDraw, 50);
      runButton.innerHTML = 'Stop';
      running = true;
    }
  });
  
  $("#stepButton")[0].addEventListener('click', function(e) {stepAndDraw()});

  $("#clearButton")[0].addEventListener('click', function(e) {
    bm.clearBoard();
    drawBoard();
  });

  // ===============================================

});