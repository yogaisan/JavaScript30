// 👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀

const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

// We still will not see the highlight anywhere because it does not have any width or height
// Now, we need to listen for someone to enter into a link

const highlightLink = (event) => {
  // console.log('Highlight!!');
  // console.log(event.currentTarget);

  // Now, we need to figure out the width, the height, the X and the Y
  // We need to figure out how big is the element that we hovered
  // and where on the page is that actual element
  // So, we are going to use a method called getBoundingClientRect,
  // which returns a DOMRect object providing information about the size of an element and its position relative to the viewport.

  const linkCoords = event.currentTarget.getBoundingClientRect();
  console.log(linkCoords);
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    // we need to compensate for scroll
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX // just in case there is a horizontal scroll
  }

  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
};

const home = document.querySelector('.home');
const highlightHome = document.querySelector('.highlight-home');
coordinates = home.getBoundingClientRect();
// console.log(coordinates);

const highlightHomeLink = () => {
  // console.log('The page has been fully loaded');
  highlight.style.transform = `translate(${coordinates.left}px, ${coordinates.top}px)`;
  home.classList.add('highlight-home');
};

const removehighlightHomeLink = () => {
  home.classList.remove('highlight-home');
};

// When the page load, the initial position of the highlight style is set to the home link instead of the default (0, 0)
// Therefore, when the page loads the home link is highlighted by default

window.onload = highlightHomeLink; // similar as below:
// window.addEventListener('load', highlightHomeLink);

// Then, we will listen for the mouseenter event on each of our triggers => a
triggers.forEach(trigger => trigger.addEventListener('mouseenter', highlightLink));
triggers.forEach(trigger => trigger.addEventListener('mouseenter', removehighlightHomeLink));
