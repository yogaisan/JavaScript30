let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
// When we start our timer, we will just clear any existing timers;
// that is ,if there is a timer in countdown, it will clear it,
// it not, the variable still exists, and it is not gonna error out on us.
  clearInterval(countdown);

  const now = Date.now();
  const then = now + (seconds * 1000);
  // console.log({now, then});
  displayTimeLeft(seconds);
  displayEndTime(then);

// here we are going to update countdown
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
};

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const displayRemainingSeconds = secondsRemaining < 10 ? '0' : '';
  const display = `${minutes}:${displayRemainingSeconds}${secondsRemaining}`;
  document.title = display;
  timerDisplay.textContent = display;
  // console.log(minutes, secondsRemaining);
};

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  // const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  const displayMinutes = minutes < 10 ? '0' : '';
  endTime.textContent = `Be back at ${hour}:${displayMinutes}${minutes}`
};

function startTimer() {
  // console.log(this);
  // console.log(this.dataset);
  // console.log(this.dataset.time);
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
};

buttons.forEach(button => button.addEventListener('click', startTimer));

// console.log(document.customForm); // this will give us the form element
// console.log(document.customForm.minutes); // this will give us the input element
document.customForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const mins = event.currentTarget.minutes.value;
  // console.log(mins);
  timer(mins * 60);
  event.currentTarget.reset();
});
