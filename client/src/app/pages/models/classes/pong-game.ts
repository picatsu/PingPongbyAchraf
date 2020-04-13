import { Ball } from "./ball";
import { Boundaries } from "./boundaries";
import { Paddle } from "./paddle";
import { ControlState } from "./control-state";
import { Controls } from "../enums/controls";

export class PongGame {
  public ball: Ball;
  public playerPaddle: Paddle;
  public enemyPaddle: Paddle;
  public gameisPVM: boolean;

  public height: number;
  public width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.gameisPVM = true;

    // Construct game objects
    this.ball = new Ball(
      15,
      15,
      1.3, // CHANGE max SPEED BALL
      { x: height / 2, y: width / 2 },
      { x: 0.8, y: 0.8 }
    );
    this.playerPaddle = new Paddle(100, 20, 1.5, { x: 50, y: height / 2 }, 0);
    this.enemyPaddle = new Paddle(
      100,
      20,
      0.8,
      {
        x: width - 50,
        y: height / 2,
      },
      0
    );
  }

  tick(controlState: ControlState, direction?: ControlState) {
    this.ball.move();

    // Set acceleration, move player paddle based on input
    var paddleBounds = this.playerPaddle.getCollisionBoundaries();
    if (controlState.upPressed && paddleBounds.top > 0) {
      this.playerPaddle.accelerateUp(0.03);
    } else if (controlState.downPressed && paddleBounds.bottom < this.height) {
      this.playerPaddle.accelerateDown(0.03);
    } else {
      this.playerPaddle.decelerate(0.05);
    }
    this.playerPaddle.move();

    if (direction) {
      this.moveEnemyPaddle_Controled(direction);
    } else {
      this.moveEnemyPaddle();
    }
    this.checkCollisions();
  }

  public moveEnemyPaddle() {
    if (this.ball.getPosition().y < this.enemyPaddle.getPosition().y)
      this.enemyPaddle.accelerateUp(1);
    else this.enemyPaddle.accelerateDown(1);

    this.enemyPaddle.move();
  }

  public moveEnemyPaddle_Controled(direction: ControlState) {
    if (
      direction.upPressed &&
      this.ball.getPosition().y < this.enemyPaddle.getPosition().y
    ) {
      this.enemyPaddle.accelerateUp(1);
    } else this.enemyPaddle.accelerateDown(1);

    this.enemyPaddle.move();
  }

  public checkCollisions() {
    // Bounce off top/bottom
    let ballBounds = this.ball.getCollisionBoundaries();
    if (ballBounds.bottom >= this.height || ballBounds.top <= 0) {
      this.ball.reverseY();
    }

    let paddleBounds = this.playerPaddle.getCollisionBoundaries();

    // Don't let paddle go past boundaries
    if (paddleBounds.top <= 0 || paddleBounds.bottom >= this.height)
      this.playerPaddle.decelerate(1);

    // Player paddle hit
    if (
      ballBounds.left <= paddleBounds.right &&
      paddleBounds.right - ballBounds.left <= 3 &&
      ballBounds.bottom >= paddleBounds.top &&
      ballBounds.top <= paddleBounds.bottom
    ) {
      this.ball.reverseX();
      this.playerPaddle.score++;
      // Set vertical speed ratio by taking ratio of
      // dist(centerOfBall, centerOfPaddle) to dist(topOfPaddle, centerOfPaddle)
      // Negate because pixels go up as we go down :)
      var vsr =
        -(this.ball.getPosition().y - this.playerPaddle.getPosition().y) /
        (paddleBounds.top - this.playerPaddle.getPosition().y);

      // Max vsr is 1
      vsr = Math.min(vsr, 1);
      this.ball.setVerticalSpeedRatio(vsr);
    }

    // Enemy paddle hit
    paddleBounds = this.enemyPaddle.getCollisionBoundaries();
    if (
      ballBounds.right <= paddleBounds.left &&
      paddleBounds.left - ballBounds.right <= 3 &&
      ballBounds.bottom >= paddleBounds.top &&
      ballBounds.top <= paddleBounds.bottom
    ) {
      this.ball.reverseX();
      this.enemyPaddle.score++;
      // Set vertical speed ratio by taking ratio of
      // dist(centerOfBall, centerOfPaddle) to dist(topOfPaddle, centerOfPaddle)
      // Negate because pixels go up as we go down :)
      var vsr =
        -(this.ball.getPosition().y - this.enemyPaddle.getPosition().y) /
        (paddleBounds.top - this.enemyPaddle.getPosition().y);

      // Max vsr is 1
      vsr = Math.min(vsr, 1);
      this.ball.setVerticalSpeedRatio(vsr);
    }
  }

  gameOver(): boolean {
    if (
      this.ball.getCollisionBoundaries().left <= 0 ||
      this.ball.getCollisionBoundaries().right >= this.width
    )
      return true;
    else return false;
  }
}
