# The Game of Life

## Introduction
John Conway's *Game of Life* is a cellular automation (a type of discrete mathematical model) created by British mathematician John Conway in 1970. It is a "zero-player game" in the sense that the automation plays on its own, starting from an initial state, requiring no further input. The user interacts with the game by only setting the initial state, and observing how the game evolves.

The game consists of a board of cells, where each cell is dead or alive. Starting with an initial distribution of dead and alive cells, the automation proceeds with "generations" (iterations/steps) determined as follows:

 1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
 2. Any live cell with two or three live neighbors lives on to the next generation.
 3. Any live cell with more than three live neighbors dies, as if by over-population.
 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## How to Use
All cells are "dead" by default. Cells can be continuously set to "alive" by clicking-and-holding (dragging) the mouse along multiple cells. Similarly, cells can be continuously set to "dead" by doing the same with the right-click button. Alternatively, clicking on a cell toggles its state between dead and alive.

Predetermined initial states are also available for choosing in the bottom-right of the game, exemplifying some of the game's interesting behavior.

To run the game continuously, hit the *Run* button.
To stop/pause the game during execution, hit the *Stop* button.
To reset the board by clearing, hit the *Clear* button.

The predetermined initial states have their own buttons for choosing at any point during the game.

## Software Commentary
### Separation of Concerns
The two main concerns identified in the project were simulating the game in the back-end, and communicating the game to and from the user interface in the front-end (Javascript concerns). Minor concerns were the actual development of the user interface (HTML and CSS concerns).

Maintaining the two main concerns separate was essential to the project. The game should be treated as its own abstraction, independent of the user interface, as it is, in reality, its own abstraction in real life (the game and how it works exists without a visual interface).

The concerns were separated into distinct modules. The game functionality was handled in its own abstraction in the form of the `LifeBoard` (JavaScript-simulated) class/constructor. The interaction between the game/board and the user interface was handled using Javascript event listeners applied, developed in the main script, executed when the document is ready.

### Project Modules and Dependencies
The project functionality is split into two Javascript files `main.js` and `objects.js`. 

The `main.js` script consists of the main module (main method), where execution commences once `index.html` has been loaded. This `main.js` module initially sets up the canvas element (an HTML5 graphics canvas) to a drawn empty grid, initializes a `LifeBoard` instance, and assigns functionality to the event listeners of the canvas and the buttons of the game.

The `objects.js` module handles the objects designed for the project, most importantly of all, the implementation of the `LifeBoard` object type. In this module, the `LifeBoard` object type is defined as well as an immutable `Point` object type to assist in the methods of the `LifeBoard` type.

The `main.js` makes use of the `LifeBoard` object type defined in `objects.js` by instantiating a single instance of the type to maintain the status of the game. The `main.js` module interacts with the `LifeBoard` object by updating cell states in response to events received in the event listeners defined in `main.js`. This dependency is not an optional design choice, but rather a required feature as the game status must respond to the user interface to keep up to date and respond to the user.

The `LifeBoard` data type makes use of the immutable `Point` data type also defined in `objects.js` by using a `Point` objects in determining neighbors and in determining shape constructs or patterns for placing on the board (patterns to make out of alive cells). This dependency is an optional one, but it is used here to make the code make more intuitive sense, improving readability and understanding. Using an immutable data type to pair coordinates together is much better from an understanding perspective than storing coordinates separately. Furthermore, the use of an immutable data type also leads to implementation of helper methods to help make the code more concise and understandable.

### Use of Functionals
Of the three list functions `map`, `filter`, and `reduce`, the only one used was `filter` to filter which of the 8 neighbors of a `Point` representing a cell on the board were actually valid cells on the board and alive cells.

In terms of iterative functionals, a one-dimensional iterative functional (`from-to`) is used to execute commands using an index (abstracting the idea of a `for` loop). Furthermore, to abstract out repeated code, an analogous two-dimensional iterative functional was created and used (`forAll2D`), for executing commands involving the two-dimensional structure of the board.

Two other functionals were developed in order to simplify code and generalize a concept into an abstraction. 

1. To generalize the behavior the predefined initial state buttons perform, a functional was created (`resetTo`) to stop execution of the game on the board, clear the board, performing the function taken as an argument, and redrawing the board.

2. To generalize the behavior of drawing the predefined initial state patterns on the board, a functional was created (`deltaPointsToPlacer`) which takes a list of `Point` objects, and returns a function that takes an x and y coordinate, and fills on the board a cell pattern created by using the "delta points" as displacement vectors from the (x,y) point.

### Design Choices and Tradeoffs
The main design choices made in the project were to use an HTML5 `canvas` to display the board (rather than using a collection of `div`s or a `table` in HTML) and the implementation of the `LifeBoard` data type as a 2D array of booleans.

The main tradeoff made in the project was choosing to redraw the entire canvas when making updates to the game/board status. The tradeoff lied in choosing simplicity/time over efficiency for updating the board.

The other tradeoff was using a 2D array of booleans to represent the board, as opposed to using a list or sparse array to represent alive cells. The tradeoff lied in choosing simplicity over memory for representing the board (a 2D array is easier to understand and a more natural representation for the board).