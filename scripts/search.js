'use strict';

const KEY2 = 'CR-USER';
const currentUser = JSON.parse(getFromStorage(KEY2)); // Lấy user hiện đang đăng nhập
const newsperpage = currentUser[0].API.pageSize || 5; //Lấy số tin tức mỗi trang, nếu không có thì mặc định là 5
const queryInput = document.getElementById('input-query'); // input
const searchBtn = document.getElementById('btn-submit');
const newsContainer = document.getElementById('news-container'); // render
const prevBtn = document.getElementById('btn-prev'); // Nét previous
const num = document.getElementById('page-num'); // Nút trang
const nextBtn = document.getElementById('btn-next'); // Nút next

// Tạo mảng danh sách news
let news = [];
let curPage = 1; //Lưu số trang hiện tại

// Check value
function validate() {
  if (queryInput.value === '') {
    alert('PLEASE INPUT 💥 💥');
    return false;
  }
  return true;
}

// Render 1 trang báo
const renderNew = function () {
  let html = ``;
  news.map(data => {
    html += `
            <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${data.urlToImage}"
                            class="card-img"
                            alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.content}</p>
                            <a href="${data.url}"
                            class="btn btn-primary">View</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
  });
  newsContainer.innerHTML = html;
};

function prevnextDisplay(prevBtn, nextBtn, maxPage) {
  //Điều chỉnh nút previous và nút next
  if (curPage == 1) {
    //Nếu trang hiện tại là 1
    prevBtn.classList.add('toast'); //Ẩn nút previous đi
    prevBtn.classList.add('disabled'); //Hủy luôn cả hiệu ứng khi rê chuột vào
  }
  if (curPage == maxPage) {
    //Nếu trang hiện tại là lớn nhất
    nextBtn.classList.add('toast'); //Ẩn nút next đi
    nextBtn.classList.add('disabled'); //Hủy luôn cả hiệu ứng khi rê chuột vào
  }
  if (curPage > 1 && curPage < maxPage) {
    //Nếu trang hiện tại nằm giữa 1 và lớn nhất  thì hiện cả 2 nút previous và next lên cũng như khôi hiệu ứng cho chúng
    nextBtn.classList.remove('toast');
    nextBtn.classList.remove('disabled');
    prevBtn.classList.remove('disabled');
    prevBtn.classList.remove('toast');
  }
}

// Lấy API và hiện thị trang báo

const getNews = async function (curPage, key) {
  try {
    const url =
      'https://newsapi.org/v2/everything?' +
      `q=${key}&` +
      `language=en&` +
      `pageSize=${newsperpage}&` +
      `page=${curPage}&` +
      `apiKey=0dce433255314c708487fa7cedc66e2f`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Problem getting API');

    const data = await res.json();
    news = data.articles;
    console.log(data);
    let maxPage = 0; // Số trang tối đa
    if (data.totalResults >= 100) {
      //Cách tính số trang tối đa cho tài khoản news API miễn phí
      maxPage = 100 / newsperpage; // Tổng số bài báo nhỏ hơn 100 thì 100 chia cho số bài báo của mỗi trang
    } else {
      maxPage = data.totalResults / newsperpage; //Nếu tổng số kết quả nhận được lớn hơn 100 thì lấy số trang chia cho số báo mỗi trang
    }
    prevnextDisplay(prevBtn, nextBtn, maxPage);
    renderNew();
  } catch (error) {
    console.error(error);
  }
};

// Xử lý sự kiện khi ấn vào btn
searchBtn.addEventListener('click', function () {
  const keyW = queryInput.value;
  const check = validate();
  if (check) {
    getNews(curPage, keyW);
  }
});

// Xử lý sự kiện khi ấn vào nút next

nextBtn.addEventListener('click', function () {
  // render tin tức theo page hiện tại

  getNews((curPage += 1));
  num.text = curPage;
  // console.log(curPage);
});

// Xử lý sự kiện khi ấn vào nút previous

prevBtn.addEventListener('click', function () {
  // Nếu trang hiện tại lớn hơn 1 thì thực thi
  if (curPage > 1) {
    getNews((curPage -= 1));
    num.text = curPage;
    // console.log(curPage);
  }
});
