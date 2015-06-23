/*global
  alert
*/
function Board(gameBoardJSON, game) {
  var self = this;
  self.game = game;
  if (gameBoardJSON === undefined) {
    self.ships = [];
  } else {
    self.ships = gameBoardJSON.ships;
  }
  if (gameBoardJSON === undefined) {
    self.shots = [];
  } else {
    self.shots = gameBoardJSON.shots;
  }
  self.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  self.draw = function () {
    $('.board').empty();
    var tempX, x, y, currentSquareDiv, tempSquare;
    var root = $('.board');
    for (y = 1; y < 11; y++) {
      for (tempX = 0; tempX < 10; tempX++) {
        x = self.letters[tempX];
        tempSquare = new Square(x, y, self.game);
        currentSquareDiv = tempSquare.create();
        root.append(currentSquareDiv);
      }
    }
    self.addShots();
  };
  self.addShots = function () {
    var curShot, i;
    var addShotToSquares = function () {
      if (curShot.isHit) {
        $('.' + curShot.x + curShot.y).addClass('hasShip');
      }
      $('.' + curShot.x + curShot.y).addClass('isShot');
    };
    for (i = 0; i < self.shots.length; i++) {
      curShot = self.shots[i];
      addShotToSquares();
    }
  };

  //currently unused
  self.addShips = function () {
    var curShip, i, j, temp;
    var checkIfEmpty = function () {
      var squareToCheck;
      if (curShip.isVertical) {
        for (j = 0; j < curShip.length; j++) {
          squareToCheck = $('.' + curShip.startCell.x + (curShip.startCell.y + j));
          if ((squareToCheck.hasClass("hasShip"))) {
            return false;
          }
        }
      } else {
        for (j = 0; j < curShip.length; j++) {
          temp = self.letters[(self.letters.indexOf(curShip.startCell.x) + j)];
          squareToCheck = $('.' + temp + curShip.startCell.y);
          if ((squareToCheck.hasClass("hasShip"))) {
            return false;
          }
        }
      }
      return true;
    };
    var addShipstoSquares = function () {
      $('.' + curShip.startCell.x + curShip.startCell.y).addClass("hasShip");
      if (curShip.isVertical) {
        for (j = 0; j < curShip.length; j++) {
          $('.' + curShip.startCell.x + (curShip.startCell.y + j)).addClass("hasShip");
        }
      } else {
        for (j = 0; j < curShip.length; j++) {
          temp = self.letters[(self.letters.indexOf(curShip.startCell.x) + j)];
          $('.' + temp + curShip.startCell.y).addClass("hasShip");
        }
      }
    };
    for (i = 0; i < self.ships.length; i++) {
      curShip = self.ships[i];
      if (checkIfEmpty()) {
        addShipstoSquares();
      } else {
        alert("Ships could not be placed");
      }
    }
  };
}