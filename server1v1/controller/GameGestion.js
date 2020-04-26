var INTERVAL = 10;

function GameGestion(io, roomGestion) {
  var GmGs = this;
  GmGs.RmGs = roomGestion;

  GmGs.update = setInterval(function () {
    for (var roomId in GmGs.RmGs.rooms) {
      var room = GmGs.RmGs.rooms[roomId];
      room.runLoop(room);
    }
  }, INTERVAL);
}

module.exports = GameGestion;
