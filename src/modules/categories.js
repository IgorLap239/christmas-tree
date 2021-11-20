/* eslint-disable linebreak-style */
const categoryPage = document.querySelector('.category-page-wrapper');
const categoryHomeButton = categoryPage.querySelector('.home');
const scoreButton = categoryPage.querySelector('.score-link');
const categoriesCovers = categoryPage.querySelectorAll('.category-cover');
const pictureQuizBt = document.querySelector('.picture');
const artistQuizBt = document.querySelector('.artist');
const categoriesBlock = categoryPage.querySelector('.categories');

//categorys cover code
let imgNum = 0;

function setCover(urlStr, index) {
  const img = new Image();
  img.src = urlStr;
  img.onload = () => {
    categoriesCovers[index].style.backgroundImage = `url(${img.src})`;
    categoriesCovers[index].style.backgroundSize = `cover`;
    categoriesCovers[index].style.cursor = `pointer`;
  };
}

pictureQuizBt.addEventListener('click', () => {
  setCategoryCover();
  categoriesBlock.classList.add('pic-quiz');
});

artistQuizBt.addEventListener('click', () => {
  setCategoryCover();
  categoriesBlock.classList.add('art-quiz');
});


function setCategoryCover () {
  target = event.target;
  if (target.classList.contains('picture')) {
    for (let i = 0; i < categoriesCovers.length; i++) {
      let urlStr = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${imgNum}.webp`;
      imgNum = imgNum + 10;
      setCover(urlStr, i);
    }
  } else {
    imgNum = 120;
    for (let i = 0; i < categoriesCovers.length; i++) {
      let urlStr = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${imgNum}.webp`;
      imgNum = imgNum + 10;
      setCover(urlStr, i);
    }
  }
  imgNum = 0;
}


//start quiz codes
categoryPage.addEventListener('click', () => {
  startQuiz()
});

function startQuiz () {

}
