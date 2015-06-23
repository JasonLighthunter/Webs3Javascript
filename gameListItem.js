/*global
  alert
*/
function GameListItem(listItem, gameList) {
  var self = this;
  self.id = listItem._id;
  self.status = listItem.status;
  self.enemyName = listItem.enemyName;
  self.aHelp = gameList.aHelp;
  self.gameJSON = self.aHelp.getGameByID(self.id);
  self.game = new Game(self.gameJSON, self);

  self.createGameListItem = function () {
    var gameListItemDiv = $('<button>');
    gameListItemDiv.addClass('gameListItem');
    gameListItemDiv.text('ID: ' + self.id + ' status: ' + self.status + ' opponent: ' + self.enemyName);
    gameListItemDiv.on('click', function () {
      $('.gameListItem').removeClass('currentGame');
      gameListItemDiv.addClass('currentGame');
      switch (self.status) {
      case 'que':
        alert('Waiting for other opponent.');
        break;
      case 'setup':
        self.game.startSetup();
        break;
      case 'started':
        if (self.gameJSON.yourTurn) {
          self.game.loadGame();
        } else {
          alert('not your turn.');
          $('.gameListItem').removeClass('currentGame');
        }
        break;
      case 'done':
        var msg;
        if (self.gameJSON.youWon) {
          msg = 'won';
        } else {
          msg = 'lost';
        }
        alert('Game is already finished. You ' + msg);
        break;
      }
    });
    return gameListItemDiv;
  };
}