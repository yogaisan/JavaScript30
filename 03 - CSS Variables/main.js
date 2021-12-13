const inputs = document.querySelectorAll('.controls input');

// const handleUpdate = (event) => {
// console.log(event.currentTarget.value)
// };

const handleUpdate = (event) => {
  const suffix = event.currentTarget.dataset.sizing || ''; // the '' is for elements which do not have data-sizing such as color
  document.documentElement.style.setProperty(`--${event.currentTarget.name}`, event.currentTarget.value + suffix)
};


inputs.forEach((input) => {
  input.addEventListener('change', handleUpdate)
});

inputs.forEach((input) => {
  input.addEventListener('mousemove', handleUpdate)
});
