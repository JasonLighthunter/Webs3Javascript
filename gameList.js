/*global
  confirm
*/
function GameList(helper) {
  var self = this;
  self.aHelp = helper;
  self.games = null;

  self.drawActiveGames = function (root) {
    var tempGameListItemDiv, tempGameListItem, i;
    self.games = self.aHelp.getGames();
    for (i = 0; i < self.games.length; i++) {
      tempGameListItem = new GameListItem(self.games[i], self);
      tempGameListItemDiv = tempGameListItem.createGameListItem();
      tempGameListItemDiv.appendTo(root);
    }
  };

  self.refresh = function (root) {
    $('.gameListItem').remove();
    self.drawActiveGames(root);
  };
  self.delete = function (root) {
    self.aHelp.deleteGames();
    self.refresh(root);
  };

  self.drawNewGameButton = function (root) {
    var newGameButton = $('<button>');
    newGameButton.text('New Game');
    newGameButton.on('click', function () {
      if (confirm('Are you sure?')) {
        self.aHelp.getNewGamePvE();
        self.refresh(root);
      }
    });
    newGameButton.appendTo(root);
  };
  self.drawRefreshButton = function (root) {
    var refreshButton = $('<button>');
    refreshButton.text('refesh');
    refreshButton.on('click', self.refresh(root));
    refreshButton.appendTo(root);
  };
  self.drawDeleteButton = function (root) {
    var deleteButton = $('<button>');
    deleteButton.text('Delete all Games');
    deleteButton.on('click', self.delete(root));
    deleteButton.appendTo(root);
  };
  self.draw = function () {
    var root = $('.gamesList');
    self.drawActiveGames(root);
    self.drawNewGameButton(root);
    self.drawRefreshButton(root);
  };
}