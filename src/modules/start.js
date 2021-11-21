const start = () => {
  const startPage = document.querySelector('.start-page-wrapper'),
        settingsButton = startPage.querySelector('.settings-button'),
        pictureQuizBtn = startPage.querySelector('.picture'),
        artistQuizBtn = startPage.querySelector('.artist'),
        settingsPage = document.querySelector('.settings-wrapper'),
        QuizPage = document.querySelector('.category-page-wrapper');

  settingsButton.addEventListener('click', () => {
    startPage.classList.toggle('hidden');
    settingsPage.classList.toggle('hidden');
  });

  pictureQuizBtn.addEventListener('click', () => {
    startPage.classList.toggle('hidden');
    QuizPage.classList.toggle('hidden');
  });

  artistQuizBtn.addEventListener('click', () => {
    startPage.classList.toggle('hidden');
    QuizPage.classList.toggle('hidden');
  });
};

start();

// export default arrowUp;
