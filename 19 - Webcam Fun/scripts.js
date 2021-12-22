const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      // console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    // in case that someone does not allow us to use their webcam, we need to handle that error
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
};

// next thing we need to do is to get a frame from this video
// and paint it on the actual canvas on the screen

const paintToCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // console.log(width, height);
  // we need to make sure that the canvas is the exact same size of our video before we paint
  canvas.width = width;
  canvas.height = height;

  // Now every 16ms, we are going to take an image from the webcam and put it into the canvas
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels);

    // modify them and put them back
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.1;
    pixels = greenScreen(pixels);
    
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  // take data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  // console.log(data);
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'yogaisan');
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="Yogaisan" />`
  strip.insertBefore(link, strip.firstChild);
};

// lastly, we are going to do some filters
// the way that a filter works is that we get the pixels out of the canvas
// and then change the rgb values and put the pixels back in the canvas

const redEffect = (pixels) => {
  // loop over every single pixel
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels
};

const rgbSplit = (pixels) => {
  // loop over every single pixel
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 400] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 450] = pixels.data[i + 2]; // Blue
  }
  return pixels
};

const greenScreen = (pixels) => {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  // console.log(levels);

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
};

getVideo();


// once the video is playing, it is going to emit an event called "canplay" which:
// in turn will cause to start paintToCanvas
video.addEventListener('canplay', paintToCanvas);
