const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

let isDown = false;

speed.addEventListener('mousemove', (event) => {
  // console.log(event);
  if (!isDown) return;
  const y = event.pageY - event.currentTarget.offsetTop;
  // console.log(y);
  const percentageY = (y / event.currentTarget.offsetHeight);
  // console.log(percentageY);
  const min = 0.4; // minimum video speed
  const max = 4; // maximum video speed
  const height = Math.round(percentageY * 100) + '%';
  // console.log(height);
  const playbackRate = percentageY * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
});

speed.addEventListener('mousedown', (event) => {
  isDown = true;
  const y = event.pageY - event.currentTarget.offsetTop;
  // console.log(y);
  const percentageY = (y / event.currentTarget.offsetHeight);
  // console.log(percentageY);
  const min = 0.4; // minimum video speed
  const max = 4; // maximum video speed
  const height = Math.round(percentageY * 100) + '%';
  // console.log(height);
  const playbackRate = percentageY * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
});

speed.addEventListener('mouseup', () => {
  isDown = false;
});

speed.addEventListener('mouseenter', () => {
  isDown = false;
});
