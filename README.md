# BattleShip Project

    # Problem
    This project will attempt to make a fully rounded functional battleship two player game against the PC with vary levels of intelligence. It will use Webpack as bundler, babel to transpile and jest for testing. The main focus of the project is to work in TDD (test driven development) manner of development.

    two connected boards in a turn based game with the option for placing objects on the board and choosing a place to attack on the opponents board. the placed object vary in length, the actions are turn based, player who scored a hit is given another turn. the game is over when a players has no more objects.

    # Plan
    Ship factory
        length - int
        hits - int
        sunk - bool
        hit() - returns position and stores in hits
        isSunk() - check hits and compares to length

    GameBoard factory
        ship factory places a new ship in a desired location
        receiveAttack function to determine whether or not an attack hit a ship
        keep track of hits
        keep track of missing hits
        report if all ships sunk

    Player
        turn based
        pc player with minimax
