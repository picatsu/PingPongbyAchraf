var PARAMS = require("../controller/GLOBALPARAMS.js");
var Base = require("./Base.js");
let numberPlayerX = true;
let numberPlayerY = true;
var LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40;
var UNIT = 2;

function Player(id, position) {
  Base.call(this);
  var color = "#fff7f7";
  for (var i = 0; i < 6; i++) {
    // color += Math.floor(Math.random() * 16).toString(16);
  }
  var xPos;
  switch (position) {
    case "LEFT":
      if (numberPlayerX) {
        xPos = PARAMS.PLAYER.GAP + 40;
        numberPlayerX = !numberPlayerX;
      } else {
        xPos = PARAMS.PLAYER.GAP;
        numberPlayerX = !numberPlayerX;
      }

      break;
    case "RIGHT":
      if (numberPlayerY) {
        xPos = PARAMS.WIDTH - PARAMS.PLAYER.GAP - 40;
        numberPlayerY = !numberPlayerY;
      } else {
        xPos = PARAMS.WIDTH - PARAMS.PLAYER.GAP;
        numberPlayerY = !numberPlayerY;
      }

      break;
  }
  this.role = "player";
  this.status.shape = "rectangle";
  this.id = id;
  this.score = 0;
  this.ready = false;
  this.keypress = {};
  this.mouse = {
    move: { x: undefined, y: undefined },
    click: { x: undefined, y: undefined },
  };

  this.status.rect = {
    height: PARAMS.PLAYER.HEIGHT,
    width: PARAMS.PLAYER.WIDTH,
    x: xPos,
    y: PARAMS.HEIGHT / 2,
    color: { fill: color },
  };
}
Player.prototype = new Base();
Player.prototype.constructor = Player;
Player.prototype.update = function (room) {
  var player = this.status.rect;
  if (room.status == "countdown" || room.status == "playing") {
    if (this.keypress[UP]) {
      moveUp(player);
      this.mouse.click = null;
    }
    if (this.keypress[DOWN]) {
      moveDown(player);
      this.mouse.click = null;
    }
    if (
      this.mouse.click &&
      ((this.mouse.click.x < player.x + 50 &&
        this.mouse.click.x > player.x - 50) ||
        this.mouse.click.x === null)
    ) {
      if (this.mouse.click.y < player.y - 5) {
        moveUp(player);
      } else if (this.mouse.click.y > player.y + 5) {
        moveDown(player);
      } else {
        this.mouse.click = null;
      }
    }
  }
};

module.exports = Player;

function moveUp(player) {
  if (player.y - player.height / 2 - UNIT >= 0 + PARAMS.BORDER_WIDTH)
    player.y -= UNIT;
}
function moveDown(player) {
  if (
    player.y + player.height / 2 + UNIT <=
    PARAMS.HEIGHT - PARAMS.BORDER_WIDTH
  )
    player.y += UNIT;
}
