
var pulsator = new TilePulsator(100,11);
var frequencyslider;
var shiftslider;
var xtoyratioslider;
function setup() {
	createCanvas(10000,1500);
	frequencyslider=createSlider(0.01,0.2,0.03,0,0.01);
	shiftslider=createSlider(0,10,0,1);
	xtoyratioslider=createSlider(0.3,0.7,0.5,0.0001);
}

function draw() {
	background(255)
	pulsator.draw();
	//pulsator.drawSineWave();
	pulsator.update();
	pulsator.deltachange = frequencyslider.value();
	pulsator.shift = shiftslider.value();
	pulsator.xtoyratio = xtoyratioslider.value();
}