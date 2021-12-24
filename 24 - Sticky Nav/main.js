const nav = document.getElementById('main');
const topOfNav = nav.offsetTop;

const fixNav = () => {
  // console.log(topOfNav, window.scrollY);
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px'; // instead of writing this, we can just change position fixed to sticky in style.css
    // offsetHeight is height of navbar in px.
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0; // instead of writing this, we can just change position fixed to sticky in style.css
    document.body.classList.remove('fixed-nav');
  }
};

window.addEventListener('scroll', fixNav);


// When we make the nav fixed, it is no longer taking up space in the document.
// This is because, when we make an element fixed, it no longer takes up space,
// it sorts of floats on top of the browser,
// and by doing that, this causes the div/element below it to move on up the exact amount of space it gave up,
// which is equal to the total height of the navbar
