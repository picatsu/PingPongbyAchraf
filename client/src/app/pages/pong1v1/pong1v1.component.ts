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
import { NavigationEnd, Router } from "@angular/router";
@Component({
  selector: "app-pong1v1",
  templateUrl: "./pong1v1.component.html",
  styleUrls: ["./pong1v1.component.scss"],
})
export class Pong1v1Component implements OnInit {
  @ViewChild("PongCanvas") canvasElement: ElementRef;
  public activeUsername = "Unknown";
  public gamePaused: boolean = false;
  public gameisPVM: boolean = false;
  public width: number = 800;
  public height: number = 600;
  public lastScore: number = 0;
  private context: CanvasRenderingContext2D;
  private pongGame: PongGame;
  private ticksPerSecond: number = 144;
  public bestScore = 0;
  public authorLastScore = "Clavier";
  public authorBestScore = "Clavier";

  mySubscription: any;
  private controlState: ControlState;
  private controlEnnemiState: ControlState;

  constructor(
    private readonly sharedService: SharedService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    this.pongGame = new PongGame(this.height, this.width);
    this.controlState = { upPressed: false, downPressed: false };
    this.controlEnnemiState = { upPressed: false, downPressed: false };

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  @HostListener("document:keydown", ["$event"])
  onKeyDownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.sharedService.onKeyDownHandler(event);
    }
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

  getLastScore() {
    return localStorage.getItem("lastScore");
  }
  getBestScore() {
    return localStorage.getItem("bestScore");
  }
  getAuthorLastScore() {
    return localStorage.getItem("authorLastScore");
  }
  getAuthorBestScore() {
    return localStorage.getItem("authorBestScore");
  }
  renderFrame(): void {
    if (!this.gamePaused) {
      // Only run if game still going
      if (this.pongGame.gameOver()) {
        this.context.font = "30px Arial ";
        this.sharedService.activeUser = this.activeUsername;
        if (this.getEnnemiScore() > this.getPlayerScore()) {
          this.lastScore = this.getEnnemiScore();
          localStorage.setItem("lastScore", this.lastScore.toString());
          this.authorLastScore = "Souris";
          localStorage.setItem("authorLastScore", this.authorLastScore);
        } else {
          this.lastScore = this.getPlayerScore();
          localStorage.setItem("lastScore", this.lastScore.toString());
          this.authorLastScore = "Clavier";
          localStorage.setItem("authorLastScore", this.authorLastScore);
        }

        this.bestScore = Number(this.getBestScore());
        if (this.lastScore > this.bestScore) {
          this.bestScore = this.lastScore;
          localStorage.setItem("bestScore", this.bestScore.toString());
          this.authorBestScore = this.authorLastScore;
          localStorage.setItem("authorBestScore", this.authorBestScore);
        }

        if (this.getPlayerScore() >= this.getEnnemiScore()) {
          this.context.fillText(
            "YOU WIN ! Your score : " + this.getPlayerScore(),
            50,
            50
          );
        } else {
          this.context.fillText("Game Over!", 50, 50);
        }

        setTimeout(() => location.reload(), 80);
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
    }
    if (event.keyCode == Controls.Down) {
      this.controlState.downPressed = true;
    }
  }

  @HostListener("window:keyup", ["$event"])
  keyDown(event: KeyboardEvent) {
    if (event.keyCode == Controls.Up) {
      this.controlState.upPressed = false;
    }
    if (event.keyCode == Controls.Down) {
      this.controlState.downPressed = false;
    }
  }

  buttonUp() {
    this.controlState.upPressed = true;
    this.controlState.downPressed = false;
  }
  buttonDown() {
    this.controlState.upPressed = false;
    this.controlState.downPressed = true;
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
