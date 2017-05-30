
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
  console.log("Generated a " + (this.endX +1)  + " X " + (this.endY +1) + " Planet Map.");
}

//Initializes a default map with a size of 10x10. Can be changed by world("new map", x) where x is the new map size.
var planetMap = new map(10);

//Output text value
function updateOutput(outputValue) {
document.getElementById("outputText").innerHTML=(outputValue);
}
//Input Text field
function getInput() {
return UserInput = document.getElementById("inputBox").value;
}
/*Optionally generates random obstacle(s) that Rover(s) may encounter and report.
Written such that the obstacles' locations aren't known so that the rovers cannot be hardcoded to avoid them.*/
function generateObstacles(count) {
  numberGenerator = function(max) {
    floatOut = Math.random() * ((max+1) - 1) + 1;
    rounded = Math.floor(floatOut);
    return rounded;
  }
    updateOutput("Generated " + count + " obstacles.");

    //Used to prevent overwriting pre-existing values for rovers and other obstacles in the obstacleLocations list.
    var preExisting = tokenLocations.length;

    for (var n = 0; n < count; n++) {
      obstacleX = numberGenerator(planetMap.endX);
      obstacleY = numberGenerator(planetMap.endY);
      tokenLocations.push(new GenerateToken(obstacleX, obstacleY, "obstacle", -1));

    }
  }
  //End of obstacle Generator.

  //Holds dynamically generated obstacles/rovers and their x,y values.
  function GenerateToken (x, y, type, id) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.id = id;
  }

  var tokenLocations = [];
  var roverCount = 0;


//Start of Rover Constructor Block
 function rover(roverName, posX, posY, direction) {
  var orientation = 0;
  this.posX = posX;
  this.posY = posY;

  //Arbitrary 'geolocator' for each rover.
  this.roverID = roverCount;
  this.direction = direction;
  this.currentFacing = "N";
  tokenLocations.push(new GenerateToken(this.posX, this.posY, "rover", this.roverID)); // should only be processed at rover generation.
  this.refreshLocation = function() {
    tokenLocations[this.roverID].x = this.posX;
    tokenLocations[this.roverID].y = this.posY;
    if (this.direction == "N") {
      this.currentFacing = "N";
    }
    else if (this.direction == "E") {
      this.currentFacing = "E";
    }
    else if (this.direction == "S") {
      this.currentFacing = "S";
    }
    else if (this.direction == "W") {
      this.currentFacing = "W";
    }
    else {
      console.log("refreshLocation not evaluating direction cases. (This should not normally be seen.)");
    }
  };
  //end geolocator

  //runs at object generation to add each rover into tokenLocations list.
  this.refreshLocation();
  roverCount++;

  this.roverName = roverName;

  /*OLD!!!*/ this.coastIsClear = function(movementDirection) {
    // ***!!! CHECK BELOW THIS AREA AND FIX TO USE NEW ROVER AND OBSTACLE TOKENS TO SCAN FOR OBSTRUCTIONS RATHER THAN READING FROM A STRING USING PARSEINT. !!!***

    var scannedRovers = 0;
    var scannedObstacles = 0;

    //Identifies and reports what types of possible obstructions exist on the map.
    for (var i = 0; i < tokenLocations.length; i++) {
      var scannedId = tokenLocations[i].type;
      if (scannedId == "obstacle") {
        scannedObstacles++;
      }
      else {
        scannedRovers++;
      }
    }
    /*for debugging obstacle and rover scanning.
     *console.log(scannedObstacles + " potential obstacles and " + (scannedRovers - 1) + " other rovers detected.");
     */

      for (z = 0; z < tokenLocations.length; z++) {
        var output = false;
        var currenScanX = tokenLocations[z].x;
        var currenScanY = tokenLocations[z].y;
        var currentType = tokenLocations[z].type;

        if (movementDirection == "F") {
          if ((this.direction == "E" && (currenScanY !== this.posY))
          || ((this.direction == "E" && currenScanY == this.posY) && (this.posX+1 !== currenScanX))) {
            if ((this.direction == "E" && (currenScanY == this.posY)) && ((this.posX == planetMap.endX) && currenScanX == planetMap.startX)) {
              switch (currentType) {
                case "obstacle":
                foundObstacles.push(new GenerateToken(currenScanX, currenScanY));
                updateOutput(this.roverName + " Reports: 'Obstacle encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
                break;

                case "rover":
                updateOutput(this.roverName + " Reports: 'Rover encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
                break;

                default:
                break;
              }
              output = false;
              break;
            }
            else{
              output = true;
            }
        }
          else if ((this.direction == "W" && (currenScanY !== this.posY))
              || ((this.direction == "W" && (currenScanY == this.posY)) && (this.posX-1 !== currenScanX))) {
                if ((this.direction == "W" && (currenScanY == this.posY)) && ((this.posX == planetMap.startX) && currenScanX == planetMap.endX)) {
                  switch (currentType) {
                    case "obstacle":
                    foundObstacles.push(new GenerateToken(currenScanX, currenScanY));
                    updateOutput(this.roverName + " Reports: 'Obstacle encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
                    break;

                    case "rover":
                    updateOutput(this.roverName + " Reports: 'Rover encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
                    break;

                    default:
                    break;
                  }
                  output = false;
                  break;
                }
                else{
                  output = true;
                }
        }
          else if ((this.direction == "N" && (currenScanX !== this.posX))
              || ((this.direction == "N" && (currenScanX == this.posX)) && (this.posY-1 !== currenScanY))) {
                if ((this.direction == "N" && (currenScanX == this.posX)) && ((this.posY == planetMap.startY) && currenScanY == planetMap.endY)) {
                  switch (currentType) {
                    case "obstacle":
                    foundObstacles.push(new GenerateToken(currenScanX, currenScanY));
                    updateOutput(this.roverName + " Reports: 'Obstacle encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
                    break;

                    case "rover":
                    updateOutput(this.roverName + " Reports: 'Rover encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
                    break;

                    default:
                    break;
                  }
                  output = false;
                  break;
                }
                else{
                  output = true;
                }
        }
          else if ((this.direction == "S" && (currenScanX !== this.posX))
              || ((this.direction == "S" && (currenScanX == this.posX)) && (this.posY+1 !== currenScanY))) {
                if ((this.direction == "S" && (currenScanX == this.posX)) && ((this.posY == planetMap.endY) && currenScanY == planetMap.startY)) {
                  switch (currentType) {
                    case "obstacle":
                    foundObstacles.push(new GenerateToken(currenScanX, currenScanY));
                    updateOutput(this.roverName + " Reports: 'Obstacle encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
                    break;

                    case "rover":
                    updateOutput(this.roverName + " Reports: 'Rover encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
                    break;

                    default:
                    break;
                  }
                  output = false;
                  break;
                }
                else{
                  output = true;
                }
        }
        else {
          switch (currentType) {
            case "obstacle":
            foundObstacles.push(new GenerateToken(currenScanX, currenScanY));
            updateOutput(this.roverName + " Reports: 'Obstacle encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
            break;

            case "rover":
            updateOutput(this.roverName + " Reports: 'Rover encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
            break;

            default:
            break;
          }
          output = false;//
          break;
        }
      }
      else if (movementDirection == "B") {
        if ((this.direction == "E" && (currenScanY !== this.posY))
        || ((this.direction == "E" && (currenScanY == this.posY)) && (this.posX-1 !== currenScanX))) {
      output = true;
      }
        else if ((this.direction == "W" && (currenScanY !== this.posY))
            || ((this.direction == "W" && (currenScanY == this.posY)) && (this.posX+1 !== currenScanX))) {
      updateOutput(this.roverName + " Reports: Coast is clear... moving due East.");
      output = true;
      }
        else if ((this.direction == "N" && (currenScanX !== this.posX))
            || ((this.direction == "N" && (currenScanX == this.posX)) && (this.posY+1 !== currenScanY))) {
      output = true;
      }
        else if ((this.direction == "S" && (currenScanX !== this.posX))
            || ((this.direction == "S" && (currenScanX == this.posX)) && (this.posY-1 !== currenScanY))) {
      output = true;
      }
      else {
        switch (currentType) {
          case "obstacle":
          foundObstacles.push(new GenerateToken(currenScanX, currenScanY));
          updateOutput(this.roverName + " Reports: 'Obstacle encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
          break;

          case "rover":
          updateOutput(this.roverName + " Reports: 'Rover encountered at grid location " + currenScanX + ", " + currenScanY + ". Cannot proceed.'");
          break;

          default:
          break;
        }
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
      updateOutput(statusOutput);
  };

  this.turn = function(turn, tick) {
    for (i = 0; i < tick; i++) {
    if (turn == "R") {
      updateOutput(this.roverName + " is Turning right.");
      orientation +=1;
    }
    else if (turn == "L") {
      updateOutput(this.roverName + " is Turning left.");
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
  this.refreshLocation();
  this.queryStatus();
  };

  this.move = function(command, tick) {

  for (i = 0; i < tick; i++) {
    //Evaluates for work area edges, obstacles, and other rovers, then proceeds to process command that moves rover due south.
    if ((this.posY !== planetMap.endY && command == "B") && (this.direction == "N" && this.coastIsClear("B"))
    || (this.posY !== planetMap.endY && command == "F") && (this.direction == "S" && this.coastIsClear("F"))) {

      this.posY += 1;
      updateOutput(this.roverName + "Reports: Coast is clear... moving due South.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Enables wrap around on Y axis to top of grid.
    else if ((this.posY >= planetMap.endY && command == "B") && (this.direction == "N" && this.coastIsClear("B"))
        || ((this.posY >= planetMap.endY && command == "F") && (this.direction == "S" && this.coastIsClear("F")))) {

      this.posY = planetMap.startY;
      updateOutput(this.roverName + "Reports: Coast is clear... moving due South.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Evaluates for work area edges, obstacles, and other rovers, then proceeds to process command that moves rover due north.
    else if ((this.posY !== planetMap.startY && command == "F") && (this.direction == "N" && this.coastIsClear("F"))
        || (this.posY !== planetMap.startY && command == "B") && (this.direction == "S" && this.coastIsClear("B"))) {

      this.posY -= 1;
      updateOutput(this.roverName + "Reports: Coast is clear... moving due North.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Enables wrap around on Y axis to bottom of grid.
    else if ((this.posY <= planetMap.startY && command == "F") && (this.direction == "N" && this.coastIsClear("F"))
        || ((this.posY <= planetMap.startY && command == "B") && (this.direction == "S" && this.coastIsClear("B")))) {

      this.posY = planetMap.endY;
      updateOutput(this.roverName + " Reports: Coast is clear... moving due North.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Evaluates for work area edges, obstacles, and other rovers, then proceeds to process command that moves rover due east.
    else if ((this.posX !== planetMap.endX && command == "B") && (this.direction == "W" && this.coastIsClear("B"))
          || (this.posX !== planetMap.endX && command == "F") && (this.direction == "E" && this.coastIsClear("F"))) {

      this.posX += 1;
      updateOutput(this.roverName + " Reports: Coast is clear... moving due East.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Enables wrap around on X axis to left of grid.
    else if ((this.posX >= planetMap.endX && command == "B") && (this.direction == "W" && this.coastIsClear("B"))
        || ((this.posX >= planetMap.endX && command == "F") && (this.direction == "E" && this.coastIsClear("F")))) {

      this.posX = planetMap.startX;
      updateOutput(this.roverName + " Reports: Coast is clear... moving due East.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Evaluates for work area edges, obstacles, and other rovers, then proceeds to process command that moves rover due west.
    else if ((this.posX !== planetMap.startX && command == "F") && (this.direction == "W" && this.coastIsClear("F"))
          || (this.posX !== planetMap.startX && command == "B") && (this.direction == "E" && this.coastIsClear("B"))) {

      this.posX -= 1;
      updateOutput(this.roverName + " Reports: Coast is clear... moving due West.");
      this.refreshLocation();
      this.queryStatus();
    }
    //Enables wrap around on X axis to right of grid.
    else if ((this.posX <= planetMap.startX && command == "F") && (this.direction == "W" && this.coastIsClear("F"))
        || ((this.posX <= planetMap.startX && command == "B") && (this.direction == "E" && this.coastIsClear("B")))) {

      this.posX = planetMap.endX;
      updateOutput(this.roverName + " Reports: Coast is clear... moving due West.");
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
  this.draw = function() {
    if (this.currentFacing == "N" && (targetID !== this.roverID)) {
    pen.drawImage(roverSpriteArray[this.roverID][0], (this.posX * scaleFactorX), (this.posY * scaleFactorY), scaleFactorX, scaleFactorY);
    }
    else if (this.currentFacing == "E" && (targetID !== this.roverID)) {
    pen.drawImage(roverSpriteArray[this.roverID][1], (this.posX * scaleFactorX), (this.posY * scaleFactorY), scaleFactorX, scaleFactorY);
    }
    else if (this.currentFacing == "S" && (targetID !== this.roverID)) {
    pen.drawImage(roverSpriteArray[this.roverID][2], (this.posX * scaleFactorX), (this.posY * scaleFactorY), scaleFactorX, scaleFactorY);
    }
    else if (this.currentFacing == "W" && (targetID !== this.roverID)) {
    pen.drawImage(roverSpriteArray[this.roverID][3], (this.posX * scaleFactorX), (this.posY * scaleFactorY), scaleFactorX, scaleFactorY);
    }
    else if (this.currentFacing == "N" && (targetID == this.roverID)) {
    pen.drawImage(roverSpriteArray[this.roverID][4], (this.posX * scaleFactorX), (this.posY * scaleFactorY), scaleFactorX, scaleFactorY);
    }
    else if (this.currentFacing == "E" && (targetID == this.roverID)) {
    pen.drawImage(roverSpriteArray[this.roverID][5], (this.posX * scaleFactorX), (this.posY * scaleFactorY), scaleFactorX, scaleFactorY);
    }
    else if (this.currentFacing == "S" && (targetID == this.roverID)) {
    pen.drawImage(roverSpriteArray[this.roverID][6], (this.posX * scaleFactorX), (this.posY * scaleFactorY), scaleFactorX, scaleFactorY);
    }
    else if (this.currentFacing == "W" && (targetID == this.roverID)) {
    pen.drawImage(roverSpriteArray[this.roverID][7], (this.posX * scaleFactorX), (this.posY * scaleFactorY), scaleFactorX, scaleFactorY);
    }
    else {
      console.log("Sprite image read error.");
    }
    this.refreshLocation();
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
      planetMap = new map(getInput());
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
  console.log("What you're reading.");
}
