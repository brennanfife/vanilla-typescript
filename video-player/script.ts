export {}; //export just to a naming collision with lib.dom.d.ts

const video = <HTMLVideoElement>document.getElementById("video");
const play = <HTMLButtonElement>document.getElementById("play");
const stop = <HTMLButtonElement>document.getElementById("stop");
const progress = <HTMLInputElement>document.getElementById("progress");
const timestamp = <HTMLSpanElement>document.getElementById("timestamp");

// Play and Pause Video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play / Pause Icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update Progress and Timestamp
function updateProgress() {
  progress.value = String((video.currentTime / video.duration) * 100);

  // Get minutes
  let mins: string | number = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // Get seconds
  let secs: string | number = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set Video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
