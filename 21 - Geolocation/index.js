const arrow = document.querySelector('.arrow');
const speedValue = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
  console.log(data);
  speedValue.textContent = data.coords.speed;
  arrow.style.transform = `rotate(${data.coords.heading}deg)`
}, (err) => {
  console.error(err);
  alert('Please allow access!!!');
});
