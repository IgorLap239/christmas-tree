/*global module*/
let currentPage;
let previosPage;
let audioFlag = 1;
let timerFlag = 0;
let retryFlag = 0;
let flag = 0;
const audioLS = 'audio',
      timerLS = 'timer',
      timeLS = 'time',
      picResLS = 'picRes',
      artResLS = 'artRes';
const startPage = document.querySelector('.start-page-wrapper'),
      settingsPage = document.querySelector('.settings-wrapper'),
      categoryPage = document.querySelector('.category-page-wrapper'),
      timeInput = settingsPage.querySelector('.number'),
      timerOnBtn = settingsPage.querySelector('.timer-btn'),
      volumeInput = settingsPage.querySelector('.volume-range');

let playTime = timeInput.value;

/*for save categoris resulte to local storage*/
let categoryRightAnswersArr = [];
let loadArr = [];


function playAudio(index) {
  if (audioFlag == 1) {
    let audio = new Audio();
    switch(index) {
      case 1:
        audio.src = './src/audio/correct-answer.mp3';
        break;
      case 2:
        audio.src = './src/audio/wrong-answer.mp3';
        break;
      case 3:
        audio.src = './src/audio/round-done.mp3';
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
  flag = 0;
  loadArr = [];
  loadCatResults();
  startPage.classList.toggle('hidden');
  categoryPage.classList.toggle('hidden');
  previosPage = startPage;
  currentPage = categoryPage;
});

artistQuizBtn.addEventListener('click', () => {
  flag = 1;
  loadArr = [];
  loadCatResults();
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
  document.querySelectorAll('.time-range').forEach((e) => {
    e.value = timeInput.value;
    e.max = timeInput.value;
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
  document.querySelectorAll('.time-range').forEach((e) => {
    e.value = timeInput.value;
    e.max = timeInput.value;
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
    timeInput.value = playTime;
    document.querySelectorAll('.current-time').forEach((e) => {
      e.textContent = timeInput.value;
    });
    document.querySelectorAll('.time-range').forEach((e) => {
      e.value = timeInput.value;
      e.max = timeInput.value;
    });
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
const categoriesItems = categoryPage.querySelectorAll('.category-item');
const categoriesCovers = categoryPage.querySelectorAll('.category-cover');
const categoriesBlock = categoryPage.querySelector('.categories');
const pictureQuiz = document.querySelector('.picture-question-wrapper');
const artistQuiz = document.querySelector('.artist-question-wrapper');
const categoriesSettingsButton = categoryPage.querySelector('.settings-button');

let currentCategory = 0;
let categoryCounter = 0;
let data = [];
let resultData = [];

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
    categoriesCovers[index].style.backgroundSize = 'contain';
    categoriesCovers[index].style.backgroundRepeat = 'no-repeat';
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

/*result page functions*/
const categoryResultPage = document.querySelector('.results-page-wrapper');
const resultsBlock = categoryResultPage.querySelector('.results');
const infoPopup = document.querySelector('.info-popup');
const contentInfoPopup = infoPopup.querySelector('.popup-content');
const infoImg = infoPopup.querySelector('.info-popup-img');
const textsInfoPopup = infoPopup.querySelectorAll('span');
const resultItems = resultsBlock.querySelectorAll('.result-item');
const infoResultTitle = categoryResultPage.querySelector('.results-title');
const infoResultCounter = categoryResultPage.querySelector('.category-counter');

function addResultImges (curCat, num) {
  let arrTrueAns = [];
  if (loadArr.find(elem => elem.catNum == num))
    arrTrueAns = loadArr.find(elem => elem.catNum == num).rightAnsNum;
  for (let i = 0; i < 10; i++) {
    let urlStr = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${curCat + i}.webp`;
    setResultsCovers(urlStr, i, arrTrueAns);
  }
}

function setResultsCovers(urlStr, i, arr) {
  const img = new Image();
  img.src = urlStr;
  img.onload = () => {
    /*const imgContainer = document.createElement('div');
    imgContainer.classList.add('result-item');*/
    if (!arr.includes(i)) {
      resultItems[i].style.backgroundImage = `linear-gradient(black, black), url(${img.src})`;
      resultItems[i].style.backgroundBlendMode = 'saturation';
    } else {
      resultItems[i].style.backgroundImage = `url(${img.src})`;
    }
    resultItems[i].style.backgroundSize = 'contain';
    resultItems[i].style.backgroundRepeat = 'no-repeat';
    resultItems[i].style.cursor = 'pointer';
  };
}

async function getResultInfo() {
  const url = `https://raw.githubusercontent.com/IgorLap239/image-data/master/images.json`;
  try {
    const res = await fetch(url);
    resultData = await res.json();
  } catch (e) {
    console.log(e);
  }
}

function addInfo (index) {
  const urlStr = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${index}.webp`;
  const img = new Image();
  img.src = urlStr;
  img.onload = () => {
    infoImg.style.backgroundImage = `url(${img.src})`;
    infoImg.style.backgroundSize = 'contain';
    infoImg.style.backgroundRepeat = 'no-repeat';
  };
  textsInfoPopup[0].textContent = resultData[index].name;
  textsInfoPopup[1].textContent = resultData[index].author;
  textsInfoPopup[2].textContent = resultData[index].year;
}

function showInfo (event) {
  const resItemsList = [...resultItems];
  const itemNum = +resItemsList.indexOf(event.target) + currentCategory;
  addInfo(itemNum);
  infoPopup.classList.toggle('hidden');
}

categoryResultPage.addEventListener('click', (e) => {
  if (event.target.classList.contains('result-item')) {
    showInfo(e);
  } else if (event.target.closest('.categories-btn')) {
    currentPage.classList.toggle('hidden');
    previosPage.classList.toggle('hidden');
    currentPage = previosPage;
  } else if (event.target.classList.contains('home')) {
    currentPage.classList.toggle('hidden');
    startPage.classList.toggle('hidden');
    currentPage = startPage;
  }
});

infoPopup.addEventListener('click', (e) => {
  if (event.target.classList.contains('info-popup-btn') || event.target.closest('body'))
    infoPopup.classList.toggle('hidden');
});

/*end of result page functions*/


//start quiz codes
categoryPage.addEventListener('click', () => {
  const target = event.target
  if (target.classList.contains('category-cover')) {
    let tmpArr = target.style.backgroundImage.split('/');
    currentCategory = tmpArr[tmpArr.length - 1].split('.')[0];
    startQuiz();
  } else if (target.classList.contains('retry')) {
    retryFlag = 1;
    let tmpArr = target.closest('.category-cover').style.backgroundImage.split('/');
    currentCategory = tmpArr[tmpArr.length - 1].split('.')[0];
    startQuiz();
  } else if (target.classList.contains('score-link-block') || target.closest('.score-link-block')) {
    let tmpArr = target.closest('.category-cover').style.backgroundImage.split('/');
    currentCategory = +tmpArr[tmpArr.length - 1].split('.')[0];
    const catItemsList = [...categoriesItems];
    const catNum = catItemsList.indexOf(target.closest('.category-item'));
    infoResultTitle.textContent = target.closest('.category-item').querySelector('.category-item-title').textContent;
    infoResultCounter.textContent = target.closest('.category-item').querySelector('.category-counter').textContent;
    getResultInfo();
    addResultImges(currentCategory, catNum);
    categoryPage.classList.toggle('hidden');
    categoryResultPage.classList.toggle('hidden');
    previosPage = categoryPage;
    currentPage = categoryResultPage;
  }
});

function startQuiz() {
  if (flag == 0) {
    pictureQuiz.classList.toggle('hidden');
    categoryPage.classList.toggle('hidden');
    getInfo(flag);
  } else {
    artistQuiz.classList.toggle('hidden');
    categoryPage.classList.toggle('hidden');
    getInfo(flag);
  }
}

function selectDoneCat(i, count) {
  let item = categoriesCovers[i];
  const itemCounter = item.closest('.category-item').querySelector('.category-counter');
  itemCounter.classList.remove('hidden');
  itemCounter.textContent = `${count} / 10`;
  item.querySelector('.done').classList.remove('hidden');
  item.querySelector('.score-link-block').classList.remove('hidden');
}

function loadCatResults() {
  if (flag == 0) {
    if (localStorage.getItem(picResLS) != null) {
      loadArr = JSON.parse(localStorage.getItem(picResLS));
    }
  } else if (flag == 1) {
    if (localStorage.getItem(artResLS) != null) {
      loadArr = JSON.parse(localStorage.getItem(artResLS));
    }
  }
  loadArr.forEach(e => {
    selectDoneCat(e.catNum, e.catRes);
  })
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
const exitPopup = document.querySelector('.exit-popup');

const pictureQuizHomeBtn = pictureQuiz.querySelector('.home');
const artistQuizHomeBtn = artistQuiz.querySelector('.home');
const pictureQuizRetBtng = pictureQuiz.querySelector('.return');
const artistQuizRetBtng = artistQuiz.querySelector('.return');

let questionCounter = 0;
let authorsArr = [];
let answersArr = [];
let rightAns = '';
let selectTimer;
let timerInput;
let timerUse = null;

//quiz code
pictureQuizHomeBtn.addEventListener('click', () => {
  exitPopup.classList.toggle('hidden');
  currentPage = startPage;
});

artistQuizHomeBtn.addEventListener('click', () => {
  exitPopup.classList.toggle('hidden');
  currentPage = startPage;
});

pictureQuizRetBtng.addEventListener('click', () => {
  exitPopup.classList.toggle('hidden');
  currentPage = categoryPage;
});

artistQuizRetBtng.addEventListener('click', () => {
  exitPopup.classList.toggle('hidden');
  currentPage = categoryPage;
});

async function getInfo() {
  const url = `https://raw.githubusercontent.com/IgorLap239/image-data/master/images.json`;
  try {
    const res = await fetch(url);
    data = await res.json();
    for (let i = 0; i <= 240; i++) {
      authorsArr.push(data[i].author);
    }
    if (flag == 0) {
      selectTimer = pictureQuiz.querySelector('.current-time');
      timerInput = pictureQuiz.querySelector('.time-range');
      if (timerFlag == 1)
        startTimer();
      selectQuestionPicture();
      addAnswers();
    } else {
      selectTimer = artistQuiz.querySelector('.current-time');
      timerInput = artistQuiz.querySelector('.time-range');
      if (timerFlag == 1)
        startTimer();
      selectAnswersPictures();
      addQuestionText();
    }
  } catch (e) {
    console.log(e);
  }
}

function showAnswer (event) {
  if (event == 'timer') {
    contentPopup.classList.add('false');
    playAudio(2);
    addPopupInfo();
    questionCounter++;
    answerPopup.classList.toggle('hidden');
  } else {
    if (event.target.classList.contains('answer-btn') || event.target.classList.contains('answer-img')) {
      if (timerUse != null) {
        clearInterval(timerUse);
      }
      answersArr = [];
      if (event.target.textContent === rightAns || event.target.style.backgroundImage === `url("${rightAns}")`) {
        contentPopup.classList.add('right');
        playAudio(1);
        categoryCounter++;
        categoryRightAnswersArr.push(questionCounter);
      } else {
        contentPopup.classList.add('false');
        playAudio(2);
      }
      addPopupInfo();
      questionCounter++;
      answerPopup.classList.toggle('hidden');
    }
  }
}

function startTimer() {
  let timer = playTime;
  let startTime = playTime;
  let percent = (timerInput.value / startTime) * 100;
  timerUse = setInterval(function () {
      selectTimer.textContent = timer;
      timerInput.value = timer;
      percent = (timerInput.value / startTime) * 100;
      timerInput.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`
      if (--timer < 0) {
        clearInterval(timerUse);
        showAnswer('timer');
      }
  }, 1000);
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

//picture question code
function selectQuestionPicture () {
  let urlStr = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${currentCategory}.webp`;
  const img = new Image();
  img.src = urlStr;
  img.onload = () => {
    questionImg.style.backgroundImage = `url(${img.src})`;
    answerImg.style.backgroundImage = `url(${img.src})`;
    answerImg.style.backgroundSize = 'contain';
    answerImg.style.backgroundRepeat = 'no-repeat';
  };
}

function contains(arr, elem) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === elem) {
      return true;
    }
  }
  return false;
}

function getAnswer(ctg, check) {
  let x = getRandomNum();
  let newAnswer;
    newAnswer = authorsArr[x];
  if (contains(check, newAnswer)) {
    getAnswer();
  } else {
    if (ctg == 'pic') {
    answersArr.push(newAnswer);
    } else if (ctg == 'art') {
      newAnswer = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${x}.webp`;
      answersArr.push(newAnswer);
    }
  }
}

function addAnswers() {
  let checkArr = [];
  checkArr.push(data[currentCategory].author);
  rightAns = data[currentCategory].author;
  answersArr.push(rightAns);
  for (let j = 0; j < 3; j++) {
    getAnswer('pic', checkArr);
  }
  answersArr = shuffle(answersArr);
  for (let i = 0; i < 4; i++) {
    answersBtns[i].textContent = answersArr[i];
  }
};

pictureQuiz.addEventListener('click', (e) => {
  showAnswer(e);
});

//artist question code
const answersImages = artistQuiz.querySelectorAll('.answer-img');
const questionText = artistQuiz.querySelector('.question-text');

function selectAnswersPictures () {
  let checkArr = []
  checkArr.push(data[currentCategory].author);
  rightAns = `https://raw.githubusercontent.com/IgorLap239/image-data/master/img/${data[currentCategory].imageNum}.webp`;
  answersArr.push(rightAns);
  for (let j = 0; j < 3; j++) {
    getAnswer('art', checkArr);
  }
  answersArr = shuffle(answersArr);
  for (let i = 0; i < 4; i++) {
    const img = new Image();
    img.src = answersArr[i];
    img.onload = () => {
      answersImages[i].style.backgroundImage = `url(${img.src})`;
      answersImages[i].style.backgroundSize = `contain`;
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
  showAnswer(e);
});

//answer popup code
nextQuestionBtn.addEventListener('click', () => {
  if (questionCounter < 10) {
    currentCategory = +currentCategory + 1;
    if (flag == 0) {
      selectQuestionPicture();
      addAnswers();
      if (timerFlag == 1)
        startTimer();
    } else {
      selectAnswersPictures();
      addQuestionText();
      if (timerFlag == 1)
        startTimer();
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
function categoryDone() {
  let item;
  let index = 0;
  if (flag === 0) {
    index = (currentCategory - 9) / 10;
    item = categoriesCovers[index];
  } else {
    index = (currentCategory - 129) / 10;
    item = categoriesCovers[index];
  }
  const itemCounter = item.closest('.category-item').querySelector('.category-counter');
  itemCounter.classList.remove('hidden');
  itemCounter.textContent = `${categoryCounter} / 10`;
  item.querySelector('.done').classList.remove('hidden');
  item.querySelector('.score-link-block').classList.remove('hidden');
  if (retryFlag == 1) {
    checkLS(index);
  }
  let catResObj = {
    catNum: index,
    catRes: categoryCounter,
    rightAnsNum: categoryRightAnswersArr
  }
  loadArr.push(catResObj);
  saveCategoriesResults();
  retryFlag = 0;
  categoryRightAnswersArr = [];
};

function checkLS(i) {
  loadArr.forEach(e => {
    if (e.catNum == i) {
      loadArr.splice(loadArr.indexOf(e),1);
    }
  });
}

function saveCategoriesResults() {
  if (flag === 0) {
    localStorage.setItem(picResLS, JSON.stringify(loadArr));
  } else {
    localStorage.setItem(artResLS, JSON.stringify(loadArr));
  }
}

/*exit popup code*/
const cancelBtn = exitPopup.querySelector('.cansel-exit');
const exitBtn = exitPopup.querySelector('.exit');

cancelBtn.addEventListener('click', () => {
  exitPopup.classList.toggle('hidden');
});

exitBtn.addEventListener('click', () => {
  exitPopup.classList.toggle('hidden');
  if (flag === 0) {
    pictureQuiz.classList.toggle('hidden');
  } else {
    artistQuiz.classList.toggle('hidden');
  }
  if (!answerPopup.classList.contains('hidden'))
    answerPopup.classList.toggle('hidden');
  currentPage.classList.toggle('hidden');
  if (timerUse)
    clearInterval(timerUse);
  questionCounter = 0;
  categoryCounter = 0;
  answersArr = [];
  retryFlag = 0;
});
