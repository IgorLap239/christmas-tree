const start = () => {
  const startPage = document.querySelector('.start-page-wrapper'),
        settingsButton = startPage.querySelector('.settings-button'),
        pictureQuizBtn = startPage.querySelector('.picture'),
        artistQuizBtn = startPage.querySelector('.artist'),
        settingsPage = document.querySelector('.settings-wrapper'),
        QuizPage = document.querySelector('.category-page-wrapper');

  settingsButton.addEventListener('click', () => {
    startPage.classList.add('hidden');
    settingsPage.classList.remove('hidden');
  });

  pictureQuizBtn.addEventListener('click', () => {
    startPage.classList.add('hidden');
    QuizPage.classList.remove('hidden');
  });

  artistQuizBtn.addEventListener('click', () => {
    startPage.classList.add('hidden');
    QuizPage.classList.remove('hidden');
  });
};

start();

// export default arrowUp;
