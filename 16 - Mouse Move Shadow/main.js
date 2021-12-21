const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 500; // 500px

const shadow = (event) => {
  // console.log(event);
  const width = hero.offsetWidth;
  const height = hero.offsetHeight;
  // we can write the above in one line:
  // const { offsetWidth: width, offsetHeight: height } = hero;

  let x = event.offsetX;
  let y = event.offsetY;
  // Similarly, let { offset: x, offsetY: y } = event;
  // console.log(x, y);

  if (event.currentTarget !== event.target) {
    // currentTarget is the thing that we listen on
    // whereas target is the thing that the event got triggered on
    x = x + event.target.offsetLeft;
    y = y + event.target.offsetTop;
  }
  // console.log(x, y);
  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));
  // console.log(xWalk, yWalk);
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0, 255, 255, 0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0, 255, 0, 0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0, 0, 255, 0.7)
  `;
};

hero.addEventListener('mousemove', shadow);
