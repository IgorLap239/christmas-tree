/*global module*/
let currentPage;
let previosPage;
let audioFlag = 1;
let timerFlag = 0;
const audioLS = 'audio',
      timerLS = 'timer',
      timeLS = 'time';
const startPage = document.querySelector('.start-page-wrapper'),
      settingsPage = document.querySelector('.settings-wrapper'),
      categoryPage = document.querySelector('.category-page-wrapper'),
      timeInput = settingsPage.querySelector('.number'),
      timerOnBtn = settingsPage.querySelector('.timer-btn'),
      volumeInput = settingsPage.querySelector('.volume-range');

let playTime = timeInput.value;

function playAudio(index) {
  if (audioFlag == 1) {
    let audio = new Audio();
    switch(index) {
      case 1:
        audio.src = '/src/audio/correct-answer.mp3';
        break;
      case 2:
        audio.src = '/src/audio/wrong-answer.mp3';
        break;
      case 3:
        audio.src = '/src/audio/round-done.mp3';
        break;
    }
    audio.play();
  }
};

loadSettings();

/*start page module*/
const settingsButton = startPage.querySelector('.settings-button'),
      pictureQuizBtn = startPage.querySelector('.picture'),
      artistQuizBtn = startPage.querySelector('.artist');

settingsButton.addEventListener('click', () => {
  startPage.classList.toggle('hidden');
  settingsPage.classList.toggle('hidden');
  previosPage = startPage;
  currentPage = settingsPage;
});

pictureQuizBtn.addEventListener('click', () => {
  startPage.classList.toggle('hidden');
  categoryPage.classList.toggle('hidden');
  previosPage = startPage;
  currentPage = categoryPage;
});

artistQuizBtn.addEventListener('click', () => {
  startPage.classList.toggle('hidden');
  categoryPage.classList.toggle('hidden');
  previosPage = startPage;
  currentPage = categoryPage;
});

/*settings module*/
const settingsHomeButton = settingsPage.querySelector('.close');
const volumeOffBtn = settingsPage.querySelector('.mute');
const volumeOnBtn = settingsPage.querySelector('.sound');
const saveBtn = settingsPage.querySelector('.save');
const defaultBtn = settingsPage.querySelector('.default');

settingsHomeButton.addEventListener('click', () => {
  previosPage.classList.toggle('hidden');
  settingsPage.classList.toggle('hidden');
  currentPage = previosPage;
  previosPage = settingsPage;
});

volumeOffBtn.addEventListener('click', () => {
  if (audioFlag === 1) {
    audioFlag = 0;
    volumeInput.value = 0;
    volumeInput.style.backgroundColor = '#FFFFFF';
  }
});

volumeOnBtn.addEventListener('click', () => {
  if (audioFlag === 0) {
    audioFlag = 1;
    volumeInput.value = 1;
    volumeInput.style.backgroundColor = '#710707';
  }
});

function addTimer() {
  document.querySelectorAll('.question-timer').forEach((e) => {
    e.classList.remove('hidden');
  });
  document.querySelectorAll('.current-time').forEach((e) => {
    e.textContent = timeInput.value;
  });
};

function removeTimer() {
  document.querySelectorAll('.question-timer').forEach((e) => {
    e.classList.add('hidden');
  });
};

timerOnBtn.addEventListener('click', () => {
  if (timerOnBtn.checked) {
    timerFlag = 1;
    playTime = timeInput.value;
  } else {
    timerFlag = 0;
  }
});

timeInput.addEventListener('change', () => {
  playTime = timeInput.value;
  document.querySelectorAll('.current-time').forEach((e) => {
    e.textContent = timeInput.value;
  });
});

saveBtn.addEventListener('click', () => {
  if (timerFlag == 1) {
    addTimer();
  } else {
    removeTimer();
  }
  saveSettings();
});

defaultBtn.addEventListener('click', () => {
  audioFlag = 1;
  timerFlag = 1;
  timeInput.value = 20;
  playTime = timeInput.value;
  saveSettings();
});

function saveSettings() {
  localStorage.setItem(audioLS, audioFlag);
  localStorage.setItem(timerLS, timerFlag);
  localStorage.setItem(timeLS, timeInput.value);
};

function loadSettings(){
  if (localStorage.getItem(audioLS) != null) {
    audioFlag = +localStorage.getItem(audioLS);
    timerFlag = +localStorage.getItem(timerLS);
    playTime = +localStorage.getItem(timeLS);
    if (timerFlag == 1) {
      addTimer();
      timerOnBtn.checked = 'true';
    } else {
      removeTimer();
    }
    if (audioFlag == 1) {
      volumeInput.value = 1;
      volumeInput.style.backgroundColor = '#710707';
    } else {
      volumeInput.value = 0;
      volumeInput.style.backgroundColor = '#FFFFFF';
    }
  }
}

/*categories module*/
/* eslint-disable linebreak-style */
const categoryHomeButton = categoryPage.querySelector('.home');
const scoreButton = categoryPage.querySelector('.score-link');
const categoriesCovers = categoryPage.querySelectorAll('.category-cover');
const categoriesBlock = categoryPage.querySelector('.categories');
const pictureQuiz = document.querySelector('.picture-question-wrapper');
const artistQuiz = document.querySelector('.artist-question-wrapper');
const categoriesSettingsButton = categoryPage.querySelector('.settings-button');

let currentCategory = 0;
let categoryCounter = 0;
let data = [];
let flag = 0;

//return to start page
categoryHomeButton.addEventListener('click', () => {
  startPage.classList.toggle('hidden');
  categoryPage.classList.toggle('hidden');
  previosPage = categoryPage;
  currentPage = startPage;
});

//open settings
categoriesSettingsButton.addEventListener('click', () => {
  categoryPage.classList.toggle('hidden');
  settingsPage.classList.toggle('hidden');
  previosPage = categoryPage;
  currentPage = settingsPage;
});


//categorys cover code
let imgNum = 0;

function setCover(urlStr, index) {
  const img = new Image();
  img.src = urlStr;
  img.onload = () => {
    categoriesCovers[index].style.backgroundImage = `url(${img.src})`;
    categoriesCovers[index].style.backgroundSize = 'cover';
    categoriesCovers[index].style.transition = 'background-image 0.5s ease-in-out';
    categoriesCovers[index].style.cursor = 'pointer';
  };
}

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

pictureQuizBtn.addEventListener('click', () => {
  setCategoryCover();
  categoriesBlock.classList.add('pic-quiz');
});

artistQuizBtn.addEventListener('click', () => {
  setCategoryCover();
  categoriesBlock.classList.add('art-quiz');
});

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
    console.log(currentCategory);
    getInfo(flag);
  }
}

//play Quiz module
const answersBtns = pictureQuiz.querySelectorAll('.answer-btn');
const questionImg = pictureQuiz.querySelector('.question-img');
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

pictureQuiz.addEventListener('click', (e) => {
  if (event.target.classList.contains('answer-btn')) {
    answersArr = [];
    if (event.target.textContent === rightAns) {
      contentPopup.classList.add('right');
      playAudio(1);
      categoryCounter++;
    } else {
      contentPopup.classList.add('false');
      playAudio(2);
    }
    addPopupInfo();
    questionCounter++;
    answerPopup.classList.toggle('hidden');
  }
});

//artist question code
const answersImages = artistQuiz.querySelectorAll('.answer-img');
const questionText = artistQuiz.querySelector('.question-text');

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

artistQuiz.addEventListener('click', (e) => {
  if (event.target.classList.contains('answer-img')) {
    answersArr = [];
    if (event.target.style.backgroundImage.split('"')[1] === rightAns) {
      contentPopup.classList.add('right');
      categoryCounter++;
      playAudio(1);
    } else {
      contentPopup.classList.add('false');
      playAudio(2);
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
      playAudio(3);
      clearScore.textContent = `${categoryCounter} / 10`;
      clearPopup.classList.toggle('hidden');
      categoryDone();
      questionCounter = 0;
      categoryCounter = 0;
    } else {
      topscorePopup.classList.toggle('hidden');
      playAudio(3);
      categoryDone();
      questionCounter = 0;
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
    pictureQuiz.classList.toggle('hidden');
  } else {
    artistQuiz.classList.toggle('hidden');
  }
  startPage.classList.toggle('hidden');
});

categoryPageClearBtn.addEventListener('click', () => {
  clearScore.textContent = '';
  clearPopup.classList.toggle('hidden');
  if (flag === 0) {
    pictureQuiz.classList.toggle('hidden');
  } else {
    artistQuiz.classList.toggle('hidden');
  }
  categoryPage.classList.toggle('hidden');
});


//category finish code 
function categoryDone () {
  console.log(categoriesCovers);
  let item;
  if (flag === 0) {
    item = categoriesCovers[(currentCategory - 9) / 10];
  } else {
    item = categoriesCovers[(currentCategory - 9) / 10];
  }
  let itemCounter = item.closest('.category-item').querySelector('.category-counter');
  itemCounter.classList.toggle('hidden');
  itemCounter.textContent = `${categoryCounter} / 10`;
  item.querySelector('.done-icon').classList.toggle('hidden');
};