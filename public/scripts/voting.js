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
  [...myChoices].forEach((choice, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="choice-name">${choice}</p>
        <i class = "fas fa-grip-lines"></i>
      </div>
      `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
  //Look at DOM, find closest li, and get the atrribute of data-index
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  //When enter element, add class "over" to that element to darken it
  this.classList.add('over');
}

function dragLeave() {
  //When leave element, remove "over" so that it is white dark anymore
  this.classList.remove('over');
}

//swapItems first gets the whole DOM element for item being dragged and item being replaced, then swaps the position in the DOM.
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

}

//dragOver exists so that whenever a dragover event happens, the default behaviour is prevented, enabling drop to work.
function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  //Getting the end index as a number
  const dragEndIndex = +this.getAttribute('data-index');
  //Take in dragStartIndex and dragEndIndex, and swap item being dragged vs where it is dropped
  swapItems(dragStartIndex, dragEndIndex);
}


//Handle the drag & drop events
function addEventListeners() {

  //Two DOM elements needed: all the draggable classes and draggable-list items, and need to add event listener on each one
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems  = document.querySelectorAll('.draggable-list li');

  //listen for dragStart on draggable class (when user starts dragging a choice)
  draggables.forEach( draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItems.forEach(item => {
    //dragOver called to add background color for whatever item user is dragging over
    item.addEventListener('dragover', dragOver);
    //dragItem called when item dropped on valid drop target
    item.addEventListener('drop', dragDrop);
    //dragEnter called when enter an element
    item.addEventListener('dragenter', dragEnter);
    //dragLeave called when leave an element
    item.addEventListener('dragleave', dragLeave);

  })

}
