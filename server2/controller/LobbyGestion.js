function LobbyGestion(io) {
  var LbGs = this;
  LbGs.lobby = [];
  LbGs.updating = false;

  LbGs.push = function (socket) {
    if (LbGs.lobby.indexOf(socket) < 0) {
      LbGs.lobby.push(socket);
    }
  };
  LbGs.kick = function (socket) {
    var index = LbGs.lobby.indexOf(socket);
    if (index >= 0) LbGs.lobby.splice(index, 1);
  };
  LbGs.clean = function () {
    var sockets = LbGs.lobby;
    LbGs.lobby = sockets.filter(function (socket) {
      return socket !== null;
    });
  };
  LbGs.dispatch = function (RmGs) {
    if (LbGs.dispatching) return;
    LbGs.dispatching = true;

    while (LbGs.lobby.length > 1) {
      var player0 = LbGs.lobby.splice(0, 1);
      var player1 = LbGs.lobby.splice(0, 1);
      RmGs.create(player0[0], player1[0]);
    }
    LbGs.dispatching = false;
  };
}
module.exports = LobbyGestion;
