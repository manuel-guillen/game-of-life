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
				neighbors.push(Point(x + dx, y + dy))
			})
		})
		return neighbors.filter(function(p){return p.x != x || p.y != y})
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
	    flipState = function(x,y) {state[x][y] = !state[x][y]}

	that.getAliveNeighbors = function(x,y) {
		var fltr = function(p) {
			return p.x >= 0 && p.y >= 0 && p.x < width && p.y < height && state[p.x][p.y];
		}
		return Point(x,y).getNeighbors().filter(fltr)
	}

	that.lifeStep = function() {
		points = []
		from_to(0, width-1, function(x) {
			from_to(0, height-1, function(y) {
				var n = that.getAliveNeighbors(x,y).length;
				if (state[x][y] && (n < 2 || n > 3) || !state[x][y] && n === 3) {
					points.push(Point(x,y))
				}
			})
		})

		points.forEach(function(p) {flipState(p.x,p.y)})
	}

	Object.freeze(that);
	return that;
}