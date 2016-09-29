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

	// ============== PATTERN METHODS ===================
	var blockPoints = [Point(0,0), Point(0,1), Point(1,0), Point(1,1)]
	var beehivePoints = [Point(1,0), Point(2,0), Point(3,1), Point(2,2), Point(1,2), Point(0,1)]
	var loafPoints = [Point(1,0), Point(2,0), Point(3,1), Point(3,2), Point(2,3), Point(1,2), Point(0,1)]
	var boatPoints = [Point(0,0), Point(1,0), Point(2,1), Point(1,2), Point(0,1)]
	var blinkerPoints = [Point(0,0), Point(0,1), Point(0,2)]
	var toadPoints = [Point(1,0), Point(2,0), Point(3,0), Point(0,1), Point(1,1), Point(2,1)]
	var beaconPoints = [Point(0,0), Point(1,0), Point(0,1), Point(3,3), Point(3,2), Point(2,3)]
	var pulsarPoints = [Point(2,0), Point(3,0), Point(4,0), Point(2,5), Point(3,5), Point(4,5), Point(2,7), Point(3,7), Point(4,7), 
						Point(2,12), Point(3,12), Point(4,12), Point(8,0), Point(9,0), Point(10,0), Point(8,5), Point(9,5), Point(10,5),
						Point(8,7), Point(9,7), Point(10,7), Point(8,12), Point(9,12), Point(10,12), Point(0,2), Point(0,3), Point(0,4),
						Point(5,2), Point(5,3), Point(5,4), Point(7,2), Point(7,3), Point(7,4), Point(12,2), Point(12,3), Point(12,4),
						Point(0,8), Point(0,9), Point(0,10), Point(5,8), Point(5,9), Point(5,10), Point(7,8), Point(7,9), Point(7,10),
						Point(12,8), Point(12,9), Point(12,10)]
	var pentadecathalonPoints = [Point(1,0), Point(2,0), Point(3,0), Point(1,3), Point(2,3), Point(3,3), Point(0,1), Point(0,2), 
								 Point(4,1), Point(4,2), Point(1,8), Point(2,8), Point(3,8), Point(1,11), Point(2,11), Point(3,11), 
								 Point(0,9), Point(0,10), Point(4,9), Point(4,10)]
	var gliderPoints = [Point(0,0),	Point(1,1),	Point(2,1),	Point(1,2),	Point(0,2)]
	var lightweightSpaceshipPoints = [Point(1,0), Point(2,0), Point(3,0), Point(4,0), Point(4,1), Point(4,2), Point(3,3), Point(0,3), Point(0,1)];
	var rPentaminoPoints = [Point(2,0), Point(1,0), Point(1,1), Point(1,2), Point(0,1)]
	var diehardPoints = [Point(0,1), Point(1,1), Point(1,2), Point(6,0), Point(6,2), Point(5,2), Point(7,2)]
	var gosperGliderGunPoints = [Point(0,4), Point(0,5), Point(1,4), Point(1,5), Point(13,2), Point(12,2), Point(11,3), Point(10,4),
								 Point(10,5), Point(10,6), Point(11,7), Point(12,8), Point(13,8), Point(14,5), Point(15,3), Point(16,4),
								 Point(16,5), Point(17,5), Point(16,6), Point(15,7), Point(20,2), Point(20,3), Point(20,4), Point(21,2),
								 Point(21,3), Point(21,4), Point(22,1), Point(22,5), Point(24,0), Point(24,1), Point(24,5), Point(24,6),
								 Point(34,2), Point(34,3), Point(35,2), Point(35,3)]

	var deltaPointsToPlacer = function(points) {
		return function(x,y) {
			points.forEach(function(p) {
				state[x+p.getX()][y+p.getY()] = true;
			})	
		}
	}

	that.placeBlock 				= deltaPointsToPlacer(blockPoints);
	that.placeBeehive 				= deltaPointsToPlacer(beehivePoints);
	that.placeLoaf 					= deltaPointsToPlacer(loafPoints);
	that.placeBoat 					= deltaPointsToPlacer(boatPoints);
	that.placeBlinker 				= deltaPointsToPlacer(blinkerPoints);
	that.placeToad 					= deltaPointsToPlacer(toadPoints);
	that.placeBeacon 				= deltaPointsToPlacer(beaconPoints);
	that.placePulsar 				= deltaPointsToPlacer(pulsarPoints);
	that.placePentadecathalon 		= deltaPointsToPlacer(pentadecathalonPoints);
	that.placeGlider 				= deltaPointsToPlacer(gliderPoints);
	that.placeLightweightSpaceship	= deltaPointsToPlacer(lightweightSpaceshipPoints);
	that.placeRPentamino 			= deltaPointsToPlacer(rPentaminoPoints);
	that.placeDiehard 				= deltaPointsToPlacer(diehardPoints);
	that.placeGosperGliderGun 		= deltaPointsToPlacer(gosperGliderGunPoints);

	Object.freeze(that);
	return that;
}