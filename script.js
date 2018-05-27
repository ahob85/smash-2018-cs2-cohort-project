// Global Variables
var p5Canvas;
var myName;

// initialize global variables in setup() function
function setup() {
  p5Canvas = createCanvas(1000, 800);
  p5Canvas.parent("#p5-canvas");
  myName = select("#my-name");
  myName.html("[Your Name Here]");

function draw() {
  background(100, 0, 100);
}
