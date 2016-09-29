from_to = function (from, to, f) {
  			     if (from > to) return;
			       f(from); from_to(from+1, to, f);
		      }
// =================================================

$(document).ready(function(e) {
  
  // ================ CANVAS SETUP =================
  var canvas = $("#canvas")[0];
  var context = canvas.getContext("2d");

  const CELL_SIZE = 10;
  var width = canvas.width/CELL_SIZE;
  var height = canvas.height/CELL_SIZE;

  context.strokeStyle = "#DDDDDD";

  from_to(0, height-1, function(y) {
    from_to(0, width-1, function(x) {
      context.strokeRect(CELL_SIZE*x, CELL_SIZE*y, CELL_SIZE, CELL_SIZE);
    });
  });
  // ===============================================

});