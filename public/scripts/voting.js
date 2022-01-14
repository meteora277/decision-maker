const draggable_list = document.getElementById('draggable-list');
const submit = document.getElementById('submit-poll-btn');

console.log("POTATOOO??", window.potato);

const myChoices = [];

window.potato.forEach( potato => {
  const holder = [potato.id, potato.choice, potato.description];
  myChoices.push(holder);
})

//console.log("new choices:", choices);

//hard-coding array in original order
/* const myChoices = [
  //{id: 1, title: "apple", description: "keeps dr away"},
  [1, 'apple', 'keeps the doctor away'],
  [2, 'orange','lots of vitamin C'],
  [3, 'banana','lotsa potassium'],
  [4, 'watermelon', 'green on outside, red on inside'],
  [5, 'pomegrante', 'best fruit ever'],
  [6, 'strawberry', 'not really a berry apparently']
];
 */
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
      <div class="draggable" draggable="true" data-choice="${choice[0]}">
        <h4 class="choice-name">${choice[1]}</h4>
        <p class="description-name">${choice[2]}</p>
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
    const choiceName= listItem.querySelector('.draggable').getAttribute("data-choice").trim();
    rankedChoices.push(choiceName);
  })
  console.log("array of ranked choices:", rankedChoices);
  rankedChoices.forEach(choice => {console.log(choice)})

  //Using AJAX to POST rankedChoices array to server
  console.log("rankedChoices", {rankedChoices});
  $.post(`/polls/${window.poll_id}` , {rankedChoices, name: $('#name').val()}, function(data){
    console.log("Data:", data);
  })
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

submit.addEventListener('click', () => {
  rankedOrder();
  document.getElementsByClassName("choices-list")[0].innerHTML = `<div class="jumbotron text-center">
  <h1 class="display-3">Thank You!</h1>
  <p class="lead"><strong>Please wait </strong> till admin releases vote result after everyone finishes votes.</p>
  <hr>
  <p>
    Know someone who has decision making problems <a href="">Share our website</a>
  </p>
  <p class="lead">
    <a class="btn btn-outline-primary" href="/" role="button">Make your own poll</a>
  </p>
</div>`;
});
