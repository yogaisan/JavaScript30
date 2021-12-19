/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenBtn = player.querySelector('.fullscreen-button')

/* Build our functions */
const togglePlay = (event) => {
  event.preventDefault();
  if (event.currentTarget.paused) {
    event.currentTarget.play();
  } else {
    event.currentTarget.pause();
  }
};

const updateButton = (event) => {
  const icon = event.currentTarget.paused ? '►' : '❚ ❚'; // We could have used video instead of event.currentTarget. They are the same.
  toggle.textContent = icon; // innerHTML, innerText, and textContent are three properties that can be used to set or return an HTML element's content in the DOM.
  // console.log('update the button');
  // console.log('update the button');
};

const skip = (event) => {
  // console.log('skipping')
  // console.log(event.currentTarget.dataset.skip);
  video.currentTime += parseFloat(event.currentTarget.dataset.skip);
};

const handleRangeUpdate = (event) => {
  // console.log(event.currentTarget.name);
  // console.log(event.currentTarget.value);
  video[event.currentTarget.name] = event.currentTarget.value;
};

const handleProgress = () => {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`
};

const scrub = (event) => {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  // console.log(event);
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen()
  }
};


// function toggleFullscreen() {
//   if (!document.fullscreenElement) {
//     video.requestFullscreen().catch(err => {
//       alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
//     });
//   } else {
//     document.exitFullscreen();
//   }
// }

/* Hook up the event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

fullscreenBtn.addEventListener('click', toggleFullScreen);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
