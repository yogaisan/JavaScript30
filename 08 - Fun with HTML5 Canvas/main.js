const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

// The < canvas > element has a method called getContext(),
// used to obtain the rendering context and its drawing functions.getContext() takes one parameter,
// the type of context.For 2D graphics, such as those covered by this exercise, you specify "2d" to get a CanvasRenderingContext2D.

// Next, we need to size up our canvas to be the exact width and height of our window.
// By default it is set as 800 x 800 in the index.html.

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'bevel';
ctx.lineCap = 'round';
ctx.lineWidth = 50;
ctx.globalCompositeOperation = 'difference';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = (event) => {
  if (!isDrawing) return; // stops the function from running when they are not moused down.
  console.log(event);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
  // lastX = event.offsetX;
  // lastY = event.offsetY;
  [lastX, lastY] = [event.offsetX, event.offsetY]
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
};

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
