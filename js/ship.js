function Ship(harbor, name, length, id, v) {
  var self = this;
  self.harbor = harbor;
  self.name = name;
  self.length = length;
  self.id = id;
  self.v = v;

  self.create = function () {
    var tempShipDiv = $('<button>');
    tempShipDiv.text('The ' + self.name + '; length: ' + self.length);
    tempShipDiv.addClass('ship');
    tempShipDiv.on('click', function () {
      $('.ship').removeClass('selected');
      tempShipDiv.addClass('selected');
      self.harbor.selectedShip = self;
    });
    return tempShipDiv;
  };
}