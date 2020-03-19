const container = document.querySelector("#sContainer");
const audioControl = container.querySelector(".audio-control");
const playPauseBox = container.querySelector(".playPauseBox");
const playBtn = audioControl.querySelector(".playBtn");
const pauseBtn = audioControl.querySelector(".pauseBtn");
const restartAllBtn = audioControl.querySelector(".restartAllBtn");
const restartMusicBtn = audioControl.querySelector(".restartMusicBtn");
const loadingScreen = container.querySelector(".loadingScreen");

let sketch = function(s) {
  let mySong;
  let t1 = 0;
  let t2 = 0;
  let t3 = 0;
  let t4 = 0;
  let amp;
  let canvas;
  let loading = true;

  // s.preload = function() {
  //   s.soundFormats("mp3");
  //   mySong = s.loadSound("./assets/drunk_in_love.mp3");
  // };

  function error(err) {
    console.log(err);
  }
  function soundLoaded() {
    console.log("loaded");
    loading = false;
  }

  s.setup = function() {
    s.soundFormats("mp3");
    mySong = s.loadSound("./assets/drunk_in_love.mp3", soundLoaded, error);
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

    //playPauseBox.addEventListener("click", pausePlayHandler);
    playBtn.addEventListener("click", pausePlayHandler);
    pauseBtn.addEventListener("click", pausePlayHandler);

    restartMusicBtn.addEventListener("click", restartMusic);
    restartAllBtn.addEventListener("click", restartAll);

    // playPauseBox.mouseClicked(function() {
    //   if (mySong.isPlaying()) {
    //     mySong.pause();
    //   } else {
    //     mySong.play();
    //   }
    // });
  };
  s.draw = function() {
    if (!loading) {
      loadingScreen.classList.add("hide");
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
    }
  };

  function ritaMask(x, y, size) {
    s.fill(0);
    s.stroke(255, 0, 0); // Färgar kanten röd
    s.ellipse(x, y, size / 2, size / 2); // Ritar upp cirkeln/cirklarna. Storleken är dividerad med 2 för att de ska vara mindre än hjärtat
  }
  function pausePlayHandler() {
    console.log(mySong);

    if (this.id === "playBtn") {
      mySong.mode = "sustain";
      mySong.play();
      playBtn.classList.toggle("hide");
      pauseBtn.classList.toggle("hide");
    } else if (this.id === "pauseBtn") {
      mySong.pause();
      playBtn.classList.toggle("hide");
      pauseBtn.classList.toggle("hide");
    }
  }

  function restartMusic() {
    console.log(mySong);
    // mySong.jump(0);

    // needed to work around not being able to pause after calling jump()
    setTimeout(function() {
      Object.assign(mySong, { _playing: true });
      mySong.playMode("restart");
    }, 100);
    mySong.stop();
    mySong.play();
    mySong.playMode("sustain");

    playBtn.classList.add("hide");
    pauseBtn.classList.remove("hide");
  }
  function restartAll() {
    s.background(0);
    // mySong.jump(0);
    // mySong.stop();
    // mySong.play();
    // needed to work around not being able to pause after calling jump()
    restartMusic();
  }

  // function loadScreen() {
  //   console.log("loading");

  //   // container.innerHTML =
  //   //   '<div class="lds-ripple"><div></div><div></div></div>';
  // }
};

new p5(sketch, container);

// let silder = createSlider(0,1,0.5,0.01);
// mySong.setVolume(silder.value());

// kan sätta en callback på loadSound, kan göra en egen loading i canvas
// mySong = s.loadSound("./assets/drunk_in_love.mp3", s.draw);

/*
let sliderRate = createSlider(0,1.5,1,0.01)
mySong.rate(sliderRate.value())



*/
