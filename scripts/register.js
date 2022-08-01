'use strict';

const fNameInput = document.getElementById('input-firstname');
const lNameInput = document.getElementById('input-lastname');
const uNameInput = document.getElementById('input-username');
const passWordInput = document.getElementById('input-password');
const cfPassWordInput = document.getElementById('input-password-confirm');
const registerBtn = document.getElementById('btn-submit');

class User {
  constructor(firstName, lastName, userName, passWord) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
  }
  API = {
    category: '',
    pageSize: '',
  };
}

const KEY = 'USER-ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) || [];

// Chuyển JS object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );

  return user;
}

// Kiểm tra
function validate(data) {
  // Check không trường nào bị bỏ trống
  if (
    data.firstName === '' &&
    data.lastName === '' &&
    data.userName === '' &&
    data.password === '' &&
    cfPassWordInput.value === ''
  ) {
    alert('Please input 💥 💥');
    return false;
  }
  if (data.firstName === '') {
    alert('Please input for First Name 💥 💥 ');
    return false;
  }
  if (data.lastName === '') {
    alert('Please input for Last Name 💥 💥');
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
  if (cfPassWordInput.value === '') {
    alert('Please input for Confirm Password 💥 💥');
    return false;
  }

  // Check userName không đƯợc trùng nhau
  for (let i = 0; i < userArr.length; i++) {
    if (data.userName == userArr[i].userName) {
      alert('duplicate userName 💥 💥');
      return false;
    }
  }
  // Kiểm tra password và confirm

  if (cfPassWordInput.value !== data.password) {
    alert('Password and ConfirmPassword so difference 💥 💥');
    return false;
  }

  // Kiểm tra độ dài của password
  if (passWordInput.value.length <= 8) {
    alert('Password must be bigger than 8 characters 💥 💥');
    return false;
  }
  return true;
}

// Xóa dữ liệu vừa nhập trên form
function clearInput() {
  fNameInput.value = '';
  lNameInput.value = '';
  uNameInput.value = '';
  passWordInput.value = '';
  cfPassWordInput.value = '';
}

// Bắt sự kiện khi ấn vào Register
registerBtn.addEventListener('click', function () {
  const data = {
    firstName: fNameInput.value,
    lastName: lNameInput.value,
    userName: uNameInput.value,
    password: passWordInput.value,
  };
  // biến kiểm tra dữ liệu hộp lệ
  const check = validate(data);
  const user = parseUser(data);

  if (check) {
    alert('Congratulations you successful registration ! 🎉 🎉');
    window.location.href = '../pages/login.html';
    userArr.push(user);
    saveToStorage(KEY, JSON.stringify(userArr));
    clearInput();
  }
});
