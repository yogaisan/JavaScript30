const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const btnClear = document.querySelector('.btn-clear');
const btnCheck = document.querySelector('.btn-check');
const btnUncheck = document.querySelector('.btn-uncheck');

const addItem = (event) => {
  event.preventDefault();
  // console.log('Hello');
  // const text = (document.querySelector('.add-items input')).value;
  const input = (event.currentTarget.querySelector('[name=item]'));
  const text = input.value;
  // here event.currentTarget is going to be the whole form tag
  // and then we look inside that form tag for something that has a name attribute of item
  const item = {
    text: text,
    done: false
  };
  // console.log(item);
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  event.currentTarget.reset();
  // event.currentTarget is the form element which has a method called reset on it
  // and this clears the input box after clicking on submit
};

const populateList = (plates = [], platesList) => {
  platesList.innerHTML = plates.map((plate, i) => {
    // so we are going to loop over every single item in our array and map the data and return an array of some other data
    return `
      <li>
        <input type="checkbox" data-index=${i} id=item${i} ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
};

const toggleDone = (e) => {
  // we want to check if the target matches what we are looking for
  if (!e.target.matches('input')) return; // skip this unless it is an input
  // console.log(e.target);
  const element = e.target;
  // console.log(element.dataset.index);
  const index = element.dataset.index;
  // Now we are going to change the property
  // We are going to store that in local storage
  // And we are going to visually update what is on our page
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
};

const clearAll = () => {
  itemsList.innerHTML = '';
  items.splice(0, items.length);
  localStorage.removeItem('items');
};

const checkAll = () => {
  items.forEach((item) => {
    if (item.done === true) {
      item.done
    } else {
      item.done = !item.done;
    }
  })
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
};

const uncheckAll = () => {
  items.forEach((item) => {
    if (item.done === true) {
      item.done = !item.done;
    } else {
      !item.done;
    }
  })
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
};

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
btnClear.addEventListener('click', clearAll);
btnCheck.addEventListener('click', checkAll);
btnUncheck.addEventListener('click', uncheckAll);


// when the page loads
populateList(items, itemsList);
// but items does not initially exist on page-load since it was set to an empty array
// therefore, we add an or condition JSON.parse(localStorage.getItem('items')) to items
