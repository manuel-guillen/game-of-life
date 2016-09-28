// FUNCTIONALS (provided in 6.170 lecture)
// =======================================
from_to = function (from, to, f) {
  			if (from > to) return;
			f(from); from_to(from+1, to, f);
		  }

each = function (a, f) {
  			from_to(0, a.length-1, function (i) {f(a[i]);});
	   }

map = function (a, f) {
  		var result = [];
  		each (a, function (e) {
    		result.push(f(e));
    	});
  		return result;
  	  }

filter = function (a, f) {
  			var result = [];
  			each (a, function (e) {
    			if (f(e)) result.push(e);
    		});
  			return result;
  		 }

reduce = function (a, f, base) {
  			var result = base;
  			each (a, function (e) {
    			result = f(e, result);
    		});
  			return result;
  		 }

// ======================================

CELL_SIZE = 10

$(document).ready(function(e) {
  
  var canvas = $("#canvas")[0];
  var context = canvas.getContext("2d");

  var boardState = []

  context.strokeStyle = "#DDDDDD";

  from_to(0, canvas.height/CELL_SIZE, function(y) {
    var row = []
    from_to(0, canvas.width/CELL_SIZE, function(x) {
      context.strokeRect(CELL_SIZE*x,CELL_SIZE*y,CELL_SIZE,CELL_SIZE);
      row.push(false)
    });
    boardState.push(row)
  });

});