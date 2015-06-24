function Square(xCor, yCor, game) {
  var self = this;
  self.x = xCor;
  self.y = yCor;
  self.status = game.json.status;
  self.game = game;
  self.aHelp = game.aHelp;
  self.gameID = game.id;

  self.create = function () {
    var squareDiv = $('<div>');
    var classes = 'square ' + self.x + self.y;
    squareDiv.addClass(classes);
    squareDiv.on('click', function () {
      if (self.status === "started") {
        self.shoot(self.x, self.y);
      } else if (self.status === "setup") {
        self.game.harbor.placeShip(self.x, self.y);
      }
    });
    return squareDiv;
  };

  self.shoot = function (x, y) {
    var shot = {
      "x": x,
      "y": y
    };
    self.aHelp.postShot(self.gameID, shot);
    self.game.loadGame();
  };
}
