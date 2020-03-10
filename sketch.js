let mySong;
let sum;
let t1 = 0;
let t2 = 0;
let t3 = 0;
let t4 = 0;
let fade;
let amp;
let canvas;
let startBtn;
let startVar = false;

function preload() {
  soundFormats("mp3");
  mySong = loadSound("./assets/drunk_in_love.mp3");
}

function setup() {
  canvas = createCanvas(700, 700);
  background(0);
  //fade = 0;

  startBtn = createButton("Play song");
  mySong.setVolume(1);

  //console.log(mySong.duration());

  amp = new p5.Amplitude();
  amp.setInput(mySong);

  startBtn.mousePressed(function() {
    mySong.play();
  });

  canvas.mouseClicked(function() {
    if (mySong.isPlaying()) {
      mySong.pause();
    } else {
      mySong.play();
    }
  });
}

function draw() {
  let volume = amp.getLevel();
  let size1 = map(volume, 0, 1, 20, 200);

  // Fyra variabler som används i beräkningen av maskarans koordinater.
  // Musikens volym är med och påverkar förflyttningen.
  t1 = t1 + 0.05 * volume;
  t2 = t2 + 0.05 * volume;
  t3 = t3 + 0.05 * volume;
  t4 = t4 + 0.05 * volume;

  // Deklarerar x och y koordinater för maskarna. De tilldelas värdena av beräkningarna.
  // Här beräknas noise av de tidigare variablerna. Noise genererar ett värde mellan 0 och 1.
  let x1 = noise(t1);
  let y1 = noise(t1 + 2); // Om man inte skriver +2 (eller någon annan siffra) så får x1 och y1 samma värde och masken rör sig bara diagonalt.

  let x2 = noise(t2);
  let y2 = noise(t2 + 2);

  let x3 = noise(t3);
  let y3 = noise(t3 + 2);

  let x4 = noise(t4);
  let y4 = noise(t4 + 2);

  // Här översätts värdet genererat av noise till koordinater på sketchfönsteret.
  // De olika maskarna är speglade mot varandra genom att width och heigt gentemot 0 vaierar.
  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, 0, height);

  x2 = map(x2, 0, 1, width, 0);
  y2 = map(y2, 0, 1, 0, height);

  x3 = map(x3, 0, 1, 0, width);
  y3 = map(y3, 0, 1, height, 0);

  x4 = map(x4, 0, 1, width, 0);
  y4 = map(y4, 0, 1, height, 0);

  ritaMask(x1, y1, size1);
  ritaMask(x2, y2, size1);
  ritaMask(x3, y3, size1);
  ritaMask(x4, y4, size1);
}

function ritaMask(x, y, size) {
  fill(0);
  stroke(255, 0, 0); // Färgar kanten röd
  ellipse(x, y, size / 2, size / 2); // Ritar upp cirkeln/cirklarna. Storleken är dividerad med 2 för att de ska vara mindre än hjärtat
}
