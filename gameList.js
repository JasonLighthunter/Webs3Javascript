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
  var refresh = function (root) {
    console.log('yay');
    $('.gameListItem').remove();
    self.drawActiveGames(root);
  };
  self.drawNewGameButton = function (root) {
    var newGameButton = $('<button>');
    newGameButton.text('New Game');
    newGameButton.on('click', function () {
      if (confirm('Do you want to play PvE')) {
        self.aHelp.getNewGamePvE();
        refresh(root);
      } else if (confirm('Do you want to play PvP')) {
        self.aHelp.getNewGamePvP();
        refresh(root);
      }
    });
    newGameButton.appendTo(root);
  };
  self.drawRefreshButton = function (root) {
    var refreshButton = $('<button>');
    refreshButton.text('refresh');
    refreshButton.on('click', function () {
      refresh(root);
    });
    refreshButton.appendTo(root);
  };
  self.drawDeleteButton = function (root) {
    var deleteButton = $('<button>');
    deleteButton.text('Delete all Games');
    deleteButton.on('click', function (root) {
      if (confirm('Are you sure you want to delete all games?')) {
        self.aHelp.deleteGames();
        $('.harbor').empty();
        $('.board').empty();
        refresh(root);
      }
    });
    deleteButton.appendTo(root);
  };
  self.draw = function () {
    var root = $('.gamesList');
    self.drawActiveGames(root);
    self.drawNewGameButton(root);
    self.drawDeleteButton(root);
    self.drawRefreshButton(root);
  };
}