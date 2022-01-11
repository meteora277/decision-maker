const draggable_list = document.getElementById('draggable-list');
const submit = document.getElementById('submit-poll-btn');

//hard-coding array in original order
const myChoices = [
  ['apple', 'keeps the doctor away'],
  ['orange','lots of vitamin C'],
  ['banana','lotsa potassium'],
  ['watermelon', 'green on outside, red on inside'],
  ['pomegrante', 'best fruit ever'],
  ['strawberry', 'not really a berry apparently']
];

const rankedChoices = [];

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
        <h4 class="choice-name">${choice[0]}</h4>
        <p class="description-name">${choice[1]}</p>
        <i class = "fas fa-grip-lines"></i>
      </div>
      `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
    addEventListeners();
}

//Save the order items were ranked in an array
function rankedOrder() {
  listItems.forEach((listItem) => {
    const choiceName= listItem.querySelector('.draggable').innerText.trim();
    rankedChoices.push(choiceName);
  })
  rankedChoices.forEach(choice => {console.log(choice)})
  submitPollForm()
  return rankedChoices;
}

/* function submitPollForm() {
  const vote = document.querySelector('.hidden-form');

  vote.innerHTML = `
    <form id="myForm" name="myVote" method="POST" action="/polls/1">
    <input class="form-control" name="email">

    <div class="d-flex justify-content-center">
    <button type="submit" class="btn btn-primary btn-lg">submit</button>
    </div>
    </form>
    `

  document.getElementById("myForm").submit();
  console.log("content of hidden-form test:", vote.innerHTML);


} */

function dragStart() {
  //Look at DOM, find closest li, and get the atrribute of data-index
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  //When enter element, add class "over" to that element to darken it
  this.classList.add('over');
}

function dragLeave() {
  //When leave element, remove "over" so that it is not dark anymore
  this.classList.remove('over');
}

//Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  //Grab the whole DOM element for item being dragged and item being replaced
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  //perform swap
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

submit.addEventListener('click', rankedOrder);
