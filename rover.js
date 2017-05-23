  //Creates entire surface area of Map.
function map(size) {
  gridX = [];
  gridY = [];

  for (i = 0; i < size; i++) {
    gridX[i] = i;
    gridY[i] = i;
  }

  this.startX = gridX[0];
  this.startY = gridY[0];
  this.endX = gridX.length - 1;
  this.endY = gridY.length - 1;
  console.log("Generating " + (this.endX +1)  + "X" + (this.endY +1) + " Planet Map.");
}

//Initializes a default map with a size of 10x10. Can be changed by world("new map", x) where x is the new map size.
var planetMap = new map(10);

  //Holds dynamically generated obstacles/rovers and their x,y values.
  var obstacleLocations = [];
  var roverCount = 0;

  /*Optionally generates random obstacle(s) that Rover(s) may encounter and report.
  Written such that the obstacles' locations aren't known so that the rovers cannot be hardcoded to avoid them.*/
  function generateObstacles(count) {
    numberGenerator = function(max) {
      var num ="";
      floatOut = Math.random() * ((max+1) - 1) + 1;
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
      obstacleCount = count;
      console.log("Generating " + obstacleCount + " obstacles.");

      //Used to prevent overwriting pre-existing values for rovers and other obstacles in the obstacleLocations list.
      var preExisting = obstacleLocations.length;

      for (n = 0; n < obstacleCount; n++) {
        obstacleX = numberGenerator(planetMap.endX);
        obstacleY = numberGenerator(planetMap.endY);
        var x = (n + preExisting);
        obstacleLocations[parseInt(x)] = obstacleX + obstacleY;

      }
    }
    //End of obstacle Generator.


//Start of Rover Constructor Block
 function rover(roverName, posX, posY, direction) {
  var orientation = 0;
  this.posX = posX;
  this.posY = posY;

  //Arbitrary 'geolocator' for each rover.
  this.roverID = roverCount;
  this.refreshLocation = function() {
    obstacleLocations[this.roverID] = this.posX + "" + this.posY;
  };
  //end geolocator

  //runs at object generation to add each rover into obstacle list.
  this.refreshLocation();
  roverCount++;


  this.roverName = roverName;
  this.direction = direction;
  this.coastIsClear = function(movementDirection) {

    var obstacles = obstacleLocations.length;

      for (z = 0; z < obstacles; z++) {
        console.log((obstacles - 1) + " potential obstacles detected.");
      var obstacleCoords = obstacleLocations[z];
      var currentObstacleX = parseInt(obstacleCoords[0]);
      var currentObstacleY = parseInt(obstacleCoords[1]);
      var output = false;

      //Uncomment for debugging obstacle and rover detection.
      //console.log("obstacleLocations: " + obstacleLocations + " current obstacle: " + "X:" + currentObstacleX + "Y:" + currentObstacleY);

        if (movementDirection == "F") {
          if ((this.direction == "E" && (currentObstacleY !== this.posY))
          || ((this.direction == "E" && (currentObstacleY == this.posY)) && (this.posX+1 !== currentObstacleX))) {
          output = true;
        }
          else if ((this.direction == "W" && (currentObstacleY !== this.posY))
              || ((this.direction == "W" && (currentObstacleY == this.posY)) && (this.posX-1 !== currentObstacleX))) {
          output = true;
        }
          else if ((this.direction == "N" && (currentObstacleX !== this.posX))
              || ((this.direction == "N" && (currentObstacleX == this.posX)) && (this.posY-1 !== currentObstacleY))) {
          output = true;
        }
          else if ((this.direction == "S" && (currentObstacleX !== this.posX))
              || ((this.direction == "S" && (currentObstacleX == this.posX)) && (this.posY+1 !== currentObstacleY))) {
          output = true;
        }
        else {
          console.log(this.roverName + " Reports: 'Obstacle or Rover encountered at grid location " + currentObstacleX + ", " + currentObstacleY + ". Cannot proceed.'");
          break;
        }
      }
        else if (movementDirection == "B") {
          if ((this.direction == "E" && (currentObstacleY !== this.posY))
          || ((this.direction == "E" && (currentObstacleY == this.posY)) && (this.posX-1 !== currentObstacleX))) {
        output = true;
        }
          else if ((this.direction == "W" && (currentObstacleY !== this.posY))
              || ((this.direction == "W" && (currentObstacleY == this.posY)) && (this.posX+1 !== currentObstacleX))) {
        console.log("Coast is clear... moving due East.");
        output = true;
        }
          else if ((this.direction == "N" && (currentObstacleX !== this.posX))
              || ((this.direction == "N" && (currentObstacleX == this.posX)) && (this.posY+1 !== currentObstacleY))) {
        output = true;
        }
          else if ((this.direction == "S" && (currentObstacleX !== this.posX))
              || ((this.direction == "S" && (currentObstacleX == this.posX)) && (this.posY-1 !== currentObstacleY))) {
        output = true;
        }
        else {
          console.log(this.roverName + " Reports: 'Obstacle or Rover encountered at grid location X:" + currentObstacleX + ", " + "Y:" + currentObstacleY + ". Cannot proceed.'");
          break;
        }
      }

        else {
          console.log("Invalid movement direction.");
          output = false;
        }

      }
      return output;
    };

  this.queryStatus = function() {
      var statusOutput = ("Name: " + this.roverName + " | " + "Direction: " + this.direction + " | " + "Position: " + this.posX + ", " + this.posY);
      console.log(statusOutput);
  };

  this.turn = function(turn, tick) {
    for (i = 0; i < tick; i++) {
    if (turn == "R") {
      console.log(this.roverName + " is Turning right.");
      orientation +=1;
    }
    else if (turn == "L") {
      console.log(this.roverName + " is Turning left.");
      orientation -=1;
    }
    else {
      break;
    }
    //Brings the orientation back into compass range.
    if (orientation == 4) {
      orientation = 0;
    }
    if (orientation == -1) {
      orientation = 3;
    }
  }
  //Converts numerical orientation to a corresponding compass value.
  switch(orientation) {
    case 0:
      this.direction = "N";
      break;
    case 1:
      this.direction = "E";
      break;
    case 2:
      this.direction = "S";
      break;
    case 3:
      this.direction = "W";
      break;
  }
  this.queryStatus();
  };

  this.move = function(command, tick) {

  for (i = 0; i < tick; i++) {
    //Evaluates for work area edges, obstacles, and other rovers, then proceeds to process command that moves rover due south.
    if ((this.posY !== planetMap.endY && command == "B") && (this.direction == "N" && this.coastIsClear("B"))
    || (this.posY !== planetMap.endY && command == "F") && (this.direction == "S" && this.coastIsClear("F"))) {

      this.posY += 1;
      console.log("Coast is clear... moving due South.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Enables wrap around on Y axis to top of grid.
    else if ((this.posY >= planetMap.endY && command == "B") && (this.direction == "N" && this.coastIsClear("B"))
        || ((this.posY >= planetMap.endY && command == "F") && (this.direction == "S" && this.coastIsClear("F")))) {

      this.posY = planetMap.startY;
      console.log("Coast is clear... moving due South.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Evaluates for work area edges, obstacles, and other rovers, then proceeds to process command that moves rover due north.
    else if ((this.posY !== planetMap.startY && command == "F") && (this.direction == "N" && this.coastIsClear("F"))
        || (this.posY !== planetMap.startY && command == "B") && (this.direction == "S" && this.coastIsClear("B"))) {

      this.posY -= 1;
      console.log("Coast is clear... moving due North.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Enables wrap around on Y axis to bottom of grid.
    else if ((this.posY <= planetMap.startY && command == "F") && (this.direction == "N" && this.coastIsClear("F"))
        || ((this.posY <= planetMap.startY && command == "B") && (this.direction == "S" && this.coastIsClear("B")))) {

      this.posY = planetMap.endY;
      console.log("Coast is clear... moving due North.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Evaluates for work area edges, obstacles, and other rovers, then proceeds to process command that moves rover due east.
    else if ((this.posX !== planetMap.endX && command == "B") && (this.direction == "W" && this.coastIsClear("B"))
          || (this.posX !== planetMap.endX && command == "F") && (this.direction == "E" && this.coastIsClear("F"))) {

      this.posX += 1;
      console.log("Coast is clear... moving due East.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Enables wrap around on X axis to left of grid.
    else if ((this.posX >= planetMap.endX && command == "B") && (this.direction == "W" && this.coastIsClear("B"))
        || ((this.posX >= planetMap.endX && command == "F") && (this.direction == "E" && this.coastIsClear("F")))) {

      this.posX = planetMap.startX;
      console.log("Coast is clear... moving due East.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Evaluates for work area edges, obstacles, and other rovers, then proceeds to process command that moves rover due west.
    else if ((this.posX !== planetMap.startX && command == "F") && (this.direction == "W" && this.coastIsClear("F"))
          || (this.posX !== planetMap.startX && command == "B") && (this.direction == "E" && this.coastIsClear("B"))) {

      this.posX -= 1;
      console.log("Coast is clear... moving due West.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Enables wrap around on X axis to right of grid.
    else if ((this.posX <= planetMap.startX && command == "F") && (this.direction == "W" && this.coastIsClear("F"))
        || ((this.posX <= planetMap.startX && command == "B") && (this.direction == "E" && this.coastIsClear("B")))) {

      this.posX = planetMap.endX;
      console.log("Coast is clear... moving due West.");
      this.refreshLocation();
      this.queryStatus();
    }
  }
};

  this.parseCommandSequence = function(sequence) {

  /*Breaks down each command and tick pair , unifies their formatting, converts string numbers to integers, then parses them before moving to next pair.
  All command strings would be multiples of 2 since they would be in pairs of command|tick.
  This function also ensures that this syntax is adhered to.*/

  commandCount = sequence.length / 2;

    currentCommand = sequence[0];
    command = currentCommand.toUpperCase();
    currentTick = sequence[1];
    tickValue = parseInt(currentTick);

  //Checks for syntax and command values.
    if (sequence.length % 2 === 0 && commandCount == 1) {
      if (command == "R") {
          this.turn("R", tickValue);
        }
        else if (command == "L") {
          this.turn("L", tickValue);
        }
        else if (command == "F") {
          this.move("F", tickValue);
        }
        else if (command == "B") {
          this.move("B", tickValue);
        }
        else {
          console.log("Please enter a valid command sequence. i.e. 'R2' or 'F3'.");
        }
    }
    else if (sequence.length % 2 === 0 && commandCount > 1) {
      for (n = 0; n <= commandCount; n += 2) {

        //transient values that only exist when command sequence involves more than one command.
        currentCommandM = sequence[n];
        currentTickM = sequence[n+1];
        commandM = currentCommandM.toUpperCase();
        tickValueM = parseInt(currentTickM);

        if (commandM == "R") {
         this.turn("R", tickValueM);
        }
        else if (commandM == "L") {
         this.turn("L", tickValueM);
        }
        else if (commandM == "F") {
         this.move("F", tickValueM);
        }
        else if (commandM == "B") {
         this.move("B", tickValueM);
        }
        else {
          console.log("Please enter a valid command sequence. i.e. 'R2' or 'F3'.");
        }
      }
    }
    else {
    console.log("Error: Improper command sequence formatting. Commands (R', 'L', 'F', or 'B') should be followed by a number of times to run each command.");
    }
  }
};
//end of Rover Constructor Block

var roverInventory = {
  0:0
};

function spawnRover() {
  var colorName = "";

    switch(roverCount) {
      case 0:
        colorName = "Red";
        break;

      case 1:
        colorName = "Blue";
        break;

      case 2:
        colorName = "Green";
        break;

      case 3:
        colorName = "Yellow";
        break;

      case 4:
        colorName = "Orange";
        break;

      case 5:
        colorName = "Pink";
        break;
    }
roverInventory[roverCount] = new rover(colorName + " Rover", roverCount, 0, "N");
console.log("New rover named " + (colorName + " Rover") + " spawned.");
console.log("Rovers on field: " + roverCount);
}

//Primary functions used to interact with world():environment and sendTo():rovers.
function world(command, count) {
    if (command == "spawn obstacle") {
      generateObstacles(count);
    }
    else if (command == "spawn rover") {
      if (roverCount < 5) {
        for (i = 0; i < count; i++) {
          spawnRover();
        }
      }
      else {
        console.log("Rover limit of 6 reached.");
      }
    }
    else if (command == "status") {
      if (roverCount == 0 && obstacleLocations.length == 0) {
        console.log("The world is completely barren.");
      }
      else if (roverCount !== 0){
        for (i = 0; i < roverCount; i++) {
          roverInventory[i].queryStatus();
        }
      }
      else if (roverCount === 0 && obstacleLocations.length !== 0) {
        console.log("There is nothing but a few random obstacles on the map.");
      }
    }
    else if (command == "new map") {
      planetMap = new map(count);
    }
    else {
      console.log("Invalid command entered. Type 'help()' for list of valid commands.");
    }
  }


function sendTo(name, command) {

  var input = name.toLowerCase();

  switch(input) {
    case "red rover":

      if (roverInventory[0].roverName == "Red Rover") {
        roverInventory[0].parseCommandSequence(command);
      }
      else {
        console.log("The rover you specified does not exist.");
      }
      break;

    case "blue rover":

      if (roverInventory[1].roverName == "Blue Rover") {
        roverInventory[1].parseCommandSequence(command);
      }
      else {
        console.log("The rover you specified does not exist.");
      }
      break;

    case "green rover":

      if (roverInventory[2].roverName == "Green Rover") {
        roverInventory[2].parseCommandSequence(command);
      }
      else {
        console.log("The rover you specified does not exist.");
      }
      break;

    case "yellow rover":

      if (roverInventory[3].roverName == "Yellow Rover") {
        roverInventory[3].parseCommandSequence(command);
      }
      else {
        console.log("The rover you specified does not exist.");
      }
      break;

    case "orange rover":

      if (roverInventory[4].roverName == "Orange Rover") {
        roverInventory[4].parseCommandSequence(command);
      }
      else {
        console.log("The rover you specified does not exist.");
      }
      break;

    case "pink rover":

      if (roverInventory[5].roverName == "Pink Rover") {
        roverInventory[5].parseCommandSequence(command);
      }
      else {
        console.log("The rover you specified does not exist.");
      }
      break;

    default:
    console.log("Invalid rover name entered.");
  }
}

console.log("Please Enter Command(s):");
console.log("Type 'help()' for list of commands and syntax.");

function help() {
  console.log("world(command, count):\n");
  console.log("command - world('status'): Reports the current status of the world map.");
  console.log("command - world('new map', x): Resizes the planet map to the size specified by x.");
  console.log("command - world('spawn obstacle', x): Generates x amount of obstacles on the world map.");
  console.log("command - world('spawn rover', x): Spawns x amount of rovers on world map to a maximum of 6.");
  console.log(" \n");
  console.log("sendTo(rover name, command):\n");
  console.log("e.g. - sendTo('red rover', 'R1F3'): Would tell Red Rover to turn right once and move forward 3 spaces.");
  console.log(" \n");
  console.log("help():\n");
  console.log("What you're reading. Git gud. JK.");
}
