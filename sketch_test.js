const container = document.querySelector("#sContainer");
const audioControl = container.querySelector(".audio-control");
const playPauseBox = container.querySelector(".playPauseBox");
const playBtn = audioControl.querySelector(".playBtn");
const pauseBtn = audioControl.querySelector(".pauseBtn");

let sketch = function(s) {
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
  s.preload = function() {
    s.soundFormats("mp3");
    mySong = s.loadSound("./assets/drunk_in_love.mp3");
  };
  s.setup = function() {
    canvas = s.createCanvas(700, 700);
    s.background(0);
    //fade = 0;

    // startBtn = s.createButton("Play song");
    mySong.setVolume(1);

    //console.log(mySong.duration());

    amp = new p5.Amplitude();
    amp.setInput(mySong);

    // startBtn.mousePressed(function() {
    //   mySong.play();
    // });

    playPauseBox.addEventListener("click", () => {
      if (mySong.isPlaying()) {
        mySong.pause();
      } else {
        mySong.play();
      }
    });

    // playPauseBox.mouseClicked(function() {
    //   if (mySong.isPlaying()) {
    //     mySong.pause();
    //   } else {
    //     mySong.play();
    //   }
    // });
  };
  s.draw = function() {
    let volume = amp.getLevel();
    let size1 = s.map(volume, 0, 1, 20, 200);

    // Fyra variabler som används i beräkningen av maskarans koordinater.
    // Musikens volym är med och påverkar förflyttningen.
    t1 = t1 + 0.05 * volume;
    t2 = t2 + 0.05 * volume;
    t3 = t3 + 0.05 * volume;
    t4 = t4 + 0.05 * volume;

    // Deklarerar x och y koordinater för maskarna. De tilldelas värdena av beräkningarna.
    // Här beräknas noise av de tidigare variablerna. Noise genererar ett värde mellan 0 och 1.
    let x1 = s.noise(t1);
    let y1 = s.noise(t1 + 2); // Om man inte skriver +2 (eller någon annan siffra) så får x1 och y1 samma värde och masken rör sig bara diagonalt.

    let x2 = s.noise(t2);
    let y2 = s.noise(t2 + 2);

    let x3 = s.noise(t3);
    let y3 = s.noise(t3 + 2);

    let x4 = s.noise(t4);
    let y4 = s.noise(t4 + 2);

    // Här översätts värdet genererat av noise till koordinater på sketchfönsteret.
    // De olika maskarna är speglade mot varandra genom att width och heigt gentemot 0 vaierar.
    x1 = s.map(x1, 0, 1, 0, s.width);
    y1 = s.map(y1, 0, 1, 0, s.height);

    x2 = s.map(x2, 0, 1, s.width, 0);
    y2 = s.map(y2, 0, 1, 0, s.height);

    x3 = s.map(x3, 0, 1, 0, s.width);
    y3 = s.map(y3, 0, 1, s.height, 0);

    x4 = s.map(x4, 0, 1, s.width, 0);
    y4 = s.map(y4, 0, 1, s.height, 0);

    ritaMask(x1, y1, size1);
    ritaMask(x2, y2, size1);
    ritaMask(x3, y3, size1);
    ritaMask(x4, y4, size1);
  };

  function ritaMask(x, y, size) {
    s.fill(0);
    s.stroke(255, 0, 0); // Färgar kanten röd
    s.ellipse(x, y, size / 2, size / 2); // Ritar upp cirkeln/cirklarna. Storleken är dividerad med 2 för att de ska vara mindre än hjärtat
  }
};

new p5(sketch, container);
