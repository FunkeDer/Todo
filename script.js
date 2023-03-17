const button = document.querySelector('.button');
let undone_things = document.getElementById('undone_things_block');
let undone_things_block = document.getElementById('undone_things_block');
const done_things_block = document.getElementById('done_things_block');
const user_input = document.getElementById('user_input');


document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addInput();
    changeNameOfHeads()
  }
});

if (!user_input) {
  alert('Error');
}

function moveToDone(event) {
  const checkbox_input = event.target;
  const undone_thing = checkbox_input.parentElement.parentElement;
  let done_thing = document.getElementById('done_things')
  if (checkbox_input.checked) {
    undone_thing.remove()
    done_things_block.appendChild(undone_thing);
    undone_thing.setAttribute('id', 'done_things')
    undone_thing.classList.remove('undone-thing')
    undone_thing.classList.add('done-things')
  } else {
    done_thing = checkbox_input.parentElement.parentElement;
    done_thing.classList.remove('done-things')
    done_thing.classList.add('undone-thing')
    undone_things_block.appendChild(undone_thing);
  }
}

function deleteAdded(event) {
  event.target.parentElement.remove();
}

function createUndoneThing(task) {
  let undone_things = [];
  const undone_thing = document.createElement('div');
  undone_thing.classList.add('undone-thing');

  const task_block = document.createElement('div');
  task_block.classList.add('task-block');
  undone_thing.appendChild(task_block);

  const checkbox_input = document.createElement('input');
  checkbox_input.type = 'checkbox';
  checkbox_input.value = false;
  checkbox_input.classList.add('input-checkbox');
  checkbox_input.addEventListener('click', moveToDone);
  checkbox_input.addEventListener('click', changeNameOfHeads)
  task_block.appendChild(checkbox_input);

  let p = document.createElement('p');
  p.innerHTML = task;
  p.setAttribute('id', 'para_1');
  task_block.appendChild(p);

  const cross = document.createElement('i');
  cross.classList.add('fa-solid');
  cross.classList.add('fa-xmark');
  cross.addEventListener('click', deleteAdded);
  cross.addEventListener('click', changeNameOfHeads)
  undone_thing.appendChild(cross);

  undone_things.push({
    id: Date.now(),
    text: user_input.value.trim(),
    completed: false
  });
  for(let i = 0; i<1; i++){
  localStorage.setItem('undone_things', JSON.stringify(undone_things))
  console.log(localStorage)
  let getItemfromStorage = localStorage.getItem(undone_things)
  if(getItemfromStorage !== null){
    undone_things = JSON.parse(getItemfromStorage)
  }
  console.log(undone_things)
  }


  return undone_thing;
}

function addInput() {

  //   for(let i = 0; i<1; i++){
  //     let sliced_user_input = user_input.value.match(/.{1,3}/g)
  //     return sliced_user_input
  // }
  const whatTodo = user_input.value.trim();
  if (!whatTodo) {
    alert("Please, add input")
    return;
  }

  const undone_thing = createUndoneThing(whatTodo);
  undone_things.appendChild(undone_thing);

  user_input.value = '';
  // Check the length of children in the undone_things_block
}

function changeNameOfHeads(){
  const undoneCount = undone_things_block.children.length;
  const doneCount = done_things_block.children.length;
  const uncompletedHead = document.getElementById('uncompletedHead');
  const completedHead = document.getElementById('completedHead')

  // Update the display of the h4 element based on the length of children
  if (undoneCount <= 0) {
    uncompletedHead.style.display = 'none';
  } else {
    uncompletedHead.style.display = 'block';
    uncompletedHead.textContent = `You have ${undoneCount} undone task(s)`;
  }

  if (doneCount <= 0) {
    completedHead.style.display = 'none';
  } else {
    completedHead.style.display = 'block';
    completedHead.textContent = `You have done ${doneCount} task(s)`;
  }
}