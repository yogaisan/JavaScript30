window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// speechRecognition is a global variable that lives in the browser and that lives on top of the window
// currently it is only available in Firefox
// in Chrome it lives at webkitSpeechRecognition

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', event => {
  // console.log(event);
  // console.log(event.results);
  // we need to convert event.results to an array
  const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    p.textContent = transcript;
    if(event.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }

  console.log(transcript);
});

// now when we stop speaking, recognition does not work anymore
// that is because we are listening for the result but then, once the result is finished, it is no longer listening
// so what we need to do is add a second event listener for the end event
// and when that end, we simply just call the function recognition.start

recognition.addEventListener('end', recognition.start)

recognition.start();
