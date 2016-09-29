from_to = function (from, to, f) {
  			if (from > to) return;
			f(from); from_to(from+1, to, f);
		  }
// =========================================================

Point = function(x,y) {
	var that = Object.create(Point.prototype)

	that.getX = function(){return x;}
	that.getY = function(){return y;}

	that.getNeighbors = function() {
		var neighbors = []
		from_to(-1,1, function(dx) {
			from_to(-1,1, function(dy) {
				if (dx != 0 || dy != 0) neighbors.push(Point(x + dx, y + dy))
			})
		})
		return neighbors
	}

	Object.freeze(that)
	return that
}

LifeBoardManager = function(width, height) {
	var that = Object.create(LifeBoardManager.prototype);

	that.getWidth = function() {return width;}
	that.getHeight = function() {return height;}

	var state = []
	from_to(0,width-1, function() {
		var lst = []
		from_to(0, height-1, function() {
			lst.push(false)
		})
		state.push(lst)
	})

	that.getState = function(x,y) {return state[x][y]}
	that.setState = function(x,y, s) {state[x][y] = s}
	that.flipState = function(x,y) {state[x][y] = !state[x][y]}

	that.getAliveNeighbors = function(x,y) {
		var fltr = function(p) {
			var pX = p.getX();
			var pY = p.getY();
			return pX >= 0 && pY >= 0 && pX < width && pY < height && state[pX][pY];
		}
		return Point(x,y).getNeighbors().filter(fltr)
	}

	that.lifeStep = function() {
		points = []
		from_to(0, width-1, function(x) {
			from_to(0, height-1, function(y) {
				var n = that.getAliveNeighbors(x,y).length;
				if (state[x][y] && (n < 2 || n > 3) || !state[x][y] && n === 3) {
					points.push(Point(x,y));
				}
			})
		})

		points.forEach(function(p) {that.flipState(p.getX(),p.getY())})
	}

	that.clearBoard = function() {
		from_to(0, width-1, function(x){
			from_to(0, height-1, function(y) {
				state[x][y] = false;
			});
		});
	}

	that.placeBlock = function(x,y) {
		state[x][y] = true;
		state[x][y+1] = true;
		state[x+1][y] = true;
		state[x+1][y+1] = true;
	}

	that.placeBeehive = function(x,y) {
		state[x][y] = true;
    	state[x+1][y] = true;
	    state[x+2][y+1] = true;
    	state[x+1][y+2] = true;
    	state[x][y+2] = true;
    	state[x-1][y+1] = true;
	}

	that.placeLoaf = function(x,y) {
		state[x][y] = true;
		state[x+1][y] = true;
		state[x+2][y+1] = true;
		state[x+2][y+2] = true;
		state[x+1][y+3] = true;
		state[x][y+2] = true;
		state[x-1][y+1] = true;
	}

	that.placeBoat = function(x,y) {
		state[x][y] = true;
		state[x+1][y] = true;
		state[x+2][y+1] = true;
		state[x+1][y+2] = true;
		state[x][y+1] = true;
	}

	that.placeBlinker = function(x,y) {
		state[x][y] = true;
		state[x][y+1] = true;
		state[x][y+2] = true;
	}

	that.placeToad = function(x,y) {
		state[x][y] = true;
		state[x+1][y] = true;
		state[x+2][y] = true;
		
		state[x-1][y+1] = true;
		state[x][y+1] = true;
		state[x+1][y+1] = true;
	}

	that.placeBeacon = function(x,y) {
		state[x][y] = true;
		state[x+1][y] = true;
		state[x][y+1] = true;

		state[x+3][y+3] = true;
		state[x+3][y+2] = true;
		state[x+2][y+3] = true;
	}

	that.placePulsar = function(x,y) {
		state[x+2][y] = true;
		state[x+3][y] = true;
		state[x+4][y] = true;

		state[x+2][y+5] = true;
		state[x+3][y+5] = true;
		state[x+4][y+5] = true;

		state[x+2][y+7] = true;
		state[x+3][y+7] = true;
		state[x+4][y+7] = true;

		state[x+2][y+12] = true;
		state[x+3][y+12] = true;
		state[x+4][y+12] = true;

		state[x+8][y] = true;
		state[x+9][y] = true;
		state[x+10][y] = true;

		state[x+8][y+5] = true;
		state[x+9][y+5] = true;
		state[x+10][y+5] = true;

		state[x+8][y+7] = true;
		state[x+9][y+7] = true;
		state[x+10][y+7] = true;

		state[x+8][y+12] = true;
		state[x+9][y+12] = true;
		state[x+10][y+12] = true;

		// ----------------------
		state[x][y+2] = true;
		state[x][y+3] = true;
		state[x][y+4] = true;

		state[x+5][y+2] = true;
		state[x+5][y+3] = true;
		state[x+5][y+4] = true;

		state[x+7][y+2] = true;
		state[x+7][y+3] = true;
		state[x+7][y+4] = true;

		state[x+12][y+2] = true;
		state[x+12][y+3] = true;
		state[x+12][y+4] = true;

		state[x][y+8] = true;
		state[x][y+9] = true;
		state[x][y+10] = true;

		state[x+5][y+8] = true;
		state[x+5][y+9] = true;
		state[x+5][y+10] = true;

		state[x+7][y+8] = true;
		state[x+7][y+9] = true;
		state[x+7][y+10] = true;

		state[x+12][y+8] = true;
		state[x+12][y+9] = true;
		state[x+12][y+10] = true;
	}

	that.placePentadecathalon = function(x,y) {
		state[x+1][y] = true;
		state[x+2][y] = true;
		state[x+3][y] = true;

		state[x+1][y+3] = true;
		state[x+2][y+3] = true;
		state[x+3][y+3] = true;

		state[x][y+1] = true;
		state[x][y+2] = true;

		state[x+4][y+1] = true;
		state[x+4][y+2] = true;

		state[x+1][y+8] = true;
		state[x+2][y+8] = true;
		state[x+3][y+8] = true;

		state[x+1][y+11] = true;
		state[x+2][y+11] = true;
		state[x+3][y+11] = true;

		state[x][y+9] = true;
		state[x][y+10] = true;

		state[x+4][y+9] = true;
		state[x+4][y+10] = true;
	}

	that.placeGlider = function(x,y) {
		state[x][y] = true;
		state[x+1][y+1] = true;
		state[x+2][y+1] = true;
		state[x+1][y+2] = true;
		state[x][y+2] = true;
	}

	that.placeLightweightSpaceship = function(x,y) {
		state[x+1][y] = true;
		state[x+2][y] = true;
		state[x+3][y] = true;
		state[x+4][y] = true;
		state[x+4][y+1] = true;
		state[x+4][y+2] = true;
		state[x+3][y+3] = true;
		state[x][y+3] = true;
		state[x][y+1] = true;
	}

	that.placeRPentamino = function(x,y) {
		state[x+2][y] = true;
		state[x+1][y] = true;
		state[x+1][y+1] = true;
		state[x+1][y+2] = true;
		state[x][y+1] = true;
	}

	Object.freeze(that);
	return that;
}