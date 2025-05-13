/**
 * @typedef {Object} Shape
 * @property {'circle' | 'square' | 'triangle'} type
 * @property {number} moveX
 * @property {number} moveY
 * @property {number} size
 * @property {number} hue
 * @property {number} speed
 * @property {number} offset
 */

let shapes = [];
let myFont;

function preload() {
  myFont = loadFont('./fonts/BAUHS93.TTF'); // 加载字体
}

function setup() {
  createCanvas(595, 842, "svg"); // A4 尺寸，SVG 输出
  colorMode(HSB, 360, 100, 100);
  noStroke();
  textFont(myFont);

  for (let i = 0; i < 60; i++) {
    shapes.push({
      type: random(['circle', 'square', 'triangle']),
      moveX: random(width),
      moveY: random(height),
      size: random(100, 400),
      hue: random(360),
      speed: random(0.5, 1.5),
      offset: random(1000)
    });
  }
}

function draw() {
  clear();
  addDownloadButton()
  background("black");

  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    let t = frameCount * 0.02 * s.speed + s.offset;
    let x = s.moveX + sin(t) * 50;
    let y = s.moveY + cos(t * 1.5) * 50;

    fill(s.hue, 80, 90);

    if (s.type === 'circle') {
      ellipse(x, y, s.size);
    } else if (s.type === 'square') {
      rectMode(CENTER);
      rect(x, y, s.size, s.size);
    } else if (s.type === 'triangle') {
      let r = s.size / 2;
      push();
      translate(x, y);
      rotate(t);
      triangle(
        0, -r,
        -r * cos(PI / 6), r * sin(PI / 6),
        r * cos(PI / 6), r * sin(PI / 6)
      );
      pop();
    }
  }

  // 居中显示巨大 "M"
  fill(0, 0, 100); // 白色
  textAlign(CENTER, CENTER);
  textSize(900); // 超大字号
  text("E", width / 2, height / 2-100);
}
