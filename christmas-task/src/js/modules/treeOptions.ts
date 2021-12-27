import LocalStorage from './localStorage';

class TreeOptions {
  static setTree() {
    const treeSelectContainer = document.querySelector('.tree-container') as HTMLElement;
    const mainTree = document.querySelector('.main-tree') as HTMLImageElement;

    if (LocalStorage.loadTree()) {
      mainTree.src = LocalStorage.loadTree();
    }

    treeSelectContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('tree')) {
        mainTree.src = `../assets/tree/${target.dataset.tree}.png`;
        LocalStorage.saveTree(mainTree.src);
      }
    });
  }

  static setBackground() {
    const backgroundSelectContainer = document.querySelector('.bg-container') as HTMLElement;
    const mainTreeContainer = document.querySelector('.main-tree-container') as HTMLElement;

    if (LocalStorage.loadTreeBackground()) {
      mainTreeContainer.style.backgroundImage = LocalStorage.loadTreeBackground();
    }

    backgroundSelectContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('bg')) {
        mainTreeContainer.style.backgroundImage = `url("../assets/bg/${target.dataset.bg}.jpg")`;
        LocalStorage.saveTreeBackground(`url("../assets/bg/${target.dataset.bg}.jpg")`);
      }
    });
  }

  static snowfall() {
    const snowfallContainer = document.querySelector('.blur .page-container') as HTMLElement;
    const snowFlake = document.createElement('i') as HTMLElement;
    snowFlake.classList.add('fa');
    snowFlake.classList.add('fa-snowflake-o');
    snowFlake.style.left = `${Number(Math.random()) * Number(window.innerWidth)}px`;
    snowFlake.style.animationDuration = `${Number(Math.random()) * 3 + 2}s`;
    snowFlake.style.opacity = Number(Math.random()).toString();
    snowFlake.style.fontSize = `${Number(Math.random()) * 10 + 10}px`;
    snowfallContainer.appendChild(snowFlake);
    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }

  static startSnowfall() {
    const snowButton = document.querySelector('.snow-control') as HTMLElement;
    let interval: ReturnType<typeof setInterval>;
    let snowfallStatus = false;

    if (LocalStorage.loadSnowfall()) {
      snowfallStatus = LocalStorage.loadSnowfall();
      snowButton.classList.add('active');
      interval = setInterval(this.snowfall, 50);
    }

    snowButton.addEventListener('click', () => {
      snowfallStatus = !snowfallStatus;

      if (snowfallStatus) {
        snowButton.classList.add('active');
        interval = setInterval(this.snowfall, 50);
        LocalStorage.saveSnowfallStatus(snowfallStatus);
      } else {
        snowButton.classList.remove('active');
        clearInterval(interval);
        LocalStorage.saveSnowfallStatus(snowfallStatus);
      }
    });
  }

  static playAudio() {
    const playButton = document.querySelector('.audio-control') as HTMLElement;
    const audio = new Audio();
    audio.src = './assets/audio/audio.mp3';
    let isPlay = false;

    function playLoaded() {
      isPlay = LocalStorage.loadAudioStatus();
      audio.play();
      playButton.classList.add('active');
      window.removeEventListener('click', playLoaded);
    }

    if (LocalStorage.loadAudioStatus()) {
      window.addEventListener('click', playLoaded);
    }

    playButton.addEventListener('click', () => {
      if (!isPlay) {
        audio.play();
        isPlay = true;
        playButton.classList.add('active');
        LocalStorage.saveAudioStatus(isPlay);
      } else {
        audio.pause();
        isPlay = false;
        playButton.classList.remove('active');
        LocalStorage.saveAudioStatus(isPlay);
      }
    });
  }

  static clearOptions() {
    const clearButton = document.querySelector('.favorites-menu .reset') as HTMLElement;
    clearButton.addEventListener('click', LocalStorage.clearTreeLocalStorage);
  }

  static init() {
    this.setTree();
    this.setBackground();
    this.startSnowfall();
    this.playAudio();
    this.clearOptions();
  }
}

export default TreeOptions;
