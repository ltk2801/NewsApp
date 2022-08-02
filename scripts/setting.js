'use strict';

const perPageUl = document.getElementById('input-page-size');
const categoryUl = document.getElementById('input-category');
const saveBtn = document.getElementById('btn-submit');
const KEY = 'USER-ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)); // lấy danh sách các user
const KEY2 = 'CR-USER';
const currentUser = JSON.parse(getFromStorage(KEY2)); // Lấy user hiện đang đăng nhập

// // currentUser[0].API.pageSize = 10;
// // saveToStorage(KEY2, JSON.stringify(currentUser));

// console.log(currentUser[0].API.pageSize);

// Hàm kiểm tra data

perPageUl.value = currentUser[0].API.pageSize;
categoryUl.value = currentUser[0].API.category;

function validate() {
  if (perPageUl.value === '') {
    alert('PLEASE INPUT FOR NEWS PER PAGE  💥 💥');
    return false;
  }
  if (perPageUl.value < 1) {
    alert('NEWS PER PAGE MUST BE > 0 💫 ');
    return false;
  }
  return true;
}

// Cập nhật danh sách USER
function updateUserArr() {
  userArr.forEach(data => {
    if (data.userName === currentUser[0].userName) {
      data.API.category = currentUser[0].API.category;
      data.API.pageSize = currentUser[0].API.pageSize;
      saveToStorage(KEY, JSON.stringify(userArr));
    }
  });
}

// Sự kiện CLICK, Update for user

saveBtn.addEventListener('click', function () {
  const check = validate();
  if (check) {
    const checkConfirm = confirm('ARE YOU SURE ABOUT THAT? 🤔');
    if (checkConfirm) {
      alert('YOU HAVE SUCCESSFULLY SETTING 🚀');
      currentUser[0].API.pageSize = perPageUl.value;
      currentUser[0].API.category = categoryUl.value;
      saveToStorage(KEY2, JSON.stringify(currentUser));
      updateUserArr();
    }
  }
});
