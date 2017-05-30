//Global instatiation of context. Also known as "ctx" commonly, but renamed as "pen" for clarity-sake.
var canvas = document.querySelector('canvas');
var pen = canvas.getContext('2d');

// Global variables that pass down the current width and height of the canvas to be used.
var animationX = canvas.width;
var animationY = canvas.height;

//Global variables that determine which Rover sprite is used based on the rover's direction.
  var roverSpriteArray = {
  //Red Rover sprites.
  0:[document.getElementById("redRover-n"),
      document.getElementById("redRover-e"),
      document.getElementById("redRover-s"),
      document.getElementById("redRover-w"),
      document.getElementById("redRover-n-selected"),
      document.getElementById("redRover-e-selected"),
      document.getElementById("redRover-s-selected"),
      document.getElementById("redRover-w-selected")],

  //Blue Rover sprites.
  1: [document.getElementById("blueRover-n"),
      document.getElementById("blueRover-e"),
      document.getElementById("blueRover-s"),
      document.getElementById("blueRover-w"),
      document.getElementById("blueRover-n-selected"),
      document.getElementById("blueRover-e-selected"),
      document.getElementById("blueRover-s-selected"),
      document.getElementById("blueRover-w-selected")],

  //Green Rover sprites.
  2: [document.getElementById("greenRover-n"),
      document.getElementById("greenRover-e"),
      document.getElementById("greenRover-s"),
      document.getElementById("greenRover-w"),
      document.getElementById("greenRover-n-selected"),
      document.getElementById("greenRover-e-selected"),
      document.getElementById("greenRover-s-selected"),
      document.getElementById("greenRover-w-selected")],

  //Yellow Rover sprites.
  3: [document.getElementById("yellowRover-n"),
      document.getElementById("yellowRover-e"),
      document.getElementById("yellowRover-s"),
      document.getElementById("yellowRover-w"),
      document.getElementById("yellowRover-n-selected"),
      document.getElementById("yellowRover-e-selected"),
      document.getElementById("yellowRover-s-selected"),
      document.getElementById("yellowRover-w-selected")],

  //Orange Rover sprites.
  4: [document.getElementById("orangeRover-n"),
      document.getElementById("orangeRover-e"),
      document.getElementById("orangeRover-s"),
      document.getElementById("orangeRover-w"),
      document.getElementById("orangeRover-n-selected"),
      document.getElementById("orangeRover-e-selected"),
      document.getElementById("orangeRover-s-selected"),
      document.getElementById("orangeRover-w-selected")],

  //Pink Rover sprites.
  5: [document.getElementById("pinkRover-n"),
      document.getElementById("pinkRover-e"),
      document.getElementById("pinkRover-s"),
      document.getElementById("pinkRover-w"),
      document.getElementById("pinkRover-n-selected"),
      document.getElementById("pinkRover-e-selected"),
      document.getElementById("pinkRover-s-selected"),
      document.getElementById("pinkRover-w-selected")]
};

//Current rover that commands are sent to via the "sendTo()" function in rover.js.
var targetRover = "red rover";
var targetID = 0;

//Rover selector to determine which rover is fed commands from the keypress event listener.
function select(roverNumber) {
  switch (roverNumber) {
    case 0:
      targetRover = "red rover";
      targetID = 0;
      break;

    case 1:
      targetRover = "blue rover";
      targetID = 1;
      break;

    case 2:
      targetRover = "green rover";
      targetID = 2;
      break;

    case 3:
      targetRover = "yellow rover";
      targetID = 3;
      break;

    case 4:
      targetRover = "orange rover";
      targetID = 4;
      break;

    case 5:
      targetRover = "pink rover";
      targetID = 5;
      break;
  }
}

// listens for any W, A, S, D commands and associates them with functions that issue commands to the selected rover to turn or move.
document.addEventListener('keydown', function(event) {
  //Rover Selection listener
  if (event.key == "1") {
    select(0);
    console.log(targetRover + " selected.");
    }
  else if (event.key == "2") {
    select(1);
    console.log(targetRover + " selected.");
    }
  else if (event.key == "3") {
    select(2);
    console.log(targetRover + " selected.");
    }
  else if (event.key == "4") {
    select(3);
    console.log(targetRover + " selected.");
    }
  else if (event.key == "5") {
    select(4);
    console.log(targetRover + " selected.");
    }
  else if (event.key == "6") {
    select(5);
    console.log(targetRover + " selected.");
    }

    //Command Listender
     if (event.key == "w") {
       sendTo(targetRover, 'F1');
       }
     else if (event.key == "s") {
       sendTo(targetRover, 'B1');
       }
     else if (event.key == "d") {
       sendTo(targetRover, 'R1');
     }
     else if (event.key == "a") {
       sendTo(targetRover, 'L1');
       }
  });



//Defines the token image used for representing obstacles.
var obstacleImage = document.getElementById("obstacleToken");

var obstacleX;
var obstacleY;
var foundObstacles = [];

  function numberGenerator(max) {
    var num ="";
    floatOut = Math.random() * ((max+0) - 0) + 0;
    stringOut = floatOut.toString();
    for (i = 0; i < stringOut.length; i++) {
      if (stringOut[i] == ".") {
        break;
      }
    temp = parseInt(stringOut[i]);
    num += temp;
    return num;
    }
  }


//Defines what size in pixels each grid unit is, based on overall map size.
var scaleFactorX = animationX / (planetMap.endX + 1);
var scaleFactorY = animationY / (planetMap.endY + 1);

function scaleRefresh() {
  //Ensures that each grid unit's pixel ratio is correct based on current map size.
  scaleFactorX = animationX / (planetMap.endX + 1);
  scaleFactorY = animationY / (planetMap.endY + 1);
}

      // Main animation loop
      function animate() {
        requestAnimationFrame(animate);
        pen.fillStyle="rgba(255, 255, 255, 0.3)"

        //Refreshes canvas on each cycle
        pen.clearRect(0, 0, animationX, animationY);

        //Draws out the grid lines based on current map size.
        for (var i = 0; i < animationX; i += scaleFactorX) {
        pen.fillRect(i-1, 0, 1, animationY);
      }
        for (var i = 0; i < animationY; i += scaleFactorY) {
        pen.fillRect(0, i-1, animationX, 1);
      }

        //Draws out the obstacle token image in each place where a rover discovers an obstacle.
        for (var i = 0; i < foundObstacles.length; i++) {
          pen.drawImage(obstacleImage, (foundObstacles[i].x * scaleFactorX), (foundObstacles[i].y * scaleFactorY), scaleFactorX, scaleFactorY);
        }

        //Draws each rover by reading from the sprite table.
        for (i = 0; i < roverCount; i++){
          roverInventory[i].draw();
        }

        scaleRefresh();
      }
      animate();
      //End of animation loop
