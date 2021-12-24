const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  // console.log(e.pageX); this gives us the x-coordinate where we click on the page
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  // console.log(startX);
  console.log(scrollLeft);
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; // stops the function from running
  // console.log(isDown);
  // console.log(startX);
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  // console.log({x, startX});
  const walk = (x - startX) * 3; // this is going to tell us how far in px we have deviated from the initial position startX
  // console.log(walk);
  // Now, we need to make the div, with class items, scroll
  // and we do that with a scrollLeft property
  // so we will take slider.scrollLeft,
  //  and set it to scrollLeft(which is what we initially captured for the mousedown event) minus the walk value
  slider.scrollLeft = scrollLeft - walk
});
