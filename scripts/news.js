'use strict';

const KEY2 = 'CR-USER';
const currentUser = JSON.parse(getFromStorage(KEY2));
const category = currentUser[0].API.category || 'Technology'; //Lấy category của người dùng
const newsperpage = currentUser[0].API.pageSize || 5; //Lấy số tin tức mỗi trang, nếu không có thì mặc định là 5
// console.log(currentUser[0].API.category);

const newsContainer = document.getElementById('news-container');
const prevBtn = document.getElementById('btn-prev');
const num = document.getElementById('page-num');
const nextBtn = document.getElementById('btn-next');

let news = [];

let curPage = 1; //Lưu số trang hiện tại

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

const getNews = async function (curPage) {
  try {
    const url =
      'https://newsapi.org/v2/top-headlines?' +
      `country=gb&` +
      `category=${category}&` +
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
    console.log(maxPage);
    prevnextDisplay(prevBtn, nextBtn, maxPage);
    renderNew();
  } catch (error) {
    console.error(error);
  }
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

// Hiện tin tức theo trang đầu
getNews(curPage);

// Sự kiện khi ấn vào nút next

nextBtn.addEventListener('click', function () {
  // render tin tức theo page hiện tại

  getNews((curPage += 1));
  num.text = curPage;
  console.log(curPage);
});

prevBtn.addEventListener('click', function () {
  // Nếu trang hiện tại lớn hơn 1 thì thực thi
  if (curPage > 1) {
    getNews((curPage -= 1));
    num.text = curPage;
    console.log(curPage);
  }
});
