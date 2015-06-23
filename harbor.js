function Harbor(helper, board) {
  var self = this;
  self.board = board;
  self.aHelp = helper;
  self.ships = self.aHelp.getShips();
  self.verticalModeOn = false;
  self.placedShips = [];

  self.alterShipObjectArray = function (id, xCor, yCor) {
    var i;
    for (i = 0; i < self.ships.length; i++) {
      console.log(self.ships[i] + id + xCor + yCor);
    }
  };
  self.fillShipsJSON = function (shipObjectArray) {
    var shipsJSON = {
      "ships": shipObjectArray
    };
    return shipsJSON;
  };

  self.drawShipsinHarbor = function (root) {
    var i, curShip, tempShipDiv;
    console.log('yay');
    var selectShip = function () {
      $('.ship').removeClass();
      tempShipDiv.addClass('selected');
    };
    for (i = 0; i < self.ships.length; i++) {
      curShip = self.ships[i];
      tempShipDiv = $('<button>');
      tempShipDiv.text('The ' + curShip.name + '; length: ' + curShip.length);
      tempShipDiv.addClass('ship ' + curShip.id);
      tempShipDiv.on('click', selectShip());
      tempShipDiv.appendTo(root);
    }
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