import LocalStorage from './localStorage';

class Garland {
  static init() {
    const garlandSwitch = document.querySelector('.onoffswitch-checkbox') as HTMLInputElement;
    const garlandControlBlock = document.querySelector('.garland-btns') as HTMLElement;
    if (LocalStorage.loadGarlandStatus()) {
      garlandSwitch.checked = LocalStorage.loadGarlandStatus();
      this.garlandDisplay();
    }
    garlandSwitch.addEventListener('change', () => {
      if (garlandSwitch.checked) {
        this.garlandDisplay();
      } else {
        this.garlandRemove();
      }
    });
    garlandControlBlock.addEventListener('click', this.switchGarlandColor.bind(this));
  }

  static garlandDisplay(color = 'multicolor') {
    let garlandColor = color;
    if (LocalStorage.loadGarlandColor()) {
      garlandColor = LocalStorage.loadGarlandColor();
    }
    const mapElement = document.querySelector('map') as HTMLElement;
    const garlandContainer = document.createElement('div') as HTMLElement;
    garlandContainer.classList.add('garland-tree-container');
    mapElement.before(garlandContainer);
    let startPosition: number = 120;
    const positionStep: number = 50;
    let bulbCounter = 5;
    let rotateStart = 65;
    let rotateStep = 12;
    for (let i: number = 0; i <= 60; i += 10) {
      const garlandLevel = document.createElement('ul') as HTMLElement;
      garlandLevel.classList.add('lightrope');
      garlandLevel.style.width = `${startPosition}px`;
      garlandLevel.style.height = `${startPosition}px`;
      if (i !== 0) {
        rotateStart = 50;
      }
      for (let j: number = 0; j < bulbCounter; j += 1) {
        const garlandBulb = document.createElement('li') as HTMLElement;
        garlandBulb.classList.add(`${garlandColor}`);
        const translateStart = startPosition / 2;
        garlandBulb.style.transform = `rotate(${rotateStart}deg) translate(${translateStart}px) rotate(${-rotateStart}deg)`;
        garlandLevel.append(garlandBulb);
        rotateStart += rotateStep;
      }
      if (rotateStep !== 6) {
        rotateStep -= 2;
      }
      startPosition = startPosition + positionStep + i;
      if (bulbCounter !== 14) {
        bulbCounter += 3;
      }
      garlandContainer.append(garlandLevel);
    }
  }

  static switchGarlandColor(e: Event) {
    const target = e.target as HTMLElement;
    const garlandSwitch = document.querySelector('.onoffswitch-checkbox') as HTMLInputElement;
    if (target.classList.contains('color-btn')) {
      if (document.querySelector<HTMLElement>('.garland-tree-container')) {
        this.garlandRemove();
      }
      garlandSwitch.checked = true;
      LocalStorage.saveGarlandColor(target.dataset.color);
      LocalStorage.saveGarlandStatus(garlandSwitch.checked);
      this.garlandDisplay(target.dataset.color);
    }
  }

  static garlandRemove() {
    const garlandContainer = document.querySelector('.garland-tree-container') as HTMLElement;
    garlandContainer.remove();
  }
}

export default Garland;
