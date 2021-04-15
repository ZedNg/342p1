let canvasWidth = 400
let canvasHeight = 400
let vanishX = 0.75 * canvasWidth;
let vanishY = 0.33 * canvasHeight;
let vanishR = 1.5 * canvasWidth;
let vanishL = -1.4 * canvasWidth;


function setup() {
  createCanvas(canvasWidth, canvasWidth);
}

function draw() {
  background(220);
  line(vanishL, vanishY, vanishR, vanishY);
  building(0.5*canvasWidth, 0.15*canvasHeight, 0.2*canvasHeight, 0.1*canvasWidth, 0.1*canvasWidth)
  building(0.2*canvasWidth, 0.2*canvasHeight, 0.4*canvasHeight, 0.1*canvasWidth, 0.1*canvasWidth)
  building(0.8*canvasWidth, 0.2*canvasHeight, 0.6*canvasHeight, 0.1*canvasWidth, 0.1*canvasWidth)

}


function building(x1, y1, bh, blw, brw) {
 noStroke()
 let x2 = x1 + blw
 let x3 = x2 + brw
 let x4 = 0
 let y2 = y1+bh
 let y3 = 0
 let y4 = 0
 let y5 = 0
 let y6 = 0
 let y7 = 0

   if (y1 < vanishY) {
    y3 = trigoOpp(vanishL, vanishY, x1, x2, y2) + vanishY
    y4 = vanishY - trigoOpp(vanishL, vanishY, x1, x2, y1)
    y5 = trigoOpp(vanishR, vanishY, x2, x3, y3) + vanishY
    y6 = vanishY - trigoOpp(vanishR, vanishY, x2, x3, y4)
  } else {
    y3 = trigoOpp(vanishL, vanishY, x1, x2, y2) + vanishY
    y4 = vanishY + trigoOpp(vanishL, vanishY, x1, x2, y1)
    y5 = trigoOpp(vanishR, vanishY, x2, x3, y3) + vanishY
    y6 = vanishY + trigoOpp(vanishR, vanishY, x2, x3, y4)
    x4 = x1+(dist(x2,y4,x3,y4))
    y7 = y1-(dist(x2,y4,x2,y6))
    quad(x1,y1,x2,y4,x3,y6,x4,y7)
  }

  // line(vanishL,vanishY,x2,y4);
  // line(vanishR,vanishY,x2,y4);
  // line(vanishL,vanishY,x2,y3);
  // line(vanishR,vanishY,x2,y3);
  quad(x1, y1, x1, y2, x2, y3, x2, y4)
  quad(x2, y4, x2, y3, x3, y5, x3, y6)
}

function trigoOpp(s, vy, ax, bx, by) {
  let adj1 = dist(s, vy, ax, vy)
  let hyp1 = dist(s, vy, ax, by)
  let angleA = acos(adj1 / hyp1)
  let adj2 = dist(s, vy, bx, vy)
  let opp = tan(angleA) * adj2
  return opp
}