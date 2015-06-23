function Game(gameJSON, gameListItem) {
  var self = this;
  self.json = gameJSON;
  self.id = self.json._id;
  self.aHelp = gameListItem.aHelp;
  self.board = null;
  self.harbor = null;

  self.loadGame = function () {
    self.board = new Board(self.aHelp.getGameByID(self.id).enemyGameboard, self);
    $('.harbor').empty();
    self.board.draw();
  };

  self.startSetup = function () {
    self.board = new Board(self.aHelp.getGameByID(self.id).myGameboard, self);
    self.harbor = new Harbor(self.aHelp, self.board);
    self.board.draw();
    self.harbor.draw();
  };
}