const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
// console.log(checkboxes);

let lastChecked;

checkboxes.forEach(checkbox => checkbox.addEventListener('click', (event) => {
  // console.log(event);

  // check if they had the shift key down
  // and check if they are checking it
  let inBetween = false;
  if (event.shiftKey && event.currentTarget.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      // Now, we need to set the inBetween variable to true
      if (checkbox === event.currentTarget || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log('Checking');
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = event.currentTarget;
}))
