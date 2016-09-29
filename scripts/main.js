from_to = function (from, to, f) {
  			     if (from > to) return;
			       f(from); from_to(from+1, to, f);
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

  // ================= BOARD SETUP =================

  var bm = LifeBoardManager(width, height);

  // ================= CANVAS SETUP ================
  context.strokeStyle = GRAY;

  from_to(0, height-1, function(y) {
    from_to(0, width-1, function(x) {
      context.beginPath();
      context.rect(CELL_SIZE*x, CELL_SIZE*y, CELL_SIZE, CELL_SIZE);
      context.fillStyle = bm.getState(x,y) ? BLUE : WHITE;
      context.fill();
      context.stroke();
    });
  });
  // ===============================================

});