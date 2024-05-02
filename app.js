const myAudio = document.querySelector("audio");

const myPlayButton = document.querySelector("#play");

let audioPlaying = false;
const playAudio = () => {
  myAudio.play();
  myPlayButton.classList.replace("fa-play", "fa-pause");
  audioPlaying = true;
};
const pauseAudio = () => {
  myAudio.pause();
  myPlayButton.classList.replace("fa-pause", "fa-play");
  audioPlaying = false;
};
myPlayButton.addEventListener("click", () => {
  if (audioPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

const songsData = [
  {
    imageName: "image.jpg",
    audioName: "gulabiSaree.mp3",
    songName: "Gulabi Saree",
    singerName: "Sanju Rathod",
  },
  {
    imageName: "image1.jpg",
    audioName: "kingShit.mp3",
    songName: "King Shit",
    singerName: "Shubh",
  },
  {
    imageName: "image2.jpg",
    audioName: "Lalkara.mp3",
    songName: "Lalkara",
    singerName: "DilJit Dosanjh",
  },
  {
    imageName: "image3.jpg",
    audioName: "rubicon.mp3",
    songName: "Rubicon Drill",
    singerName: "Jasmine",
  },
];

const myImage = document.querySelector("img");
const mySongName = document.querySelector("h3");
const mySingerName = document.querySelector("h4");
const myForwardButton = document.querySelector("#forward");
const myBackwardButton = document.querySelector("#backward");

const loadSongs = (info) => {
  myImage.src = `images/${info.imageName}`;
  myAudio.src = `Audios/${info.audioName}`;
  mySongName.textContent = `${info.songName}`;
  mySingerName.textContent = `${info.singerName}`;
};

let songIndex = 0;
myForwardButton.addEventListener("click", () => {
  if (songIndex > songsData.length - 1) {
    songIndex = 0;
  }
  loadSongs(songsData[songIndex]);
  playAudio();
  songIndex++;
});

myBackwardButton.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songsData.length - 1;
  }

  loadSongs(songsData[songIndex]);
});

const myTotalDuration = document.querySelector(".total-duration");
const myActualDuration = document.querySelector(".current-time");
const myProgressChild = document.querySelector(".progress-child");

myAudio.addEventListener("timeupdate", (output) => {
  let myCurrentTime = output.srcElement.currentTime;
  let myDuration = output.srcElement.duration;

  let myAudioPlayTime = (myCurrentTime / myDuration) * 100;

  myProgressChild.style.width = `${myAudioPlayTime}%`;

  let myDurationInMinutes = Math.floor(myDuration / 60);
  let myDurationInSeconds = Math.floor(myDuration % 60);

  let totalDuration = `${myDurationInMinutes}:${myDurationInSeconds}`;
  myTotalDuration.textContent = totalDuration;

  let myCurrentTimeMinutes = Math.floor(myCurrentTime / 60);
  let myCurrentSeconds = Math.floor(myCurrentTime % 60);

  if (myCurrentSeconds < 10) {
    myCurrentSeconds = `0${myCurrentSeconds}`;
  }
  let actualCurrentTime = `${myCurrentTimeMinutes}:${myCurrentSeconds}`;

  myActualDuration.textContent = actualCurrentTime;
});

const shuffle = document.querySelector("#shuffle");

shuffle.addEventListener("click", () => {
  const myshuffle = Math.floor(Math.random() * 4);

  loadSongs(songsData[myshuffle]);
  playAudio();
});

const myHeart = document.querySelector("#heart");

myHeart.addEventListener("click", () => {
  myHeart.style.color = "red";

  let mySavedSongs = mySongName.textContent;
  let mySavedSingerName = mySongName.textContent;
  localStorage.setItem(mySavedSongs, mySavedSingerName);
});

myHeart.addEventListener("dblclick", () => {
  myHeart.style.color = "black";
});
