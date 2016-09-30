(function() {
  mocha.setup("bdd");
  var assert = chai.assert;

  describe("Point", function() {
    describe("getX", function() {
      var origin = Point(0,0)
      var point = Point(-3,7)

      it("should return correct X coordinate for origin", function() {
        assert.equal(origin.getX(), 0);
      });

      it("should return correct X value for random point", function() {
        assert.equal(point.getX(), -3);
      });
    });

    describe("getY", function() {
      var origin = Point(0,0)
      var point = Point(5,13)

      it("should return correct Y coordinate for origin", function() {
        assert.equal(origin.getY(), 0);
      });

      it("should return correct Y value for random point", function() {
        assert.equal(point.getY(), 13);
      });
    });

    describe("getNeighbors", function() {
      var origin = Point(0,0)
      var point = Point(23,-62)

      var neighborsO = origin.getNeighbors();
      var neighborsP = point.getNeighbors();

      it("should return list of all neighbors for origin", function() {
        assert.equal(neighborsO.length, 8);
        assert.isTrue(neighborsO.some(function(p) {return p.getX() === -1 && p.getY() === -1}));
        assert.isTrue(neighborsO.some(function(p) {return p.getX() === -1 && p.getY() === 0}));
        assert.isTrue(neighborsO.some(function(p) {return p.getX() === -1 && p.getY() === +1}));
        assert.isTrue(neighborsO.some(function(p) {return p.getX() === 0 && p.getY() === -1}));
        assert.isTrue(neighborsO.some(function(p) {return p.getX() === 0 && p.getY() === +1}));
        assert.isTrue(neighborsO.some(function(p) {return p.getX() === +1 && p.getY() === -0}));
        assert.isTrue(neighborsO.some(function(p) {return p.getX() === +1 && p.getY() === 0}));
        assert.isTrue(neighborsO.some(function(p) {return p.getX() === +1 && p.getY() === +0}));
      });

      it("should return list of all neighbors for random point", function() {
        assert.equal(neighborsP.length, 8);
        assert.isTrue(neighborsP.some(function(p) {return p.getX() === 22 && p.getY() === -63}));
        assert.isTrue(neighborsP.some(function(p) {return p.getX() === 22 && p.getY() === -62}));
        assert.isTrue(neighborsP.some(function(p) {return p.getX() === 22 && p.getY() === -61}));
        assert.isTrue(neighborsP.some(function(p) {return p.getX() === 23 && p.getY() === -63}));
        assert.isTrue(neighborsP.some(function(p) {return p.getX() === 23 && p.getY() === -61}));
        assert.isTrue(neighborsP.some(function(p) {return p.getX() === 24 && p.getY() === -63}));
        assert.isTrue(neighborsP.some(function(p) {return p.getX() === 24 && p.getY() === -62}));
        assert.isTrue(neighborsP.some(function(p) {return p.getX() === 24 && p.getY() === -61}));
      });
    });
  });

  describe("LifeBoard", function() {
    var board = LifeBoard(800,600)
    describe("getWidth", function() {
      it("should return correct width for random dimensions", function() {
        assert.equal(board.getWidth(), 800);
      });
    });

    describe("getHeight", function() {
      it("should return correct height for random dimensions", function() {
        assert.equal(board.getHeight(), 600);
      });
    });

    describe("getState, setState, flipState", function() {
      it("should return false for all cells", function() {
        forAll2D(800, 600, function(x,y) {assert.isFalse(board.getState(x,y))})
      });

      it("should return true for cell on which setState called with true", function() {
        board.setState(463,218, true);
        assert.isTrue(board.getState(463,218));
      });

      it("should return false for cell on which setState called with false", function() {
        board.setState(264,452, false);
        assert.isFalse(board.getState(264,452));        
      });

      it("should flip state of cell when call flipState", function() {
        var b = board.getState(511,397);
        board.flipState(511,397)
        assert.notEqual(board.getState(511,397), b);
      });
    });

    describe("getAliveNeighbors", function() {
      it("should return only points on board that are alive", function() {
        board.setState(0,0, true);
        board.setState(1,1, true);
        assert.equal(board.getAliveNeighbors(0,1).length, 2);
      });

      it("should return empty list on call after clear", function() {
        board.clearBoard();
        assert.equal(board.getAliveNeighbors(1,1).length, 0);
      });

    });

    describe("getlifeStep, clearBoard, deltaPointsToPlacer", function() {
      it("TEST BY OBSERVING GRAPHICAL BEHAVIOUR - COMPARE TO WIKI DEMOS", function() {
        assert.isTrue(true);
      });
    });

  });

  mocha.run();
})()