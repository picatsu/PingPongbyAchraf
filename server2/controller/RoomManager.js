var Player = require("../model/PlayerObject.js");
var Ball = require("../model/BallObject.js");
var Score = require("../model/ScoreObject.js");
var Spark = require("../model/SparkObject.js");
var Countdown = require("../model/CountdownObject.js");
var SETTINGS = require("./SETTINGS.js");

function RoomManager(io) {
  var RmMg = this;
  RmMg.rooms = {};
  RmMg.roomIndex = {};

  RmMg.create = function (socket0, socket1) {
    var roomId = socket0.id + socket1.id;
    var room = new Room(RmMg, io, roomId, socket0, socket1);
    socket0.join(roomId);
    socket1.join(roomId);
    RmMg.rooms[roomId] = room;
    RmMg.roomIndex[socket0.id] = roomId;
    RmMg.roomIndex[socket1.id] = roomId;
    ready.initialize(io, room);
    io.to(socket0.id).emit("ready", "left");
    io.to(socket1.id).emit("ready", "right");
    console.log("Room Cree :", roomId);
  };
  RmMg.destroy = function (roomId) {
    var room = RmMg.rooms[roomId];
    room.players.forEach(function (socket) {
      var message =
        !room.objects[socket.id].ready && !room.objects.countdown
          ? "Tu n'es pas prêt"
          : null;
      delete RmMg.roomIndex[socket.id];
      io.to(socket.id).emit("destroy", message);
    });
    delete RmMg.rooms[roomId];
  };
  RmMg.gameOver = function (roomId, winner) {
    var room = RmMg.rooms[roomId];
    room.players.forEach(function (socket) {
      var message = socket.id == winner ? "VICTOIRE ! " : "DEFAITE ! ...";
      delete RmMg.roomIndex[socket.id];
      io.to(socket.id).emit("destroy", message);
    });
    delete RmMg.rooms[roomId];
  };
}

module.exports = RoomManager;

function Room(RmMg, io, id, socket0, socket1) {
  var room = this;
  room.id = id;
  room.RmMg = RmMg;
  room.players = [socket0, socket1];
  room.objects = {};
  room.objects[room.players[0].id] = new Player(room.players[0].id, "LEFT");
  room.objects[room.players[1].id] = new Player(room.players[1].id, "RIGHT");
  room.objects.player0Score = new Score(room.players[0].id, "LEFT");
  room.objects.player1Score = new Score(room.players[1].id, "RIGHT");
  room.objects.ball = new Ball(room.players[0].id, room.players[1].id);
  room.effects = [];
  room.sounds = [];
  room.loop = function () {};
  room.playsounds = function () {
    if (room.sounds.length > 0) {
      io.to(room.id).emit("playSound", room.sounds.pop());
    }
  };
  room.runLoop = function (room) {
    room.loop(room);
    room.playsounds();
  };
}

var ready = {
  initialize: function (io, room) {
    this.io = io;
    room.status = "ready";
    room.loop = this.loop;
    room.objects.countdown = new Countdown(10, null, SETTINGS.HEIGHT - 40);
    room.objects.countdown.action = function (room) {
      delete room.objects.countdown;
      room.RmMg.destroy(room.id);
    };
  },
  loop: function (room) {
    var player0ready = room.objects[room.players[0].id].ready;
    var player1ready = room.objects[room.players[1].id].ready;
    if (player0ready && player1ready) {
      ready.destroy(room);
      playing.initialize(ready.io, room);
    }
    var statuses = getStatsFromObjects(room);
    ready.io.to(room.id).emit("update", statuses);
  },
  destroy: function (room) {
    delete room.objects.playing;
  },
};
var playing = {
  initialize: function (io, room) {
    this.io = io;
    room.status = "countdown";
    room.loop = this.loop;
    room.objects.countdown = new Countdown(
      3,
      null,
      (SETTINGS.HEIGHT * 3) / 4,
      100
    );
    room.objects.countdown.action = function (room) {
      delete room.objects.countdown;
      room.status = "playing";
    };
    io.to(room.id).emit("playing");
  },
  loop: function (room) {
    var statuses = getStatsFromObjects(room);
    playing.io.to(room.id).emit("update", statuses);
    if (
      room.status == "playing" &&
      (room.objects[room.players[0].id].score >= SETTINGS.GOAL ||
        room.objects[room.players[1].id].score >= SETTINGS.GOAL)
    ) {
      room.status = "gameOver";
      room.gameOverDelay = 3;
    }
    if (room.status == "gameOver" && room.gameOverDelay-- < 0) {
      if (
        room.objects[room.players[0].id].score >
        room.objects[room.players[1].id].score
      ) {
        room.RmMg.gameOver(room.id, room.players[0].id);
      } else {
        room.RmMg.gameOver(room.id, room.players[1].id);
      }
    }
  },
};

function getStatsFromObjects(room) {
  var statuses = [];
  for (var object in room.objects) {
    var obj = room.objects[object];
    obj.update(room);
    statuses.push(obj.status);
  }
  room.effects.forEach(function (effect) {
    effect.update(room);
    statuses.push(effect.status);
  });
  return statuses;
}
