var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");

app.use(express.static(path.join(__dirname, "view")));

var port = process.env.PORT || 4000;
http.listen(port, function () {
  console.log("server on!: http://localhost:3000/");
});

var PARAMS = require("./controller/GLOBALPARAMS.js");

var lobbyGESTION = new (require("./controller/LobbyGESTION.js"))(io);
var roomGESTION = new (require("./controller/RoomGESTION.js"))(io);
var gameGESTION = new (require("./controller/GameGESTION.js"))(io, roomGESTION);

io.on("connection", function (socket) {
  console.log("user connected: ", socket.id);
  io.to(socket.id).emit("connected", PARAMS.CLIENT_GLOBALPARAMS);
  socket.broadcast.emit("new user entered");
  io.emit("total user count updated", socket.server.eio.clientsCount);

  socket.on("waiting", function () {
    //console.log('waiting from '+socket.id);
    lobbyGESTION.push(socket);
    lobbyGESTION.dispatch(roomGESTION);
  });
  socket.on("disconnect", function () {
    var roomIndex = roomGESTION.roomIndex[socket.id];
    if (roomIndex) roomGESTION.destroy(roomIndex);
    lobbyGESTION.kick(socket);
    console.log("user disconnected: ", socket.id);
    io.emit("total user count updated", socket.server.eio.clientsCount);
  });
  socket.on("keydown", function (keyCode) {
    var roomIndex = roomGESTION.roomIndex[socket.id];
    if (roomIndex)
      roomGESTION.rooms[roomIndex].objects[socket.id].keypress[keyCode] = true;
  });
  socket.on("ready", function () {
    var roomIndex = roomGESTION.roomIndex[socket.id];
    if (roomIndex) roomGESTION.rooms[roomIndex].objects[socket.id].ready = true;
  });
  socket.on("keyup", function (keyCode) {
    var roomIndex = roomGESTION.roomIndex[socket.id];
    if (roomIndex)
      delete roomGESTION.rooms[roomIndex].objects[socket.id].keypress[keyCode];
  });
  socket.on("mousemove", function (x, y) {
    var roomIndex = roomGESTION.roomIndex[socket.id];
    if (roomIndex)
      roomGESTION.rooms[roomIndex].objects[socket.id].mouse.move = {
        x: x,
        y: y,
      };
  });
  socket.on("click", function (x, y) {
    var roomIndex = roomGESTION.roomIndex[socket.id];
    if (roomIndex)
      roomGESTION.rooms[roomIndex].objects[socket.id].mouse.click = {
        x: x,
        y: y,
      };
  });
});
