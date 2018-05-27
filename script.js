// Global Variables
var p5Canvas;
var myName;
var speedSlider, redCheckbox, orangeCheckbox, blueCheckbox, greenCheckbox;
var paused = false;

// initialize global variables in setup() function
function setup() {
  p5Canvas = createCanvas(800, 600);
  p5Canvas.parent("#p5-canvas");
  myName = select("#my-name");
  myName.html("[Your Name Here]");
  speedSlider = select("#speed-slider");
  speedSlider.input(updateSpeed);
  redCheckbox = select("#red-checkbox");
  orangeCheckbox = select("#orange-checkbox");
  blueCheckbox = select("#blue-checkbox");
  greenCheckbox = select("#green-checkbox");
}

function draw() {
  background(100, 0, 100);
}
