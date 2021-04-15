//variables for vanishing points for 2-point perspective
let vanishX = 0.75 * canvasWidth; // X position of the building in the foreground
let vanishY = 0.33 * canvasHeight; // Vanishing Horizon
let vanishR = 1.1 * canvasWidth; // Right Vanishing point
let vanishL = -1.4 * canvasWidth; // Left Vanishing point

//variables for grid lines
const num_across =16;
const num_down =9;
let x_grid_locations = [];
let y_grid_locations = [];

//variables for GIFrecording
const frameMax = 300;
let recording = false;
let gifRecorder = null;
const buffersPerFrame = 1;

//variables for MouseDebugging
let doMouseDebugging = false;

//variables for array needed for animation
let anchors = [];

//variables for Cars
let carColorArray1 = ['#420306','#030742','#0d420d','#524303','#490352','#073b52','#07474a','#520325','#032452','#154f06'];
let carColorArray2 = ['#073b52','#174a07','#07474a','#524303','#520325','#032452','#154f06','#420306','#030742','#0d420d'];


//p5 Setup function
function setup () {
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');
  background(128);

  storeGridPoints();


}

//recording button function
function mousePressed() {
  if(recording == false) {
    recording = true;
    gifRecorder = new p5recorder(frameMax, "wallpaper.gif", 800, 0, buffersPerFrame);
  }
}

let global_frac = 0;

//p5 Draw loop function

function draw() {
  //variables for building colour interpolation
  let fromL = color('#291200');
  let toL = color('#23130c');
  let interAL = lerpColor(fromL, toL, 0.25);
  let interBL = lerpColor(fromL, toL, 0.5);
  let interCL = lerpColor(fromL, toL, 0.75);
  let fromR = color('#491f00');
  let toR = color('#331a0d');
  let interAR = lerpColor(fromR, toR, 0.25);
  let interBR = lerpColor(fromR, toR, 0.5);
  let interCR = lerpColor(fromR, toR, 0.75);

  //variables for recording
  let animation_max_frames = frameMax;
  if(recording) {
    animation_max_frames = frameMax * buffersPerFrame; 
  }

  let cur_frame = frameCount % animation_max_frames;
  let cur_frac = map(cur_frame, 0, animation_max_frames, 0, 1);

  print(cur_frame);

  //variables for recording
  if (doMouseDebugging) {
    cur_frac = mouseX / width;
    if (cur_frac < 0) {
      cur_frac = 0;
    }
    if (cur_frac > 1) {
      cur_frac = 1;
    }
  }

//Base Background colour
background("#170c0b");

//Moon
push()
translate(0.9*canvasWidth,0);
fill(255);
noStroke();
beginShape();
vertex((30/960)*canvasWidth, (20/540)*canvasHeight);
bezierVertex((80/960)*canvasWidth, (0/540)*canvasHeight, (80/960)*canvasWidth, (95/540)*canvasHeight, (20/960)*canvasWidth, (75/540)*canvasHeight);
bezierVertex((50/960)*canvasWidth, (80/540)*canvasHeight, (60/960)*canvasWidth, (25/540)*canvasHeight, (30/960)*canvasWidth, (20/540)*canvasHeight);
endShape();
pop();

global_frac = cur_frac;

  //Ground
  fill('#2E2E2E');
  rect(0,vanishY,canvasWidth,canvasHeight-vanishY);

  //Building from the left from back to front
  building(0.25*canvasWidth, 0.76*canvasHeight, 0.7*canvasHeight, 0.1*canvasWidth, 0.1*canvasWidth,28,5,9,fromL,fromR);
  building(0.08*canvasWidth, 0.81*canvasHeight, 0.7*canvasHeight, 0.125*canvasWidth, 0.1*canvasWidth,29,8,9,interBL,interBR);
  building(-0.12*canvasWidth, 0.93*canvasHeight, 0.7*canvasHeight, 0.1*canvasWidth, 0.2*canvasWidth,23,5,15,toL,toR);

//Road on the left
road(-0.02*canvasWidth,canvasHeight,0.27*canvasWidth,canvasHeight);

//Repeating cars on the roads for above road
for (let i=0; i <3; i++){
  car(0.25,4,10,0.3+i,-0.02*canvasWidth,0.27*canvasWidth,carColorArray1[i]);
}

for (let i=0; i <3; i++){
  car(3,4,10,0.5+i,-0.02*canvasWidth,0.27*canvasWidth,carColorArray2[i]);
}
//Building in the center from back to front
building(0.875*canvasWidth, 0.48*canvasHeight, 0.2*canvasHeight, 0.1*canvasWidth, 0.051*canvasWidth,23,7,9,fromL,fromR);
building(0.806*canvasWidth, 0.565*canvasHeight, 0.3*canvasHeight, 0.1*canvasWidth, 0.051*canvasWidth,25,8,7,fromL,fromR);
building(0.736*canvasWidth, 0.65*canvasHeight, 0.45*canvasHeight, 0.1*canvasWidth, 0.051*canvasWidth,25,5,9,interAL,interAR);
building(0.68*canvasWidth, 0.717*canvasHeight, 0.5*canvasHeight, 0.1*canvasWidth, 0.051*canvasWidth,21,7,12,interAL,interAR);
building(0.54*canvasWidth, 0.75*canvasHeight, 0.6*canvasHeight, 0.1*canvasWidth, 0.051*canvasWidth,25,9,9,interBL,interBR);
building(0.451*canvasWidth, 0.79*canvasHeight, 0.6*canvasHeight, 0.2*canvasWidth, 0.1*canvasWidth,22,8,9,interBL,interBR);
building(0.65*canvasWidth, 0.87*canvasHeight, 0.4*canvasHeight, 0.02*canvasWidth, 0.1*canvasWidth,15,5,12,interBL,interBR);
building(0.3*canvasWidth, 0.99*canvasHeight, 0.8*canvasHeight, 0.2*canvasWidth, 0.1*canvasWidth,29,12,12,interCL,interCR);
building(0.44*canvasWidth, 1.01*canvasHeight, 0.7*canvasHeight, 0.1*canvasWidth, 0.15*canvasWidth,27,6,15,interCL,interCR);
building(0.34*canvasWidth, 1.1*canvasHeight, 0.5*canvasHeight, 0.1*canvasWidth, 0.07*canvasWidth,23,7,6,toL,toR);

//Road on the right
road(0.62*canvasWidth,canvasHeight,0.87*canvasWidth,canvasHeight);

//Repeating cars on the roads for above road
for (let i=0; i <5; i++){
  car(0.25,4,10,0.5+i,0.62*canvasWidth,0.87*canvasWidth,carColorArray2[i]);
}

for (let i=0; i <3; i++){
  car(3.35,4,10,0.7+i,0.62*canvasWidth,0.87*canvasWidth,carColorArray1[i]);
}
//Building on the right
building(0.9*canvasWidth, 1.1*canvasHeight, 0.9*canvasHeight, 0.2*canvasWidth, 0.07*canvasWidth,25,5,9,toL,toR);


//Debugging

if (doMouseDebugging) {
  textSize(30);
  fill(0, 200, 0);
  text("Mouse Debugging: " + cur_frac.toFixed(2), 50, 50);
}

//Recording
if(recording) {
  gifRecorder.addBuffer();
}

}

/*
-----------------
Function to generate a single car. 
-----------------
roadLane is the division/ratio for the width(x position relative to the road) of the road
linePosVal is the lane position selected for the cars
lineDiv is the is the division/ratio for the length(y position relative to the road) of the road
carPos is the position of the car on the selected lane
roadA is the y position of the left corner of the road
roadB is the y position of the right corner of the road
carColor is the colour for the body of the car
*/
function car(linePosVal,roadLane,lineDiv,carPos,roadA,roadB,carColor){
  //car colour setting
  fill(carColor);

  //car stroke setting
  stroke(40);
  strokeWeight(0.0005*canvasWidth);

  //variables for different corners 
  let linePos = map(linePosVal,0,roadLane,roadA,roadB);
  let corner1x = map(carPos, 0, lineDiv, linePos,vanishR);
  let corner1y = map(carPos, 0, lineDiv, canvasHeight,vanishY);
  let corner2x = map(carPos+0.4, 0, lineDiv, linePos,vanishR);
  let corner2y = map(carPos+0.4, 0, lineDiv, canvasHeight,vanishY);
  let corner3x = corner2x +((30/540)*canvasHeight);
  let corner3y = map(carPos+0.4, 0, lineDiv, canvasHeight,vanishY);
  let corner4x = corner1x +((30/540)*canvasHeight);
  let corner4y = map(carPos, 0, lineDiv, canvasHeight,vanishY);
  let corner5x = map(carPos+0.12, 0, lineDiv, linePos,vanishR);
  let corner5y = map(carPos+0.12, 0, lineDiv, canvasHeight,vanishY);
  let corner6x = corner5x +((30/540)*canvasHeight);
  let corner6y = map(carPos+0.12, 0, lineDiv, canvasHeight,vanishY);

  let corner7x = map(carPos+0.11, 0, lineDiv, linePos,vanishR);
  let corner7y = map(carPos+0.11, 0, lineDiv, canvasHeight,vanishY);
  let corner8x = map(carPos+0.35, 0, lineDiv, linePos,vanishR);
  let corner8y = map(carPos+0.35, 0, lineDiv, canvasHeight,vanishY);

  let corner9x = corner7x +((30/540)*canvasHeight);
  let corner9y = map(carPos+0.11, 0, lineDiv, canvasHeight,vanishY);
  let corner10x = corner8x +((30/540)*canvasHeight);
  let corner10y = map(carPos+0.35, 0, lineDiv, canvasHeight,vanishY);

  //"Right" Wheel
  push();
  noStroke();
  fill(0);
  ellipse(corner7x, corner7y+((2/540)*canvasHeight), (10/540)*canvasHeight);
  pop();

//Body
quad(corner1x , corner1y , corner1x , corner1y-((10/540)*canvasHeight) , corner4x, corner1y-((10/540)*canvasHeight), corner4x, corner4y);
quad(corner4x, corner4y , corner4x, corner1y-((10/540)*canvasHeight), corner3x, corner3y-((10/540)*canvasHeight),corner3x, corner3y);
quad(corner1x , corner1y-((10/540)*canvasHeight) , corner5x , corner5y-((20/540)*canvasHeight), corner6x, corner6y-((20/540)*canvasHeight), corner4x, corner4y-((10/540)*canvasHeight));

//Window
push();
fill(0);
quad(corner5x , corner5y-((20 /540)*canvasHeight),corner5x+((2.5/960)*canvasWidth), corner5y-((30/540)*canvasHeight), corner6x+((2.5/960)*canvasWidth), corner6y-((30/540)*canvasHeight), corner6x, corner6y-((20/540)*canvasHeight));
pop();

//"Left" Wheels
quad(corner6x+((2.5/960)*canvasWidth), corner6y-((30/540)*canvasHeight),corner3x, corner3y-((10/540)*canvasHeight), corner4x, corner4y-((10/540)*canvasHeight),corner6x, corner6y-((20/540)*canvasHeight));
noStroke();
fill(0);
ellipse(corner9x, corner9y+((2/540)*canvasHeight), (10/540)*canvasHeight);
ellipse(corner10x, corner10y+((2/540)*canvasHeight), (10/540)*canvasHeight);
fill(200);
ellipse(corner9x, corner9y+((2/540)*canvasHeight), (3/540)*canvasHeight);
ellipse(corner10x, corner10y+((2/540)*canvasHeight), (3/540)*canvasHeight);

}

/*
-----------------
Function to generate a road. 
-----------------
The road is a triangle shape as the other corners converge at the vanishing point
roadWidthAX is the x position of the left corner of the road
roadWidthAY is the y position of the left corner of the road
roadWidthBX is the x position of the right corner of the road
roadWidthBY is the y position of the right corner of the road
*/
function road(roadWidthAX,roadWidthAY,roadWidthBX,roadWidthBY){
  fill('#1F1F1F');
  stroke(0);
  strokeWeight(0.0025*canvasWidth);
  triangle(vanishR,vanishY,roadWidthAX,roadWidthAY,roadWidthBX,roadWidthBY);
}

/*
-----------------
Function to generate a building. 
-----------------
x1 is the x position of the left bottom corner of the left face of the building
y2 is the y position of the left bottom corner of the left face of the building
bh is the height of the building
blw is the width of the left face of the building
brw is the width of the right face of the building
winRow is numbers of rows of windows on the building
winColL is numbers of columns of windows on the left face of the building
winColR is numbers of columns of windows on the right face of the building
buildingColor1 is the colour for the left face of the building
buildingColor2 is the colour for the right face of the building
*/
function building(x1, y2, bh, blw, brw,winRow,winColL,winColR,buildingColor1,buildingColor2) {
 stroke('#281600');
 strokeWeight(0.001*canvasWidth);
 let x2 = x1 + blw;
 let x3 = x2 + brw;
 let x4 = 0;
 let y1 = y2-bh;
 let y3 = 0;
 let y4 = 0;
 let y5 = 0;
 let y6 = 0;
 let y7 = 0;

 if (y1 < vanishY) {
  y3 = trigoOpp(vanishL,  x1, x2, y2) + vanishY;
  y4 = vanishY - trigoOpp(vanishL, x1, x2, y1);
  y5 = trigoOpp(vanishR,  x2, x3, y3) + vanishY;
  y6 = vanishY - trigoOpp(vanishR,  x2, x3, y4);
} else {
  y3 = trigoOpp(vanishL,  x1, x2, y2) + vanishY;
  y4 = vanishY + trigoOpp(vanishL,  x1, x2, y1);
  y5 = trigoOpp(vanishR,  x2, x3, y3) + vanishY;
  y6 = vanishY + trigoOpp(vanishR, x2, x3, y4);
  x4 = x1+(dist(x2,y4,x3,y4));
  y7 = y1-(dist(x2,y4,x2,y6));
  fill('#1F0D00');
  quad(x1,y1,x2,y4,x3,y6,x4,y7);
}

fill(buildingColor1);
quad(x1, y1, x1, y2, x2, y3, x2, y4);
fill(buildingColor2);
quad(x2, y4, x2, y3, x3, y5, x3, y6);

for (let j=0; j<winColL; j++) {
  for (let k=0; k<winColR; k++) {
    for (let i=0; i<winRow; i++) {

      let l_bottom_left_y = map((j*2)+1, 0, ((winColL*2)+1), y2, y3);
      let l_top_left_y = map((j*2)+1, 0, ((winColL*2)+1), y1, y4);
      let l_bottom_right_y = map((j*2)+2, 0, ((winColL*2)+1), y2, y3);
      let l_top_right_y = map((j*2)+2, 0, ((winColL*2)+1), y1, y4);

      let r_bottom_left_y = map((k*2)+1, 0, ((winColR*2)+1), y3, y5);
      let r_top_left_y = map((k*2)+1, 0, ((winColR*2)+1), y4, y6);
      let r_bottom_right_y = map((k*2)+2, 0, ((winColR*2)+1), y3, y5);
      let r_top_right_y = map((k*2)+2, 0, ((winColR*2)+1), y4, y6);

      let l_bottom1 = map((i*2)+1, 0, ((winRow*2)+1), l_bottom_left_y, l_top_left_y);
      let l_bottom2 = map((i*2)+1, 0, ((winRow*2)+1), l_bottom_right_y, l_top_right_y);
      let l_top1 = map((i*2)+2, 0, ((winRow*2)+1), l_bottom_left_y, l_top_left_y);
      let l_top2 = map((i*2)+2, 0, ((winRow*2)+1), l_bottom_right_y, l_top_right_y);
      let l_x1 = map((j*2)+1, 0, ((winColL*2)+1), x1, x2);
      let l_x2 = map((j*2)+2, 0, ((winColL*2)+1), x1, x2);

      let r_bottom1 = map((i*2)+1, 0, ((winRow*2)+1), r_bottom_left_y, r_top_left_y);
      let r_bottom2 = map((i*2)+1, 0, ((winRow*2)+1), r_bottom_right_y, r_top_right_y);
      let r_top1 = map((i*2)+2, 0, ((winRow*2)+1), r_bottom_left_y, r_top_left_y);
      let r_top2 = map((i*2)+2, 0, ((winRow*2)+1), r_bottom_right_y, r_top_right_y);
      let r_x1 = map((k*2)+1, 0, ((winColR*2)+1), x2, x3);
      let r_x2 = map((k*2)+2, 0, ((winColR*2)+1), x2, x3);

      let lightOn = getNoiseValue(j+k, i, global_frac, "light", 0, 100, 1);
      if(lightOn < 25) {
        fill("#e7d965");
      }
      else {
        fill("#1f1009");
      }
      stroke("#160c00")
      strokeWeight(0.00075*canvasWidth)
      quad(l_x1, l_top1, l_x1, l_bottom1, l_x2, l_bottom2, l_x2, l_top2);
      quad(r_x1, r_top1, r_x1, r_bottom1, r_x2, r_bottom2, r_x2, r_top2);
    }
  }
}

}

/*
Trigonometry caluation to figure out the y position of the next point. Required with the building function.
*/
function trigoOpp(s, ax, bx, by) {
  let adj1 = dist(s, vanishY, ax, vanishY);
  let hyp1 = dist(s, vanishY, ax, by);
  let angleA = acos(adj1 / hyp1);
  let adj2 = dist(s, vanishY, bx, vanishY);
  let opp = tan(angleA) * adj2;
  return opp
}

function grid() {
  strokeWeight(1);
  stroke("grey");

  for (let i=0; i < num_down; i++) {
    for (let j=0; j < num_across; j++) {
      let gx = x_grid_locations[j];
      let gy = y_grid_locations[i];
      line(vanishL,vanishY,vanishX, gy);
      line(vanishX,gy,vanishR,vanishY);

    }
  }
  stroke("red"); 
  line(vanishL, vanishY, vanishR, vanishY); 
}

function storeGridPoints() {
  for (let i = 0; i < num_across + 5; i++) {
    let x = map(i, 0, num_across, 0, canvasWidth);
    x_grid_locations[i] = x;
  }
  for (let i = 0; i < num_down + 5; i++) {
    let y = map(i, 0, num_down, 0, canvasHeight);
    y_grid_locations[i] = y;
  }  
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  if(key == 'm') {
    doMouseDebugging = !doMouseDebugging;
  }
}
