/*global
  alert
*/
function AjaxHelper() {
  var self = this;
  //self.server = 'https://zeeslagavans.herokuapp.com';
  self.server = 'https://zeeslagavans2.herokuapp.com';
  self.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Impwd2N1cHBlQGF2YW5zLm5sIg.azkuxjusyj-3r0a32fV6_knhfQJ02CxN3ZDiA26Ovpc';

  self.getGames = function () {
    var result;
    $.ajax({
      type: 'GET',
      url: self.server + '/users/me/games?token=' + self.token,
      global: false,
      async: false
    })
      .done(function (json) {
        result = json;
      });
    return result;
  };
  self.deleteGames = function () {
    var result;
    $.ajax({
      type: 'DELETE',
      url: self.server + '/users/me/games?token=' + self.token,
      global: false,
      async: false
    })
      .done(function (json) {
        result = json;
      });
    return result;
  };
  self.getNewGamePvP = function () {
    var result;
    $.ajax({
      type: 'GET',
      url: self.server + '/games?token=' + self.token,
      global: false,
      async: false
    })
      .done(function (json) {
        result = json;
      });
    return result;
  };
  self.getNewGamePvE = function () {
    var result;
    $.ajax({
      type: 'GET',
      url: self.server + '/games/AI?token=' + self.token,
      global: false,
      async: false
    })
      .done(function (json) {
        result = json;
      });
    return result;
  };
  self.getGameByID = function (ID) {
    var result;
    $.ajax({
      type: 'GET',
      url: self.server + '/games/' + ID + '?token=' + self.token,
      global: false,
      async: false
    })
      .done(function (json) {
        result = json;
      });
    return result;
  };
  self.getShips = function () {
    var result;
    $.ajax({
      type: 'GET',
      url: self.server + '/ships?token=' + self.token,
      global: false,
      async: false
    })
      .done(function (json) {
        result = json;
      });
    return result;
  };
  //POSTS
  self.postGameByID = function (ID, shipsJSON) {
    var result;
    $.ajax({
      type: 'POST',
      url: self.server + '/games/' + ID + '/gameboards?token=' + self.token,
      data: shipsJSON,
      global: false,
      async: false
    })
      .done(function (json) {
        result = json;
      });
    return result;
  };
  self.postShot = function (gameID, shotJSON) {
    $.ajax({
      type: 'POST',
      url: self.server + '/games/' + gameID + '/shots?token=' + self.token,
      data: shotJSON,
      global: false,
      async: false,
    })
      .done(function (json) {
        if(json === "BOOM")
        {
          var sound = new Audio("music/Kerboom.wav");
          sound.play();
        }
        else if(json === "SPLASH" || json ==="FAIL")
        {
          var sound = new Audio("music/Sploosh.wav");
          sound.play();
        }
        else if(json === "WINNER")
        {
          var sound = new Audio("music/HoorayYay.wav");
          sound.play();
        }
        alert(json);
      });
  };
}