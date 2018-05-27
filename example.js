// Global Variables
var p5Canvas;
var myName;
var testScores = [];
var ballXValues = [];
var ballYValues = [];
var ballXVelocities = [];
var ballYVelocities = [];
var ballXBaseVelocities = [];
var ballYBaseVelocities = [];
var lowest = 0;
var highest = 100;
var speedSlider, redCheckbox, orangeCheckbox, blueCheckbox, greenCheckbox;
var paused = false;

// initialize global variables in setup() function
function setup() {
  p5Canvas = createCanvas(800, 600);
  p5Canvas.parent("#p5-canvas");
  myName = select("#my-name");
  myName.html("Teacher");
  speedSlider = select("#speed-slider");
  speedSlider.input(updateSpeed);
  redCheckbox = select("#red-checkbox");
  orangeCheckbox = select("#orange-checkbox");
  blueCheckbox = select("#blue-checkbox");
  greenCheckbox = select("#green-checkbox");
  generateScores(lowest, highest, 30);
  printTestScores();
  generateBalls();
  updateSpeed();
}

function draw() {
  background(100, 0, 100);
  drawTestScores();
}

function updateSpeed() {
  if(speedSlider.value() === 0) {
    paused = true;
  }
  else {
    paused = false;
    for(var i = 0; i < testScores.length; i++) {
      if(ballXVelocities[i] < 0) {
        ballXVelocities[i] = Math.abs(ballXBaseVelocities[i] * (speedSlider.value() * 10) / 100) * -1;
      }
      else {
        ballXVelocities[i] = Math.abs(ballXBaseVelocities[i] * (speedSlider.value() * 10) / 100);
      }
      if(ballYVelocities[i] < 0) {
        ballYVelocities[i] = Math.abs(ballYBaseVelocities[i] * (speedSlider.value() * 10) / 100) * -1;
      }
      else {
        ballYVelocities[i] = Math.abs(ballYBaseVelocities[i] * (speedSlider.value() * 10) / 100);
      }
    }
  }
}

function generateScores(min, max, num) {
  while(num > 0) {
    var testScore = Math.round(random(min, max)); // rounded to nearest integer
    //var testScore = Math.round(random(min, max) * 100) / 100; // rounded to 2 decimal places
    testScores.push(testScore);
    num--;
  }
}

function generateBalls() {
  for(var i = 0; i < testScores.length; i++) {
    var radius = (testScores[i] + 50) / 2;
    ballXValues.push(random(radius, width - radius));
    ballYValues.push(random(radius, height - radius));
    ballXBaseVelocities.push(random(1, 5));
    if(random(1) >= 0.5) {
      ballXBaseVelocities[i] *= -1;
    }
    ballYBaseVelocities.push(random(1, 5));
    if(random(1) >= 0.5) {
      ballYBaseVelocities[i] *= -1;
    }
  }
}

function printTestScores() {
  for(var i = 0; i < testScores.length; i++) {
    console.log(testScores[i]);
  }
}

function drawTestScores() {
  for(var i = 0; i < testScores.length; i++) {
    if(testScores[i] <= 24) {
      color = "red";
    }
    else if(testScores[i] >= 25 && testScores[i] <= 49) {
      color = "orange";
    }
    else if(testScores[i] >= 50 && testScores[i] <= 74) {
      color = "blue"
    }
    else if(testScores[i] >= 75) {
      color = "green";
    }
    var diameter = testScores[i] + 50;
    var radius = diameter / 2;
    if(ballXValues[i] >= width - radius || ballXValues[i] <= 0 + radius) {
      ballXVelocities[i] *= -1;
    }
    if(ballYValues[i] >= height - radius || ballYValues[i] <= 0 + radius) {
      ballYVelocities[i] *= -1;
    }
    if(!paused) {
      ballXValues[i] += ballXVelocities[i];
      ballYValues[i] += ballYVelocities[i];
    }
    fill(color);
    if(color === "red" && redCheckbox.checked() ||
    color === "orange" && orangeCheckbox.checked() ||
    color === "blue" && blueCheckbox.checked() ||
    color === "green" && greenCheckbox.checked()) {
       ellipse(ballXValues[i], ballYValues[i], diameter, diameter);
       textSize(32);
       fill("white");
       textAlign(CENTER, CENTER);
       text(testScores[i], ballXValues[i], ballYValues[i]);
    }
  }
}
