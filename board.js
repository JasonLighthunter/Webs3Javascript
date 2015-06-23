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

  //still unused
  self.addShip = function (length, isVertical, xCor, yCor) {
    var j, temp;
    var addShiptoSquares = function () {
      $('.' + xCor + yCor).addClass("hasShip");
      if (isVertical) {
        for (j = 0; j < length; j++) {
          $('.' + xCor + (yCor + j)).addClass("hasShip");
        }
      } else {
        for (j = 0; j < length; j++) {
          temp = self.letters[(self.letters.indexOf(xCor) + j)];
          $('.' + temp + yCor).addClass("hasShip");
        }
      }
    };
    var checkIfEmpty = function () {
      var squareToCheck;
      if (isVertical) {
        for (j = 0; j < length; j++) {
          squareToCheck = $('.' + xCor + (yCor + j));
          if (squareToCheck.hasClass("hasShip") || squareToCheck.length === 0) {
            return false;
          }
        }
      } else {
        for (j = 0; j < length; j++) {
          temp = self.letters[(self.letters.indexOf(xCor) + j)];
          squareToCheck = $('.' + temp + yCor);
          if (squareToCheck.hasClass("hasShip") || squareToCheck.length === 0) {
            return false;
          }
        }
      }
      return true;
    };
    if (!checkIfEmpty()) {
      alert("Ship could not be placed try changing orientation or location of first part of the ship.");
      return false;
    }
    addShiptoSquares();
    return true;
  };
}