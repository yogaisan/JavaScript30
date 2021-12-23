const msg = new SpeechSynthesisUtterance(); // this essentially means what is the person going to say
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
// Below for const options, we select the rate, pitch and text area all in one go
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Now what we need to do is that on page load,
// whatever is in the text area,
// we want to set that to be the default.
msg.text = document.querySelector('[name="text"]').value;
// console.log(msg);

// Now let's populate all the different voices
// We also have another global variable called speechSynthesis
// And we can call .speak on speechSynthesis and pass it an utterance which is going to be our message

const populateVoices = (event) => {
  voices = event.currentTarget.getVoices();
  // console.log(voices);
  const voiceOptions = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');

  voicesDropdown.innerHTML = voiceOptions;
};

// Now, we want to be able to choose any of the voices from the dropdown
const setVoice = (e) => {
  console.log('Changing voice');
  msg.voice = voices.find(voice => voice.name === e.currentTarget.value);
  toggle();
};

// Now what we want to do is make a function that restart the speech every time we change a voice
const toggle = (startOver = true) => {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
};

// Next, we are going to work on our rate, pitch as well as our message/text
const setOption = (e) => {
  console.log(e.currentTarget.name, e.currentTarget.value);
  msg[e.currentTarget.name] = e.currentTarget.value;
  toggle();
};

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
