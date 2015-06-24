function Harbor(helper, board) {
  var self = this;
  self.selectedShip = null;
  self.board = board;
  self.aHelp = helper;
  self.ships = self.aHelp.getShips();
  self.verticalModeOn = false;
  self.placedShips = [];

  self.fillShipsJSON = function (shipObjectArray) {
    var shipsJSON = {
      "ships": shipObjectArray
    };
    return shipsJSON;
  };

  self.placeShip = function (xCor, yCor) {
    if (!(self.selectedShip === null)) {
      if (self.board.addShip(self.selectedShip.length, self.verticalModeOn, xCor, yCor)) {
        var newShipObject = {
          "_id": self.selectedShip.id,
          "length": self.selectedShip.length,
          "name": self.selectedShip.name,
          "startCell" : { "x": xCor, "y": yCor},
          "isVertical" : self.verticalModeOn,
          "__v": self.selectedShip.v
        };
        self.placedShips.push(newShipObject);
        $('.selected').remove();
        $('.ship:last').click();
        var counter = 0;
        $('.ship').each(function () {
          counter++;
          console.log('test');
        });
        if (counter === 0) {
          self.aHelp.postGameByID(self.board.game.id, self.fillShipsJSON(self.placedShips));
          self.selectedShip = null;
          $('.refresh').click();
          $('.' + self.board.game.id).click();
        }
      }
    }
  };
  self.drawShipsinHarbor = function (root) {
    var i, curShip, tempShip, tempShipButton;
    for (i = 0; i < self.ships.length; i++) {
      curShip = self.ships[i];
      tempShip = new Ship(self, curShip.name, curShip.length, curShip._id, curShip.__v);
      tempShipButton = tempShip.create();
      tempShipButton.appendTo(root);
    }
    $('.ship:last').click();
  };

  self.drawVerticalModeToggle = function (root) {
    var toggle = $('<button>');
    toggle.text('Vertical: ' + self.verticalModeOn);
    toggle.on('click', function () {
      self.verticalModeOn = !self.verticalModeOn;
      toggle.text('Vertical: ' + self.verticalModeOn);
    });
    toggle.appendTo(root);
  };

  self.draw = function () {
    var root = $('.harbor');
    root.empty();
    self.drawVerticalModeToggle(root);
    self.drawShipsinHarbor(root);
  };
}