var aHelp = new AjaxHelper();
var gameList = new GameList(aHelp);
/*var playMusic = function () {
  var music = ["music/Pirate.mp3", "music/YourAPirate.mp3", "music/KeelHauled.mp3"];
  var random = Math.floor(Math.random() * (music.length));
  var song = new Audio(music[random]);
  song.play();
  song.addEventListener('ended', playMusic);
};*/

gameList.draw();
//playMusic();
