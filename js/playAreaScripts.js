// Business logic for PC movement\ Example

var myGamePiece;

function Component(width, height, color, x, y) {  // object with
  this.gamearea = myGameArea;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
      this.x += this.speedX;
    // this.y += this.speedY;
  }
}

function FallingObject(x = 0, y = 0) { // Construct for creating falling object. positions variable
  this.x = x;
  this.y = y;
  this.width = 30;
  this.height = 30;

  this.updateFall = function() {  // info for recreating object after screen clear (uses object's updated positions)
    ctx = myGameArea.context;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  this.myMove = function() {
  var yAxis = this.y
    if (yAxis <= 750) {
      yAxis += 4.75;
    } else {
      yAxis = 0;
      this.x = Math.floor(Math.random()*(1030 - 0 + 1)) + 0;
    }
    this.y = yAxis;
  }
}

function hitDetection() {

}

var animate;

function startGame() {  // makes pc as a Component piece
    myGameArea.start();
    myGamePiece = new Component(30, 50, "#0E6B28", 600, 670);
    animate = new FallingObject();
}



var myGameArea = { // makes canvas parameters. canvas is an html element that only takes images, and graphic from JavaScript.
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1080;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 16.67);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } // clears the canvas of old versions of objects (like where the pc was one key press ago)
}



function updateGameArea() { // draws the new position of the pc after removing ALL objects in canvas.
    myGameArea.clear();
    myGamePiece.speedX = 0;
    // myGamePiece.speedY = 0;

    animate.myMove();
    animate.updateFall();



    if (myGameArea.keys && myGameArea.keys[37] && myGamePiece.x>8) {  // ensures the game piece is within the limitations of the canvas border, creates an array of the keys that are pressed
      myGamePiece.speedX += -10;
     }

    if (myGameArea.keys && myGameArea.keys[39] && myGamePiece.x<1042) {
      myGamePiece.speedX += 10;
     }

    if (animate.x < myGamePiece.x + myGamePiece.width &&
        animate.x + animate.width > myGamePiece.x &&
        animate.y < myGamePiece.y + myGamePiece.height &&
        animate.y + animate.height > myGamePiece.y) {
          console.log("hit");
        }

    myGamePiece.newPos();
    myGamePiece.update();
}

$(document).ready(function() {

});
