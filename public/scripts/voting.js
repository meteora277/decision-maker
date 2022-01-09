const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('submit-poll');

console.log("hi");

//hard-coding array in correct order
const myChoices = [
  'apple',
  'orange',
  'banana',
  'peach'
];

//Store listitems
const listItems = [];

let dragStartIndex;


//Insert list items into DOM
createList();

function createList() {
  //Spread operator allows us to copy the original order of the array
  [...myChoices].forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="dragggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class = "fas fa-grip-lines"></i>
      </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);

    });
}
