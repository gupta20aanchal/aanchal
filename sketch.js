let time = 0;
let path = [];

let x = [];
let y = [];
let fourierX;
let fourierY;

function setup() {
  createCanvas(800, 800);

  // for (let a = 0; a < TWO_PI * 2; a += 0.05) {
  //   let x = map(a, 0, TWO_PI * 2, -100, 100);
  //   let r = 150;
  //   drawing.push(createVector(x, r * noise(a) - r / 2));
  // }

  const skip = 8;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(drawing[i].x);
  }
  for (let i = 0; i < drawing.length; i += skip) {
    y.push(drawing[i].y);
  }
  fourierX = fourierT(x);
  fourierY = fourierT(y);
  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
  // fourierX.sort((a, b) => a.amp - b.amp);
  // fourierY.sort((a, b) => a.amp - b.amp);
}

function drawFourier(cx, cy, rotation, fourier) {
  let x = cx;
  let y = cy;

  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let radius = fourier[i].amp;
    let angle = fourier[i].phase + time * fourier[i].freq + rotation;
    x += radius * cos(angle);
    y += radius * sin(angle);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    stroke(255);
    line(prevx, prevy, x, y);
    //ellipse(x, y, 8);
  }
  return createVector(x, y);
}

function draw() {
  background(0);
  let vx = drawFourier(width / 2 + 50, 100, 0, fourierX);
  let vy = drawFourier(150, height / 2, HALF_PI, fourierY);
  path.push(createVector(vx.x, vy.y));
  stroke(255, 150);
  ellipse(x, y, 16, 16);
  line(vx.x, vx.y, vx.x, vy.y);
  line(vy.x, vy.y, vx.x, vy.y);

  stroke(255);
  beginShape();
  noFill();
  for (let v of path) {
    vertex(v.x, v.y);
  }
  endShape();
  time += TWO_PI / fourierY.length;
  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}
