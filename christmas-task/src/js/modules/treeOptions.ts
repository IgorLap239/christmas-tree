class TreeOptions {
  static setTree() {
    const treeSelectContainer = document.querySelector('.tree-container') as HTMLElement;
    const mainTree = document.querySelector('.main-tree') as HTMLImageElement;
    treeSelectContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('tree')) {
        mainTree.src = `../assets/tree/${target.dataset.tree}.png`;
      }
    });
  }

  static backGround() {
    const backgroundSelectContainer = document.querySelector('.bg-container') as HTMLElement;
    const mainTreeContainer = document.querySelector('.main-tree-container') as HTMLElement;
    backgroundSelectContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('bg')) {
        mainTreeContainer.style.backgroundImage = `url("../assets/bg/${target.dataset.bg}.jpg")`;
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

    snowButton.addEventListener('click', () => {
      snowfallStatus = !snowfallStatus;
      if (snowfallStatus) {
        interval = setInterval(this.snowfall, 50);
      } else {
        clearInterval(interval);
      }
    });
  }

  static init() {
    this.setTree();
    this.backGround();
    this.startSnowfall();
  }
}

export default TreeOptions;
