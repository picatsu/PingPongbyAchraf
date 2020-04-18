import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html",
})
export class IconsComponent implements OnInit {
  //@ViewChild("PongCanvas") canvas: ElementRef;
  public GAME_SETTINGS = null;
  public INTERVAL = 10;
  public srcnode = "https://localhost:3000";
  urlSafe: SafeResourceUrl;
  private url = "http://localhost:" + 3000;
  private socket;
  private serverObjects = [];
  // public ctx = this.canvas.nativeElement.getContext("2d");

  constructor(public sanitizer: DomSanitizer) {
    //this.socket = io(this.url);
  }

  mainLoop() {}

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  /*
    setInterval(function () {
      this.mainLoop();
    }, this.INTERVAL);

    this.socket.on("connected", function (SERVER_GAME_SETTINGS) {
      this.GAME_SETTINGS = SERVER_GAME_SETTINGS;
      this.canvas.attr("width", this.GAME_SETTINGS.WIDTH);
      this.canvas.attr("height", this.GAME_SETTINGS.HEIGHT);
      document.body.appendChild(this.canvas);
      this.start.initialize();
    });
    this.socket.on("new user entered", function () {
      new Audio("/wav/notification001.wav").play();
    });
    this.socket.on("total user count updated", function (count) {
      window.document.title = this.GAME_SETTINGS.TITLE + " (" + count + ")";
    });

    this.socket.on("ready", function (position) {
      this.waiting.destroy();
      this.ready.initialize(position);
    });

    this.socket.on("playing", function (position) {
      this.ready.destroy();
      this.playing.initialize();
    });

    this.socket.on("update", function (statuses) {
      this.serverObjects = statuses;
    });

    this.socket.on("destroy", function (message) {
      this.ready.destroy();
      this.playing.destroy();
      this.backToTitle.initialize(message);
    });

    this.socket.on("playSound", function (sound) {
      new Audio("/wav/" + sound + ".wav").play();
    });
   
  }

  drawObjects(status) {
    switch (status.shape) {
      case "rectangle":
        this.drawRect(this.ctx, status.rect);
        break;
      case "circle":
        this.ctx.fillStyle = status.color;
        this.ctx.beginPath();
        this.ctx.arc(status.x, status.y, status.r, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        break;
      case "text":
        this.drawText(this.ctx, status.text);
        break;
    }
  }

  drawBackground(globalAlpha, color) {
    this.ctx.save();
    this.ctx.globalAlpha = globalAlpha !== undefined ? globalAlpha : 1;
    this.ctx.fillStyle = color ? color : this.GAME_SETTINGS.BACKGROUND_COLOR;
    this.ctx.fillRect(
      0,
      0,
      this.GAME_SETTINGS.WIDTH,
      this.GAME_SETTINGS.HEIGHT
    );
    this.ctx.restore();
  }

  drawBorder() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(
      0,
      0,
      this.GAME_SETTINGS.WIDTH,
      this.GAME_SETTINGS.BORDER_WIDTH
    );
    this.ctx.fillRect(
      0,
      this.GAME_SETTINGS.HEIGHT - this.GAME_SETTINGS.BORDER_WIDTH,
      this.GAME_SETTINGS.WIDTH,
      this.GAME_SETTINGS.BORDER_WIDTH
    );
  }

  drawNet() {
    var num = 10;
    var height = this.GAME_SETTINGS.HEIGHT / ((num + 1) * 2);
    var y = height / 2;
    var x = (this.GAME_SETTINGS.WIDTH - this.GAME_SETTINGS.NET.WIDTH) / 2;
    this.ctx.fillStyle = "#000000";
    while (y < this.GAME_SETTINGS.HEIGHT) {
      this.ctx.fillRect(x, y, this.GAME_SETTINGS.NET.WIDTH, height);
      y += height * 2;
    }
  }

///////////:: start
  start(){
    let start = this;
    this.start.opening = new Opening();
    this.start.button1 = new ButtonObject();
    this.start.button1.click = function(){
      start.toWaiting();
    };
    this.start.button1.update = function(){
      var text = this.data.text;
      var animation = this.data.animation;
      animation.count += animation.dir;
      if(animation.count <= 0 || animation.count >= animation.maxCount ){
        animation.dir *= -1;
      }
      text.globalAlpha = 0.2 + 0.7*(animation.count/100);
    };
    start.initialize = function(){
      start.opening.initialize(this.canvas,this.ctx,this.GAME_SETTINGS);
      start.button1.initialize(this.canvas,this.ctx,this.GAME_SETTINGS,{
        text:{
          x: undefined,
          y: 310,
          size: 30,
          font: "Arial",
          textBaseline: "middle",
          textAlign: "center",
          lineWidth: 2,
          message: "START GAME",
          color: {fill:undefined, stroke:undefined},
          colorData: {
            default: {fill:"#123456", stroke:undefined},
            mouseover: {fill:"#ddeeff", stroke:undefined}
          }
        },
        rect: {
          x: undefined,
          y: undefined,
          width: 230,
          height: 50,
          lineWidth: 2,
          color: {fill:undefined, stroke:undefined},
          colorData: {
            default: {fill:"#1099cc", stroke:"#223344"},
            mouseover: {fill:"#0686e0", stroke:"#223344"}
          }
        },
        animation: {
          maxCount: 100,
          count: 0,
          dir: 1,
        }
      });
      this.mainLoop = start.loop;
    };
    this.start.loop = function(){
      start.opening.update();
      start.button1.update();
      drawBackground();
      start.opening.draw();
      start.button1.draw();
    };
    this.start.destroy = function(){
      $(canvas).off();
      canvas.removeEventListener("touchstart",ButtonObject.prototype.events.touchstart);
      canvas.removeEventListener("touchmove",ButtonObject.prototype.events.touchmove);
      canvas.removeEventListener("touchend",ButtonObject.prototype.events.touchend);
    };
    this.start.toWaiting = function(){
      start.destroy();
      socket.emit('waiting');
      waiting.initialize();
    };
  }


//////////////// waiting 

  waiting(){
    var waiting = this;

    waiting.text1 = new TextObject();
    waiting.text1.update = function(){
      var text = this.data.text;
      var animation = this.data.animation;
      animation.count += animation.dir;
      if(animation.count <= 0 || animation.count >= animation.maxCount ){
        animation.dir *= -1;
      }
      text.globalAlpha = 0.2 + 0.7*(animation.count/100);
    };

    waiting.initialize = function(){
      waiting.text1.initialize(canvas,ctx,GAME_SETTINGS,{
        text:{
          x: undefined,
          y: undefined,
          size: 30,
          font: "Arial",
          textBaseline: "middle",
          textAlign: "center",
          lineWidth: 2,
          message: "WAITING FOR OPPONENT..",
          globalAlpha: undefined,
          color: {fill: undefined, stroke: undefined},
          colorData: {
            default: {fill: "#000000", stroke: undefined}
          }
        },
        animation: {
          maxCount: 100,
          count: 0,
          dir: 1,
        }
      });
      mainLoop = waiting.loop;
    };
    waiting.loop = function(){
      waiting.text1.update();
      drawBackground();
      waiting.text1.draw();
    };
    waiting.destroy = function(){
    }
  };


  //////////////// ready 

  
  ready(){
    var ready = this;
    ready.interval = null;

    ready.text1 = new TextObject();

    ready.text2 = new TextObject();

    ready.button1 = new ButtonObject();
    ready.button1.click = function(e){
      socket.emit('ready');
      ready.text2.data.text.message = "WAITING FOR OPPONENT TO BE READY";
      ready.button1.data = null;
    };
    ready.button1.update = function(){
      if(!this.data) return;
      var text = this.data.text;
      var animation = this.data.animation;
      animation.count += animation.dir;
      if(animation.count <= 0 || animation.count >= animation.maxCount ){
        animation.dir *= -1;
      }
      text.globalAlpha = 0.5 + 0.5*(animation.count/100);
    };

    ready.initialize = function(position){
      var xPos
      switch(position){
        case "left":
          message = "< YOU  "
          xPos = GAME_SETTINGS.WIDTH*1/4;
          break;
        case "right":
          message = "  YOU >"
          xPos = GAME_SETTINGS.WIDTH*3/4;
          break;
      }

      ready.text1.initialize(canvas,ctx,GAME_SETTINGS,{
        text:{
          x: xPos,
          y: undefined,
          size: 25,
          font: "Arial",
          textBaseline: "middle",
          textAlign: "center",
          lineWidth: 2,
          message: message,
          globalAlpha: undefined,
          color: {fill: undefined, stroke: undefined},
          colorData: {
            default: {fill: "#fc6e51", stroke: undefined}
          }
        }
      });
      ready.text2.initialize(canvas,ctx,GAME_SETTINGS,{
        text:{
          x: undefined,
          y: GAME_SETTINGS.HEIGHT-80,
          size: 20,
          font: "Arial",
          textBaseline: "middle",
          textAlign: "center",
          lineWidth: 5,
          message: "CLICK [READY] TO GET READY",
          globalAlpha: undefined,
          color: {fill: undefined, stroke: undefined},
          colorData: {
            default: {fill: "#434a54", stroke: "#FFFFFF"}
          }
        }
      });
      ready.button1.initialize(canvas,ctx,GAME_SETTINGS,{
        rect: {
          x: xPos,
          y: GAME_SETTINGS.HEIGHT/2+40,
          width: 150,
          height: 40,
          lineWidth: 2,
          color: {fill:undefined, stroke:undefined},
          colorData: {
            default: {fill:"#ffce54", stroke:undefined},
            mouseover: {fill:"#f6bb42", stroke:undefined}
          }
        },
        text:{
          x: xPos,
          y: GAME_SETTINGS.HEIGHT/2+40,
          size: 28,
          font: "Arial",
          textBaseline: "middle",
          textAlign: "center",
          lineWidth: undefined,
          message: "READY",
          color: {fill:undefined, stroke:undefined},
          colorData: {
            default: {fill:"#123456", stroke:undefined},
            mouseover: {fill:"#ffffff", stroke:undefined}
          }
        },
        animation: {
          maxCount: 100,
          count: 0,
          dir: 1,
        }
      });
      mainLoop = ready.loop;
    };
    ready.loop = function(){
      ready.button1.update();
      drawBackground();
      drawNet();
      drawBorder();
      serverObjects.forEach(drawObjects);
      ready.button1.draw();
      ready.text1.draw();
      ready.text2.draw();
    };
    ready.destroy = function(){
      $(canvas).off();
      canvas.removeEventListener("touchstart",ButtonObject.prototype.events.touchstart);
      canvas.removeEventListener("touchmove",ButtonObject.prototype.events.touchmove);
      canvas.removeEventListener("touchend",ButtonObject.prototype.events.touchend);
    };
  };

  ////////////// playing

  playing(){
    var playing = this;

    playing.events={};
    playing.events.canvas=function(e){
      var x = e.changedTouches[0].clientX-e.changedTouches[0].target.offsetLeft;
      var y = e.changedTouches[0].clientY-e.changedTouches[0].target.offsetTop;
      e.preventDefault();
      socket.emit('click', x, y);
    }
    playing.events.body=function(e){
      var canvasTop = canvas.offsetTop;
      var canvasBottom = canvas.offsetHeight+canvasTop;
      if(e.changedTouches[0].clientY>canvasTop && e.changedTouches[0].clientY<canvasBottom){
        e.preventDefault();
        var y = e.changedTouches[0].clientY-canvasTop;
        socket.emit('click', null, y);
      }
    }

    playing.initialize = function(){
      $('body').on('keydown', function(e){
        if(e.keyCode>=37 && e.keyCode<=40){
          e.preventDefault();
          socket.emit('keydown', e.keyCode);
        }
      });
      $('body').on('keyup', function(e){
        if(e.keyCode>=37 && e.keyCode<=40){
          e.preventDefault();
          socket.emit('keyup', e.keyCode);
        }
      });
      $('canvas').on('mousemove', function(e){
        e.preventDefault();
        socket.emit('mousemove', e.offsetX, e.offsetY);
      });
      $('canvas').on('click', function(e){
        e.preventDefault();
        socket.emit('click', e.offsetX, e.offsetY);
      });
      canvas.addEventListener("touchstart",playing.events.canvas);
      canvas.addEventListener("touchmove",playing.events.canvas);
      document.body.addEventListener("touchstart",playing.events.body);
      document.body.addEventListener("touchmove",playing.events.body);
      mainLoop = playing.loop;
    };
    playing.loop = function(){
      drawBackground();
      drawNet();
      drawBorder();
      serverObjects.forEach(drawObjects);
    };
    playing.destroy = function(){
      $('body').off();
      $('canvas').off();
      canvas.removeEventListener("touchstart",playing.events.canvas);
      canvas.removeEventListener("touchmove",playing.events.canvas);
      document.body.removeEventListener("touchstart",playing.events.body);
      document.body.removeEventListener("touchmove",playing.events.body);
    };
  };

  //////////////// back to life 

  backToTitle(){
    var backToTitle = this;
    backToTitle.interval = null;
    backToTitle.text1 = new TextObject();
    backToTitle.text1.update = function(){
      var text = this.data.text;
      var animation = this.data.animation;
      animation.count++;
      text.globalAlpha = 0.2 + 0.7*(animation.count/100);
    };
    backToTitle.text2 = new TextObject();
    backToTitle.text2.update = function(){
      var text = this.data.text;
      var animation = this.data.animation;
      if(animation.count == 0) text.color = undefined;
      animation.count++;
      if(animation.count == 101){
        text.color = text.colorData.default;
      }
      if(animation.count > 100) text.globalAlpha = ((animation.count-100)/150);
    };

    backToTitle.initialize = function(message){
      backToTitle.count =0;
      backToTitle.text1.initialize(canvas,ctx,GAME_SETTINGS,{
        text:{
          x: undefined,
          y: GAME_SETTINGS.HEIGHT/2-20,
          size: 32,
          font: "Arial",
          textBaseline: "middle",
          textAlign: "center",
          lineWidth: undefined,
          message: message?message:"OPPONENT LEFT!",
          globalAlpha: undefined,
          color: {fill: undefined, stroke: undefined},
          colorData: {default:{fill: "#000000", stroke: undefined}}
        },
        animation: {
          maxCount: 200,
          count: 0,
        }
      });
      backToTitle.text2.initialize(canvas,ctx,GAME_SETTINGS,{
        text:{
          x: undefined,
          y: GAME_SETTINGS.HEIGHT/2+20,
          size: 25,
          font: "Arial",
          textBaseline: "middle",
          textAlign: "center",
          lineWidth: undefined,
          message: "GOING BACK TO START..",
          globalAlpha: undefined,
          color: {fill: undefined, stroke: undefined},
          colorData: {default:{fill: "#000000", stroke: undefined}}
        },
        animation: {
          count: 0,
        }
      });
      mainLoop = backToTitle.loop;
    };
    backToTitle.loop = function(){
      backToTitle.text1.update();
      backToTitle.text2.update();
      backToTitle.update();
      backToTitle.draw();
      backToTitle.text1.draw();
      backToTitle.text2.draw();
    };
    backToTitle.count = undefined;
    backToTitle.imgData = undefined;
    backToTitle.update = function(){
      if(backToTitle.count == 0){
        drawBackground(0.8);
        backToTitle.imgData=ctx.getImageData(0,0,GAME_SETTINGS.WIDTH,GAME_SETTINGS.HEIGHT);
      }
      backToTitle.count++;
      if(backToTitle.count >= 300){
        backToTitle.destroy();
        start.initialize();
      }
    }
    backToTitle.draw = function(){
      ctx.putImageData(backToTitle.imgData,0,0);
    }
    backToTitle.destroy = function(){
    };
  };
  

  /////// PARTIE 2 
 pointSquareCollusionCheck(x,y,square){
    if(x >= square.x-square.width/2 && x <= square.x+square.width/2 && y >= square.y-square.height/2 && y <= square.y+square.height/2 )
      return true;
  }
  drawRect(ctx, rect){
    if(!rect.color) return;
    ctx.save();
    ctx.beginPath();
  
    ctx.globalAlpha = rect.globalAlpha!==undefined?rect.globalAlpha:1;
    if(rect.color.fill){
      ctx.fillStyle = rect.color.fill;
      ctx.fillRect(rect.x-rect.width/2,rect.y-rect.height/2,rect.width,rect.height);
    }
    if(rect.color.stroke){
      ctx.strokeStyle = rect.color.stroke;
      ctx.lineWidth = rect.lineWidth;
      ctx.rect(rect.x-rect.width/2,rect.y-rect.height/2,rect.width,rect.height);
      ctx.stroke();
    }
    ctx.restore();
  }
  drawText(ctx, text){
    if(!text.color) return;
    ctx.save();
    ctx.beginPath();
  
    ctx.font = text.size+"px "+text.font;
    ctx.textAlign = text.textAlign;
    ctx.textBaseline = text.textBaseline;
    ctx.globalAlpha = text.globalAlpha!==undefined?text.globalAlpha:1;
    if(text.color.stroke){
      ctx.strokeStyle = text.color.stroke;
      ctx.lineWidth = text.lineWidth;
      ctx.strokeText(text.message, text.x, text.y);
    }
    if(text.color.fill){
      ctx.fillStyle = text.color.fill;
      ctx.fillText(text.message, text.x, text.y);
    }
    ctx.restore();
  }
  clone (object){
}
*/
}
/*
export class TextObject {
  initialize = function(canvas,ctx,GAME_SETTINGS,data){
    this.canvas = canvas;
    this.ctx = ctx;
    this.GAME_SETTINGS = GAME_SETTINGS;
    this.data = data;
  
    var text = this.data.text;
    var animation = data.animation;
    text.x = text.x?text.x:GAME_SETTINGS.WIDTH/2;
    text.y = text.y?text.y:GAME_SETTINGS.HEIGHT/2;
    text.color = text.colorData.default;
  };

  draw = function(){
    if(!this.data) return;
    drawText(this.ctx, this.data.text);
  };
  update = function(){

  }

}

export class ButtonObject extends TextObject {
  constructor(){
    super();
  }

  initialize = function(canvas,ctx,GAME_SETTINGS,data){
    TextObject.prototype.initialize.call(this,canvas,ctx,GAME_SETTINGS,data);
    var rect = this.data.rect;
    var text = this.data.text;
    rect.x = rect.x?rect.x:text.x?text.x:GAME_SETTINGS.WIDTH/2;
    rect.y = rect.y?rect.y:text.y?text.y:GAME_SETTINGS.HEIGHT/2;
    rect.color = rect.colorData.default;
    if(this.setEvents) this.setEvents(canvas);
  };
  touchstart = function(e){
    e.preventDefault();
    buttonObject.mousemove(e);
  }
  touchmove = function(e){
    buttonObject.mousemove(e);
  }

  touchend = function(e){
    var x = e.changedTouches[0].clientX-e.changedTouches[0].target.offsetLeft;
    var y = e.changedTouches[0].clientY-e.changedTouches[0].target.offsetTop;
    var rect = buttonObject.data.rect;
    if(pointSquareCollusionCheck(x,y,rect)){
      buttonObject.click();
    }
  };

  setEvents = function(canvas){
    buttonObject = this;
    $(canvas).on("click",function(e){
      if (buttonObject.data) {
        var rect = buttonObject.data.rect;
        if(pointSquareCollusionCheck(e.offsetX, e.offsetY, rect)){
          buttonObject.click();
        }
      }
    });
    $(canvas).on("mousemove",function(e){
      buttonObject.mousemove(e);
    });
    canvas.addEventListener("touchstart",ButtonObject.prototype.events.touchstart);
    canvas.addEventListener("touchmove",ButtonObject.prototype.events.touchmove);
    canvas.addEventListener("touchend",ButtonObject.prototype.events.touchend);
  };

  mousemove = function(e){
    if(this.data){
      var x,y;
      if(e.type == "mousemove"){
        x = e.offsetX;
        y = e.offsetY;
      } else {
        x = e.changedTouches[0].clientX-e.changedTouches[0].target.offsetLeft;
        y = e.changedTouches[0].clientY-e.changedTouches[0].target.offsetTop;
      }
      var rect = this.data.rect;
      var text = this.data.text;
      var mouseover = pointSquareCollusionCheck(x, y, rect);
  
      rect.color = mouseover?rect.colorData.mouseover:rect.colorData.default;
      text.color = mouseover?text.colorData.mouseover:text.colorData.default;
    }
  };
  draw = function(){
    if(!this.data) return;
    drawRect(this.ctx, this.data.rect);
    TextObject.prototype.draw.call(this);
  };


}


export class Opening {
  initialize = function(canvas,ctx,GAME_SETTINGS){
    this.ctx = ctx;
    var titleSetting = [{
      x : GAME_SETTINGS.WIDTH/2,
      y : 100,
      size : 100,
      space : 100,
      lineWidth : 5,
      color : {fill:"#ED5566", stroke:"#000000"},
      text : "SMASH"
    }, {
      x : GAME_SETTINGS.WIDTH/2+150,
      y : 220,
      size : 60,
      space : 60,
      lineWidth : 5,
      color : {fill:"#128123", stroke:"#000000"},
      text : "PONG"
    }, {
      x : GAME_SETTINGS.WIDTH/2+217,
      y : 165,
      size : 12,
      space : 12,
      lineWidth : 5,
      color : {fill:"#000000"},
      text : "Ver. " + GAME_SETTINGS.VER
    }];
    this.title=[];
    for(var i=0; i<titleSetting.length; i++){
      this.title[i] = generateTitleText(titleSetting[i]);
    }
    this.count = -1;
    this.animationLayer = [];
  
    var opening = this;
    this.animationLayer[0] = [Hide(this.animationLayer[0], this.title[0], 0)];
    this.animationLayer[0].push(Down(this.animationLayer[0], this.title[0], 50, 500));
  
    this.animationLayer[1] = [Hide(this.animationLayer[1], this.title[1], 0)];
    this.animationLayer[1].push(Down(this.animationLayer[1], this.title[1], 150, 500));
  
    this.animationLayer[2] = [Hide(this.animationLayer[2], this.title[2], 0)];
    this.animationLayer[2].push(FadeIn(this.animationLayer[2], this.title[2], 250, 500));
  
    // Opening Functions
    function generateTitleText(title){
      var returnArray = [];
      var middleIndex = (title.text.length-1)/2;
      for(var i = 0 ; i < title.text.length ; i++){
        var text = new TextObject();
        var data = {
          x : title.x + title.space * (i-middleIndex),
          y : title.y,
          size: title.size,
          font: "'Press Start 2P'",
          textBaseline: "middle",
          textAlign: "center",
          lineWidth: title.lineWidth,
          message: title.text[i],
          color: {fill:undefined, stroke:undefined},
          colorData: {
            default: title.color
          }
        };
        text.initialize(canvas,ctx,GAME_SETTINGS,{
          text : data,
          default : data
        });
        returnArray.push(text);
      }
      return returnArray;
    }
  
    function Down(animationLayer, title, startCount, endCount){
      var actionData = [];
      return function closure(){
        if(opening.count == startCount){
          for(var i = 0 ; i < title.length ; i++){
            title[i].data.text = clone(title[i].data.default);
            title[i].data.text.y = title[i].data.text.y-40;
            title[i].data.text.globalAlpha = 0.0;
            actionData[i] = {startCount: startCount+i*15, speed: 1};
          }
        }
        if(opening.count >= startCount && opening.count < endCount ){
          for(var i = 0 ; i < title.length ; i++){
            if(opening.count >= actionData[i].startCount && title[i].data.text.y<title[i].data.default.y){
              actionData[i].speed = (title[i].data.default.y-title[i].data.text.y)/40+0.3;
              title[i].data.text.y = title[i].data.text.y+ actionData[i].speed;
              if(title[i].data.text.globalAlpha < 1){
                title[i].data.text.globalAlpha += 0.1;
              }else{
                title[i].data.text.globalAlpha += 1;
              };
            }
          }
        }
        if(endCount && opening.count == endCount){
          for(var i = 0 ; i < title.length ; i++){
            title[i].data.text = clone(title[i].data.default);
          }
          var index = animationLayer.indexOf(closure);
          animationLayer.splice(0,index+1);
        }
      }
    }
  
    function Hide(animationLayer, title, startCount, endCount){
      var data;
      return function closure(){
        if(opening.count == startCount){
          for(var i = 0 ; i < title.length ; i++){
            title[i].data.text = clone(title[i].data.default);
            title[i].data.text.globalAlpha=0;
          }
        }
        if(endCount && opening.count == endCount){
          for(var i = 0 ; i < title.length ; i++){
            title[i].data.text = clone(title[i].data.default);
          }
          var index = animationLayer.indexOf(closure);
          animationLayer.splice(0,index+1);
        }
      }
    }
  
    function FadeIn(animationLayer, title, startCount, endCount){
      var actionData = [];
      return function closure(){
        if(opening.count == startCount){
          for(var i = 0 ; i < title.length ; i++){
            title[i].data.text = clone(title[i].data.default);
            title[i].data.text.globalAlpha = 0.0;
            actionData[i] = {startCount: startCount+i*15, speed: 1};
          }
        }
        if(opening.count >= startCount && opening.count < endCount ){
          for(var i = 0 ; i < title.length ; i++){
            if(opening.count >= actionData[i].startCount){
  
              if(title[i].data.text.globalAlpha < 1){
                title[i].data.text.globalAlpha += 0.1;
              }else{
                title[i].data.text.globalAlpha += 1;
              };
            }
          }
        }
        if(endCount && opening.count == endCount){
          for(var i = 0 ; i < title.length ; i++){
            title[i].data.text = clone(title[i].data.default);
          }
          var index = animationLayer.indexOf(closure);
          animationLayer.splice(0,index+1);
        }
      }
    }
    this.drawOpeningBackground = (function(){
      ar bgWidth = 512;
    var bgHeight = 178;
    var xOffset = 0;
    var yOffset = 0;
    return function(){
      xOffset++;
      yOffset++;
      if(xOffset>bgWidth) xOffset = 0;
      if(yOffset>bgHeight) yOffset = 0;

      var backgroundPatten = document.createElement('canvas');
      backgroundPatten.width = bgWidth;
      backgroundPatten.height = bgHeight;

      var texture = new Image();
      texture.src = "img/background001.png";

      var PattenCtx = backgroundPatten.getContext("2d");
      PattenCtx.drawImage(texture,xOffset-bgWidth,yOffset-bgHeight);
      PattenCtx.drawImage(texture,xOffset-bgWidth,yOffset);
      PattenCtx.drawImage(texture,xOffset,yOffset-bgHeight);
      PattenCtx.drawImage(texture,xOffset,yOffset);

      var pat = ctx.createPattern(backgroundPatten,"repeat");

      ctx.save();
      ctx.fillStyle = pat;
      ctx.fillRect(0,0,GAME_SETTINGS.WIDTH,GAME_SETTINGS.HEIGHT);
      ctx.restore();
    }
  })();
  
  update = function(){
    var count = this.count++;
    this.animationLayer.forEach(function(animationLayer){
      animationLayer.forEach(function(action){
        action();
      });
    });
  }
  draw = function(){
    var ctx = this.ctx;
    this.drawOpeningBackground();
    this.title.forEach(function(title){
      title.forEach(function(char){
        drawText(ctx, char.data.text);
      });
    });
  }
  
}

*/
