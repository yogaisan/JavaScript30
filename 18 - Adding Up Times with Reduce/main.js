const timeNodes = document.querySelectorAll('[data-time]');

// console.log(timeNodes);
// timeNodes is a NodeList.
// NodeList is not an Array, but, it is possible to iterate over it with forEach().
// It can also be converted to a real Array using Array.from().

const timeStringArray = (Array.from(timeNodes)).map(node => node.dataset.time);
// We convert the above from an array of list items to an array of strings.

// Now, we need to convert that array into an array of numbers in seconds as shown below.

const seconds = timeStringArray.map(timeCode => {
  // here we break the string into minutes and seconds, parseFloat converts it from an array of string to an array of numbers
  const [mins, secs] = timeCode.split(':').map(parseFloat);
  // console.log(mins, secs);
  return (mins * 60) + secs; // returns each video duration, in the array, in seconds
});
// console.log(seconds);

// We need to add the number of seconds of every single video together to get total number of seconds
totalSeconds = seconds.reduce((total, vidSeconds) => total + vidSeconds);
// console.log(totalSeconds);

let secondsLeft;

// We calculate number of hours as a whole number
// and we need to know also the remaining time in seconds so as to convert it in minutes
const hours = Math.floor(totalSeconds / 3600);
secondsLeft = totalSeconds % 3600;
// console.log(secondsLeft);

// So, here we convert the remaining seconds from above into minutes as a whole number
// and the remaining time is the final amount of seconds left after converting to hours and minutes
const mins = Math.floor(secondsLeft / 60);
secondsLeftFinal = secondsLeft % 60;

console.log(hours, mins, secondsLeftFinal);
