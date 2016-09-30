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
The main concerns in the project were simulating the game in the back-end, and communicating the game to and from the user interface. 
### Program Modules and Dependencies
### Use of Functionals
### Design Choices and Tradeoffs
