/* eslint-disable linebreak-style */
const categoryPage = document.querySelector('.category-page-wrapper');
const categoryHomeButton = categoryPage.querySelector('.home');
const scoreButton = categoryPage.querySelector('.score-link');
const categoriesCovers = categoryPage.querySelectorAll('.category-cover');
const pictureQuizBt = document.querySelector('.picture');
const artistQuizBt = document.querySelector('.artist');
const categoriesBlock = categoryPage.querySelector('.categories');
const pictureQuiz = document.querySelector('.picture-question-wrapper');
const artistQuiz = document.querySelector('.artist-question-wrapper');
const startPage = document.querySelector('.start-page-wrapper');
const categoriesSettingsButton = categoryPage.querySelector('.settings-button');
const settingPage = document.querySelector('.settings-wrapper');

let currentCategory = 0;
let categoryCounter = 0;
let data = [];
let flag = 0;

//return to start page
categoryHomeButton.addEventListener('click', () => {
  startPage.classList.toggle('hidden');
  categoryPage.classList.toggle('hidden');
});

//open settings
categoriesSettingsButton.addEventListener('click', () => {
  categoryPage.classList.toggle('hidden');
  settingPage.classList.toggle('hidden');
});


//categorys cover code
let imgNum = 0;

function setCover(urlStr, index) {
  const img = new Image();
  img.src = urlStr;
  img.onload = () => {
    categoriesCovers[index].style.backgroundImage = `url(${img.src})`;
    categoriesCovers[index].style.backgroundSize = `cover`;
    categoriesCovers[index].style.transition = 'background-image 0.5s ease-in-out';
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
  const target = event.target;
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
  const target = event.target
  if (target.classList.contains('category-cover')) {
    let tmpArr = target.style.backgroundImage.split('/');
    currentCategory = tmpArr[tmpArr.length - 1].split('.')[0];
    startQuiz();
  }
});

function startQuiz() {
  if (categoriesBlock.classList.contains('pic-quiz')) {
    flag = 0;
    pictureQuiz.classList.toggle('hidden');
    categoryPage.classList.toggle('hidden');
    getInfo(flag);
  } else {
    flag = 1;
    artistQuiz.classList.toggle('hidden');
    categoryPage.classList.toggle('hidden');
    getInfo(flag);
  }
}

//play Quiz module
const picQuestionPage = document.querySelector('.picture-question-wrapper');
const artQuestionPage = document.querySelector('.artist-question-wrapper');
const answersBtns = picQuestionPage.querySelectorAll('.answer-btn');
const questionImg = picQuestionPage.querySelector('.question-img');
const answerPopup = document.querySelector('.answer-popup');
const contentPopup = answerPopup.querySelector('.popup-content');
const answerImg = answerPopup.querySelector('.answer-popup-img');
const textsInfo = answerPopup.querySelectorAll('span');
const nextQuestionBtn = answerPopup.querySelector('.answer-popup-btn');
const clearPopup = document.querySelector('.clear-popup');
const topscorePopup = document.querySelector('.topscore-popup');
const clearScore = clearPopup.querySelector('.clear-score');

let questionCounter = 0;
let authorsArr = [];
let answersArr = [];
let rightAns = '';

//quiz code
async function getInfo(flag) {
  const url = `https://raw.githubusercontent.com/IgorLap239/image-data/master/images.json`;
  try {
    const res = await fetch(url);
    data = await res.json();
    for (let i = 0; i <= 240; i++) {
      authorsArr.push(data[i].author);
    }
    if (flag == 0) {
      selectQuestionPicture();
      addAnswers();
    } else {
      selectAnswersPictures();
      addQuestionText();
    }
  } catch (e) {
    console.log(e);
  }
}

function getRandomNum(a = 0, b = 240) {
  min = Math.ceil(a);
  max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function addPopupInfo () {
  textsInfo[0].textContent = data[currentCategory].name;
  textsInfo[1].textContent = data[currentCategory].author;
  textsInfo[2].textContent = data[currentCategory].year;
}

//picture quiz code
function selectQuestionPicture () {
  let urlStr = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${currentCategory}.webp`;
  const img = new Image();
  img.src = urlStr;
  img.onload = () => {
    questionImg.style.backgroundImage = `url(${img.src})`;
    answerImg.style.backgroundImage = `url(${img.src})`;
    answerImg.style.backgroundSize = `cover`;
  };
};

function addAnswers() {
  for (let j = 0; j < 3; j++) {
    let x = getRandomNum();
    answersArr.push(authorsArr[x]);
  }
  rightAns = data[currentCategory].author;
  answersArr.push(rightAns);
  answersArr = shuffle(answersArr);
  for (let i = 0; i < 4; i++) {
    answersBtns[i].textContent = answersArr[i];
  }
};

picQuestionPage.addEventListener('click', (e) => {
  if (event.target.classList.contains('answer-btn')) {
    answersArr = [];
    if (event.target.textContent === rightAns) {
      contentPopup.classList.add('right');
      categoryCounter++;
    } else {
      contentPopup.classList.add('false');
    }
    addPopupInfo();
    questionCounter++;
    answerPopup.classList.toggle('hidden');
  }
});

//artist question code
const answersImages = artQuestionPage.querySelectorAll('.answer-img');
const questionText = artQuestionPage.querySelector('.question-text');

function selectAnswersPictures () {
  console.log(answersImages)
  for (let j = 0; j < 3; j++) {
    let x = getRandomNum();
    urlStr = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${x}.webp`;
    answersArr.push(urlStr);
  }
  rightAns = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${data[currentCategory].imageNum}.webp`;
  answersArr.push(rightAns);
  answersArr = shuffle(answersArr);
  for (let i = 0; i < 4; i++) {
    const img = new Image();
    img.src = answersArr[i];
    img.onload = () => {
      answersImages[i].style.backgroundImage = `url(${img.src})`;
      answersImages[i].style.backgroundSize = `cover`;
    };
  }
  const img = new Image();
  img.src = rightAns;
  img.onload = () => {
    answerImg.style.backgroundImage = `url(${img.src})`;
  };
};

function addQuestionText() {
  const questionArtist = data[currentCategory].author;
  questionText.textContent = `Автором какой картины является ${questionArtist}?`;
};

artQuestionPage.addEventListener('click', (e) => {
  if (event.target.classList.contains('answer-img')) {
    answersArr = [];
    if (event.target.style.backgroundImage.split('"')[1] === rightAns) {
      contentPopup.classList.add('right');
      categoryCounter++;
    } else {
      contentPopup.classList.add('false');
    }
    addPopupInfo();
    questionCounter++;
    answerPopup.classList.toggle('hidden');
  }
});

//answer popup code
nextQuestionBtn.addEventListener('click', () => {
  if (questionCounter < 10) {
    currentCategory = +currentCategory + 1;
    if (flag == 0) {
      selectQuestionPicture();
      addAnswers();
    } else {
      selectAnswersPictures();
      addQuestionText();
    }
    answerPopup.classList.toggle('hidden');
    contentPopup.classList.remove('false');
    contentPopup.classList.remove('right');
  } else {
    answerPopup.classList.toggle('hidden');
    if (categoryCounter < 10) {
      clearScore.textContent = `${categoryCounter} / 10`;
      clearPopup.classList.toggle('hidden');
      categoryCounter = 0;
    } else {
      topscorePopup.classList.toggle('hidden');
      categoryCounter = 0;
    }
  }
});

// clear popup code
const homeBtn = clearPopup.querySelector('.clear-popup-home-btn');
const categoryPageClearBtn = clearPopup.querySelector('.categories-popup-home-btn');

homeBtn.addEventListener('click', () => {
  clearScore.textContent = '';
  clearPopup.classList.toggle('hidden');
  if (flag === 0) {
    picQuestionPage.classList.toggle('hidden');
  } else {
    artQuestionPage.classList.toggle('hidden');
  }
  startPage.classList.toggle('hidden');
});

categoryPageClearBtn.addEventListener('click', () => {
  clearScore.textContent = '';
  clearPopup.classList.toggle('hidden');
  if (flag === 0) {
    picQuestionPage.classList.toggle('hidden');
  } else {
    artQuestionPage.classList.toggle('hidden');
  }
  categoryPage.classList.toggle('hidden');
});
