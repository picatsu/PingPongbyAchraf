var PARAMS = require("../controller/GLOBALPARAMS.js");
var Base = require("./Base.js");

function Score(id, position) {
  var xPos;
  switch (position) {
    case "LEFT":
      xPos = PARAMS.WIDTH / 2 - PARAMS.SCORE.GAP;
      break;
    case "RIGHT":
      xPos = PARAMS.WIDTH / 2 + PARAMS.SCORE.GAP;
      break;
  }
  Base.call(this);
  this.playerId = id;
  this.status.shape = "text";
  this.status.text = {
    color: { fill: "#f4fc0d" },
    font: "Arial",
    textAlign: "center",
    textBaseline: "middle",
    size: PARAMS.SCORE.SIZE,
    message: undefined,
    x: xPos,
    y: PARAMS.SCORE.Y,
  };
}
Score.prototype = new Base();
Score.prototype.constructor = Score;
Score.prototype.update = function (room) {
  this.status.text.message = room.objects[this.playerId].score;
};
module.exports = Score;
