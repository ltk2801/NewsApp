'use strict';

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

const getNews = async function (page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0dce433255314c708487fa7cedc66e2f&page=${page}&pageSize=2`
    );
    if (!res.ok) throw new Error('Problem getting API');

    const data = await res.json();
    news = data.articles;
    console.log(data);
    prevnextDisplay(prevBtn, nextBtn);
    renderNew();
  } catch (error) {
    console.error(error);
  }
};
// Hiện tin tức theo trang đầu
getNews(curPage);

// Sự kiện khi ấn vào nút next

nextBtn.addEventListener('click', function () {
  // render tin tức theo page hiện tại
  if (curPage < 5) {
    getNews((curPage += 1));
    num.text = curPage;
    console.log(curPage);
  }
});

prevBtn.addEventListener('click', function () {
  // Nếu trang hiện tại lớn hơn 1 thì thực thi
  if (curPage > 1) {
    getNews((curPage -= 1));
    num.text = curPage;
    console.log(curPage);
  }
});

function prevnextDisplay(prevBtn, nextBtn) {
  //Điều chỉnh nút previous và nút next
  if (curPage == 1) {
    //Nếu trang hiện tại là 1
    prevBtn.classList.add('toast'); //Ẩn nút previous đi
    prevBtn.classList.add('disabled'); //Hủy luôn cả hiệu ứng khi rê chuột vào
  }
  if (curPage == 5) {
    //Nếu trang hiện tại là lớn nhất
    nextBtn.classList.add('toast'); //Ẩn nút next đi
    nextBtn.classList.add('disabled'); //Hủy luôn cả hiệu ứng khi rê chuột vào
  }
  if (curPage > 1 && curPage < 5) {
    //Nếu trang hiện tại nằm giữa 1 và lớn nhất  thì hiện cả 2 nút previous và next lên cũng như khôi hiệu ứng cho chúng
    nextBtn.classList.remove('toast');
    nextBtn.classList.remove('disabled');
    prevBtn.classList.remove('disabled');
    prevBtn.classList.remove('toast');
  }
}
