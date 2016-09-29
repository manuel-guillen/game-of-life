const CELL_SIZE = 10;     // Width & height of cells in pixels
const RED = "#F44336";
const WHITE = "#FFFFFF";
const BLUE = "#386AFF";
const GRAY = "#DDDDDD";

// Iteration functional, which calls f on integers from,...,to
from_to = function (from, to, f) {
             if (from > to) return;
             f(from); from_to(from+1, to, f);
          }

// Returns the location of a click event, relative to the canvas clicked
getMousePosition = function(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return Point(evt.clientX - rect.left, evt.clientY - rect.top);
}

// MAIN METHOD
// ============================
$(document).ready(function(e) {
  
  // =============== KEY VARIABLES =================
  var canvas = $("#canvas")[0];
  
  var width = canvas.width/CELL_SIZE;
  var height = canvas.height/CELL_SIZE;
  
  var context = canvas.getContext("2d");  // Graphics context of canvas

  // ================ BOARD SETUP ==================
  var board = LifeBoard(width, height);

  // ================ CANVAS SETUP =================
  context.strokeStyle = GRAY;

  drawBoard = function() {
    from_to(0, height-1, function(y) {
      from_to(0, width-1, function(x) {
        context.beginPath();
        context.rect(CELL_SIZE*x, CELL_SIZE*y, CELL_SIZE, CELL_SIZE);
        context.fillStyle = board.getState(x,y) ? BLUE : WHITE;
        context.fill();
        context.stroke();
      });
    });  
  }
  drawBoard();

  // ============ MOUSE LISTENERS SETUP ============
  var holding = false;  // True, when mouse is held down.
  var dragged = false;  // True, if mouse was moved while held down (dragging)
  
  canvas.addEventListener('mousedown', function(e) {holding = true;});
  canvas.addEventListener('mouseup',   function(e) {holding = false;});

  canvas.addEventListener('mousemove', function(evnt) {
    if (holding) {
      dragged = true;
      var point = getMousePosition(canvas, evnt);
      var x = Math.floor(point.getX()/CELL_SIZE);
      var y = Math.floor(point.getY()/CELL_SIZE);
      board.setState(x,y, evnt.button === 0);
      drawBoard();
    }
  });
  
  canvas.addEventListener('click', function(evnt) {
    if (dragged) {      // Don't undo filling in of
      dragged = false;  // last cell from drag.
      return;
    }
    var point = getMousePosition(canvas, evnt);
    var x = Math.floor(point.getX()/CELL_SIZE);
    var y = Math.floor(point.getY()/CELL_SIZE);
    board.flipState(x,y);
    drawBoard();
  });

  // =========== BUTTON LISTENERS SETUP ============
  var runButton = $("#runButton");

  var stepAndDraw = function() {
    board.lifeStep();
    drawBoard();
  }

  var running = false;    // True, if game is running.
  var runningVar = null;  // Holds intervaled execution of game.
  
  runButton.click(function(e) {
    if(!running) {
      runningVar = setInterval(stepAndDraw, 50);  // Executes stepAndDraw() every 50ms
      runButton.css("background-color", RED)
               .html("Stop");
      running = true;
    } else {
      clearTimeout(runningVar);                   // Deletes periodic execution of stepAndDraw
      runButton.removeAttr('style')
               .html("Run");
      running = false;
    }
  });
  
  $("#stepButton").click(function(e) {stepAndDraw()});  // Executes stepAndDraw() once.

  $("#clearButton").click(function(e) {
    board.clearBoard();
    drawBoard();
  });

  // ----------------------------------------------------

  // Takes a function, stops game if running, clears the board
  // executes the function, and redraws the board.
  var resetTo = function(f) {
    if(running) {
      clearTimeout(runningVar);
      runButton.removeAttr('style')
               .html("Run");
      running = false;
    }
    board.clearBoard();
    f();
    drawBoard();
  }

  $("#stillsButton").click(function(e) { resetTo(function() {
      board.placeBlock(10,10);
      board.placeBeehive(20,10);
      board.placeLoaf(10,20);
      board.placeBoat(20,20);
    });
  })

  $("#smallsButton").click(function(e) { resetTo(function() {
      board.placeBlinker(10,10);
      board.placeToad(20,10);
      board.placeBeacon(30,10);
    });
  })

  $("#pulsarButton").click(function(e) { resetTo(function() {
      board.placePulsar(50,30);
    });
  })

  $("#pentaButton").click(function(e) { resetTo(function() {
      board.placePentadecathalon(50,30);
    });
  })

  $("#spacesButton").click(function(e) { resetTo(function() {
      board.placeGlider(20,20);
      board.placeLightweightSpaceship(40,20);
    });
  })

  $("#rPentButton").click(function(e) { resetTo(function() {
      board.placeRPentamino(50,30);
    });
  })

  $("#diehardButton").click(function(e) { resetTo(function() {
      board.placeDiehard(50,30);
    });
  })

  $("#gosperButton").click(function(e) { resetTo(function() {
      board.placeGosperGliderGun(20,30);
    });
  })

});