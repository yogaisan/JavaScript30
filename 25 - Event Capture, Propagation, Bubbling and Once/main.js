// The way that it works in modern browsers is that:
// the browser will first do something called a capture,
// which means that when we click on the element, it is going to ripple down,
// that is it actually goes from top to down, and then captures all those events,
// and then it starts at the bottom, and then start doing something called a bubble,
// that is it is going to bubble up, which means it is triggering the events as we go up.

const divs = document.querySelectorAll('div');

const logText = (e) => {
  // console.log(e.currentTarget);
  console.log(e.currentTarget.classList.value);
  // e.stopPropagation(); // this says stop bubbling this event up; "I clicked the one I actually wanted".
};

// document.body.addEventListener('click', logText);

divs.forEach(div => div.addEventListener('click', logText, {
  capture: false,
  // capture: true // By default this is false
  // here we passed a third argument which is an options object,
  // when true, this will make the function logText not run on the bubble up,
  // but it is going to get run on the capture down.
  once: true
  // we also have an option called once,
  // if true, it will listen for a click once and then unbind itself,
  // which is the same as saying div.removeEventListener('click', logText),
  // so that there are no future clicks on it.
  // So now if we click one of the divs, it will run once, fire all the events,
  // but it will never run again until we rerun the page.
  // That could be helpful if we had a button.
}));

const button = document.querySelector('button');

// Now, we only want somebody to click that button once
button.addEventListener('click', () => {
  console.log('Click!!!');
}, {
  once: true
})
