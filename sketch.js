const testo = "WTF";
const fontSize = 120;
const parti = 40;
const sfasamento = 4;

//

/** @type {Font} */
let font;

function preload() {
  font = loadFont("./fonts/Adobe-Jenson-Pro-Bold-Caption.ttf");
}

function setup() {
  createCanvas(400, 400, "svg");
  addDownloadButton();

  rectMode(CENTER);
  angleMode(DEGREES);

  noLoop(); // Opzionale
}

function draw() {
  clear(); // Non cancellare!

  textFont(font);
  textLeading(fontSize);
  textSize(fontSize);

  const text_width = textWidth(testo);
  const h_parti = fontSize / parti;

  noStroke();
  fill(0);

  for (let i = 0; i < parti; i++) {
    push();
    translate(text_width / 2, 0);
    translate(random(-sfasamento, sfasamento), 0);

    beginClip();
    rect(0, i * h_parti + h_parti / 2, text_width, h_parti);
    endClip();

    textSVG(testo, -text_width / 2, fontSize);

    pop();
  }
}
