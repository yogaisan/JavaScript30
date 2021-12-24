const triggers = document.querySelectorAll('.cool > li'); // all the direct descendants of .cool or the ul
const nav = document.querySelector('.top');
const background = document.querySelector('.dropdownBackground');

function handleEnter() {
  // console.log('Enter!');
  this.classList.add('trigger-enter');

  setTimeout(() => {
    // console.log(this);
    this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active');
    // when we enter into another function within a parent function, the value of this will obviously change
    // inside setTimeout function we can only use arrow function,
    // so that the value of 'this' is inherited from the parent function.
    // Also, we must use function declaration for handleEnter so that we can use 'this'
  }, 150);

  background.classList.add('open');

  // Now we need to find the one dropdown that exists inside of the li element that that got hovered
  const dropdown = this.querySelector('.dropdown');

  const dropdownCoords = dropdown.getBoundingClientRect(); // position on the page
  // We need to get information about where the nav is as well, since something might change on the page thus changing position of the ul and li
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  };

  background.style.setProperty('width', `${coords.width}px`)
  background.style.setProperty('height', `${coords.height}px`)
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`)
};

const handleLeave = (event) => {
  // console.log('Leave!');
  event.currentTarget.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
};


triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
