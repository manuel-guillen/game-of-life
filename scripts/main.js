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
  var runButton = $("#runButton");

  var stepAndDraw = function() {
    bm.lifeStep();
    drawBoard();
  }

  var running = false;
  var runningVar = null;
  
  runButton.click(function(e) {
    if(running) {
      clearTimeout(runningVar);
      runButton.removeAttr('style')
               .html("Run");
      running = false;
    } else {
      runningVar = setInterval(stepAndDraw, 50);
      runButton.css("background-color", "#f44336")
               .html("Stop");
      running = true;
    }
  });
  
  $("#stepButton").click(function(e) {stepAndDraw()});

  $("#clearButton").click(function(e) {
    bm.clearBoard();
    drawBoard();
  });

  // ----------------------------------------------------

  var resetTo = function(f) {
    if(running) {
      clearTimeout(runningVar);
      runButton.removeAttr('style')
               .html("Run");
      running = false;
    }
    bm.clearBoard();
    f();
    drawBoard();
  }

  $("#stillsButton").click(function(e) { resetTo(function() {
      bm.placeBlock(10,10);
      bm.placeBeehive(20,10);
      bm.placeLoaf(10,20);
      bm.placeBoat(20,20);
    });
  })

  $("#smallsButton").click(function(e) { resetTo(function() {
      bm.placeBlinker(10,10);
      bm.placeToad(20,10);
      bm.placeBeacon(30,10);
    });
  })

  $("#pulsarButton").click(function(e) { resetTo(function() {
      bm.placePulsar(50,30);
    });
  })

  $("#pentaButton").click(function(e) { resetTo(function() {
      bm.placePentadecathalon(50,30);
    });
  })

  $("#spacesButton").click(function(e) { resetTo(function() {
      bm.placeGlider(20,20);
      bm.placeLightweightSpaceship(40,20);
    });
  })

  $("#rPentButton").click(function(e) { resetTo(function() {
      bm.placeRPentamino(50,30);
    });
  })

  $("#diehardButton").click(function(e) { resetTo(function() {
      bm.placeDiehard(50,30);
    });
  })

  $("#gosperButton").click(function(e) { resetTo(function() {
      bm.placeGosperGliderGun(20,30);
    });
  })

  // ===============================================

});