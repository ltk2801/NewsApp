'use strict';

const content = document.getElementById('content');

const KEY2 = 'CR-USER';
const currentUser = JSON.parse(getFromStorage(KEY2)) || [];

let tamp;

if (currentUser.length !== 0) {
  tamp = 1;
} else tamp = 0;

const renderHome = function () {
  const html = `
    <h2 class="mb-4">Home</h2>

        <!-- Login and Register redirect button -->
        <div id="login-modal">
          <p>Please Login or Register</p>
          <div class="row">
            <div class="col-md-3">
              <a href="./pages/login.html" class="btn btn-primary btn-block"
                >Login</a
              >
            </div>
            <div class="col-md-3">
              <a href="./pages/register.html" class="btn btn-primary btn-block"
                >Register</a
              >
            </div>
          </div>
        </div>

        <div id="main-content">
          <p id="welcome-message"></p>
          <button type="button" class="btn btn-primary" id="btn-logout">
            Logout
          </button>
        </div>
    `;
  content.innerHTML = ``;
  content.insertAdjacentHTML('beforeend', html);
};

const renderLogin = function () {
  const html = `
    <h2 class="mb-4">Home</h2>
    <div id="login-modal">
      <h4>WELCOME ${currentUser[0].firstName.toUpperCase()} ${currentUser[0].lastName.toUpperCase()} TO MY WEBSITE 🚀 🚀</h4>
    </div>

    <div id="main-content">
      <p id="welcome-message"></p>
      <button type="button" class="btn btn-primary" id="btn-logout">
        Logout
      </button>
    </div>
    `;
  content.innerHTML = ``;
  content.insertAdjacentHTML('beforeend', html);
};
// Kiểm tra có tài khoản đăng nhập chưa
if (tamp === 1) {
  renderLogin();
} else renderHome();

document.getElementById('btn-logout').addEventListener('click', function () {
  if (confirm('YOU WANT TO GO OUT? ')) {
    deleteStorage(KEY2);
    setTimeout(renderHome, 2000);
  }
});
