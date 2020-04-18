import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
} from "@angular/core";
import { PongGame } from "../models/classes/pong-game";
import { ControlState } from "../models/classes/control-state";
import { Boundaries } from "../models/classes/boundaries";
import { Controls } from "../models/enums/controls";
import { SharedService } from "src/app/layouts/sharedService/shared.service";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
@Component({
  selector: "app-pongonline",
  templateUrl: "./pongonline.component.html",
  styleUrls: ["./pongonline.component.scss"],
})
export class PongonlineComponent implements OnInit {
  @ViewChild("PongCanvas") canvasElement: ElementRef;

  public gamePaused: boolean = false;
  public gameisPVM: boolean = true;
  public width: number = 800;
  public height: number = 600;
  public lastScore: number = 0;
  private context: CanvasRenderingContext2D;
  private pongGame: PongGame;
  private ticksPerSecond: number = 144;
  private url = "http://localhost:" + 3000;
  private controlState: ControlState;
  private controlEnnemiState: ControlState;
  private socket;
  @HostListener("document:keydown", ["$event"])
  onKeyDownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.sharedService.onKeyDownHandler(event);
    }
  }

  constructor(
    private readonly sharedService: SharedService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.socket = io(this.url);
    this.pongGame = new PongGame(this.height, this.width);
    this.controlState = { upPressed: false, downPressed: false };
    this.controlEnnemiState = { upPressed: false, downPressed: false };
  }

  changeGameMode() {
    this.gameisPVM = !this.gameisPVM;
  }
  getPlayerScore() {
    return this.pongGame.playerPaddle.score;
  }

  getEnnemiScore() {
    return this.pongGame.enemyPaddle.score;
  }

  freeze() {
    this.gamePaused = !this.gamePaused;
    if (!this.gamePaused) {
      window.requestAnimationFrame(() => this.renderFrame());
    }
  }

  ngAfterViewInit() {
    this.context = this.canvasElement.nativeElement.getContext("2d");
    this.context.fillStyle = this.sharedService.sidebarColor;

    // Game model ticks 60 times per second. Doing this keeps same game speed
    // on higher FPS environments.

    if (!this.gamePaused) {
      this.renderFrame();

      if (!this.gameisPVM) {
        setInterval(
          () => this.pongGame.tick(this.controlState, this.controlEnnemiState),
          1 / this.ticksPerSecond
        );
      } else {
        setInterval(
          () => this.pongGame.tick(this.controlState),
          1 / this.ticksPerSecond
        );
      }
    }
  }

  ngOnInit() {}

  sendMessage(player: string, direction: string) {
    console.log("AFFICHAGE ANGULAR ", this.socket);

    this.socket.emit(player, direction);
    this.socket.on(player, (message) => {
      console.log("player2 value => ", message);
    });
  }

  getMessage() {
    //return this.socket
    //  .fromEvent("new message") ;
    return Observable.create((observer) => {
      this.socket.on("new message", (message) => {
        observer.next(message);
        console.log("getMessage() => ", message);
      });
      this.socket.emit("player1", "hello from client player 1");
      this.socket.on("player2", (message) => {
        console.log("player2 get message a recu:  ", message);
      });
    });
  }

  renderFrame(): void {
    if (!this.gamePaused) {
      // Only run if game still going
      if (this.pongGame.gameOver()) {
        this.context.font = "30px Arial";
        if (this.getPlayerScore() >= this.getEnnemiScore()) {
          this.context.fillText(
            "YOU WIN ! Your score : " + this.getPlayerScore(),
            50,
            50
          );
        } else {
          this.context.fillText("Game Over!", 50, 50);
        }

        setTimeout(() => location.reload(), 50);
        window.requestAnimationFrame(() => this.renderFrame());
        return;
      }

      // Draw background
      // this.context.fillStyle = "rgb(0,0,110)";
      this.context.fillStyle = this.sharedService.sidebarColor;

      this.context.fillRect(0, 0, this.width, this.height);

      // Set to white for game objects
      this.context.fillStyle = "rgb(255,255,255)";

      let bounds: Boundaries;

      // Draw player paddle
      let paddleObj = this.pongGame.playerPaddle;
      bounds = paddleObj.getCollisionBoundaries();
      this.context.fillRect(
        bounds.left,
        bounds.top,
        paddleObj.getWidth(),
        paddleObj.getHeight()
      );

      // Draw enemy paddle
      let enemyObj = this.pongGame.enemyPaddle;
      bounds = enemyObj.getCollisionBoundaries();
      this.context.fillRect(
        bounds.left,
        bounds.top,
        enemyObj.getWidth(),
        enemyObj.getHeight()
      );

      // Draw ball
      let ballObj = this.pongGame.ball;
      bounds = ballObj.getCollisionBoundaries();

      this.context.fillRect(
        bounds.left,
        bounds.top,
        ballObj.getWidth(),
        ballObj.getHeight()
      );

      // Render next frame

      window.requestAnimationFrame(() => this.renderFrame());
    }
  }

  reload(event: Event) {
    this.gamePaused = !this.gamePaused;
    console.log("event : ", event);
  }

  @HostListener("window:keydown", ["$event"])
  keyUp(event: KeyboardEvent) {
    if (event.keyCode == Controls.Up) {
      this.controlState.upPressed = true;
      this.sendMessage("player1", "up");
    }
    if (event.keyCode == Controls.Down) {
      this.controlState.downPressed = true;
      this.sendMessage("player1", "down");
    }
  }

  @HostListener("window:keyup", ["$event"])
  keyDown(event: KeyboardEvent) {
    if (event.keyCode == Controls.Up) {
      this.controlState.upPressed = false;
      this.sendMessage("player1", "stop");
    }
    if (event.keyCode == Controls.Down) {
      this.controlState.downPressed = false;
      this.sendMessage("player1", "stop");
    }
  }

  buttonUp() {
    this.controlState.upPressed = true;
    this.controlState.downPressed = false;
    this.sendMessage("player1", "up");
  }
  buttonDown() {
    this.controlState.upPressed = false;
    this.controlState.downPressed = true;
    this.sendMessage("player1", "down");
  }

  buttonEnnemiUp() {
    this.controlEnnemiState.upPressed = true;
    this.controlEnnemiState.downPressed = false;
  }
  buttonEnnemiDown() {
    this.controlEnnemiState.upPressed = false;
    this.controlEnnemiState.downPressed = true;
  }
}
