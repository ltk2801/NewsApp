'use strict';

const uNameInput = document.getElementById('input-username');
const passWordInput = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-submit');

const KEY = 'USER-ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const KEY2 = 'CR-USER';
const currentUser = JSON.parse(getFromStorage(KEY2)) || [];

console.log(userArr);

// Kiểm tra
function validate(data) {
  // Check không trường nào bị bỏ trống
  if (data.userName === '' && data.password === '') {
    alert('Please input 💥 💥');
    return false;
  }
  if (data.userName === '') {
    alert('Please input for Username 💥 💥');
    return false;
  }
  if (data.password === '') {
    alert('Please input for Password 💥 💥');
    return false;
  }
  // Kiểm tra độ dài của password
  if (passWordInput.value.length <= 8) {
    alert('Password must be bigger than 8 characters 💥 💥');
    return false;
  }
  return true;
}

function checkLogin(data) {
  for (let user of userArr) {
    if (user.userName === data.userName && user.passWord === data.password) {
      currentUser.push(user);
      saveToStorage(KEY2, JSON.stringify(currentUser));
      console.log(currentUser);
      window.location.href = '../index.html';
      return true;
    }
  }
  return false;
}
loginBtn.addEventListener('click', function () {
  const data = {
    userName: uNameInput.value,
    password: passWordInput.value,
  };
  console.log(data);
  // biến kiểm tra dữ liệu hộp lệ
  const check = validate(data);
  const checkLg = checkLogin(data);
  if (check) {
    // Kiểm tra loggin thành công hay chưa
    if (checkLg) {
      alert('You are successfully logged in 🎉 🎉');
    } else {
      alert(`Username or password was wrong 💥 💥`);
    }
  }
});
