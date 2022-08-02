'use strict';

const KEY2 = 'CR-USER';
const currentUser = JSON.parse(getFromStorage(KEY2)); // Lấy user hiện đang đăng nhập
const KEY = 'TODO-ARR';
const todoArr = JSON.parse(getFromStorage(KEY)) || [];
const taskInput = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

// Lấy userName của user đang hoạt động
const curUser = currentUser[0].userName;

// Tạo 1 mảng mới chứa các hoạt động của User đó

const curToDoArr = todoArr.filter(us => us.owner === curUser);
// console.log(curUser);

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
// Hàm chuyển JS object sang Class Instance
function parseTodo(toDoData) {
  const task = new Task(toDoData.task, toDoData.owner, toDoData.isDone);

  return task;
}
// Hàm check null
function validate(data) {
  if (data.task === '') {
    alert('Please input for task 💥 💥 ');
    return false;
  }
  return true;
}

// Hàm xóa dữ liệu vừa nhập trên form
function clearInput() {
  taskInput.value = '';
}

// Render todoList
const renderList = function () {
  let html = ``;
  curToDoArr.map(data => {
    html += `
      <li>
      ${data.task}
        
        <span class="close" onclick=deleteTask(${data.task},${data.owner})>×</span>
      </li>
     
    `;
  });
  todoList.innerHTML = html;
};
// Hiển thị todoList
renderList();

// Toggle list
todoList.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
});

//  Xóa pet
function deleteTask(task, owner) {
  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].task == task && todoArr[i].owner == owner) {
      const checkConfirm = confirm('Are you sure about that?');
      if (checkConfirm) {
        todoArr.splice(i, 1);
        deleteStorageValue(KEY);
        saveToStorage(KEY, JSON.stringify(todoArr));

        renderList();
        alert('You have successfully deleted');
      }
    }
  }
}

// Bắt sự kiện ấn add
addBtn.addEventListener('click', function () {
  if (!currentUser) {
    alert('PLEASE LOGIN FOR DO IT 😁 😁 ');
  }
  const data = {
    task: taskInput.value,
    owner: currentUser[0].userName,
    isDone: false,
  };

  const task = parseTodo(data);
  const check = validate(data);
  if (check) {
    alert('ADD NEW TODO SUCCESFULLY 💌');
    clearInput();
    todoArr.push(task);
    curToDoArr.push(task);
    renderList();
    saveToStorage(KEY, JSON.stringify(todoArr));
    // console.log(task);
  }
});
