import './index.scss';

interface Data {
  [id: string]: WeatherSrc;
}

interface WeatherSrc {
  bgUrl: string;
  iconSrc: string;
  audioSrc: string;
}

// Объект с ресурсами по погоде
const data: Data = {
  summer: {
    bgUrl: '/assets/summer-bg.jpg',
    iconSrc: '/assets/icons/sun.svg',
    audioSrc: '/assets/sounds/summer.mp3',
  },
  rainy: {
    bgUrl: '/assets/rainy-bg.jpg',
    iconSrc: '/assets/icons/cloud-rain.svg',
    audioSrc: '/assets/sounds/rain.mp3',
  },
  winter: {
    bgUrl: '/assets/winter-bg.jpg',
    iconSrc: '/assets/icons/cloud-snow.svg',
    audioSrc: '/assets/sounds/winter.mp3',
  },
};

const pauseIconSrc: string = '/assets/icons/pause.svg';

// Получение интерактивных элементов
const bodyElement = document.getElementById('body') as HTMLElement;
const playerElement = document.getElementById('player') as HTMLAudioElement;
const buttonsElement = document.querySelector('.buttons') as HTMLElement;
const buttonList = document.querySelectorAll(
  '.button'
) as NodeListOf<HTMLElement>;
const volumeControl = document.querySelector('.volume-control') as HTMLElement;

// Установка фонового изображения по умолчанию
bodyElement.style.backgroundImage = "url('/assets/summer-bg.jpg')";

// Установка фонового изображения для каждой кнопки
buttonList.forEach((button) => {
  const { name } = button.dataset;
  if (name) {
    button.style.backgroundImage = `url('${data[name].bgUrl}')`;
  }
});

function isExistDataAttr(val: string | undefined): val is string {
  return typeof val === 'string';
}

function isHTMLElement(val: Element | null): val is HTMLElement {
  return val instanceof HTMLElement;
}

function setImageSrc(imgElement: HTMLImageElement | null, src: string): void {
  if (imgElement) {
    imgElement.src = src;
  }
}

// Установка слушателя события по нажатию кнопки
buttonsElement.addEventListener('click', ({ target }) => {
  if (target instanceof HTMLElement) {
    const button = target.closest('.button');
    if (isHTMLElement(button)) {
      const btnName = button.dataset.name;
      const currentSoundName = playerElement.dataset.soundName;
      if (isExistDataAttr(btnName) && isExistDataAttr(currentSoundName)) {
        if (btnName === currentSoundName) {
          const imgElement = button.querySelector('img');
          if (playerElement.paused) {
            setImageSrc(imgElement, data[btnName].iconSrc);
            playerElement.play();
          } else {
            setImageSrc(imgElement, pauseIconSrc);
            playerElement.pause();
          }
        } else {
          if (currentSoundName) {
            const playButton = document.querySelector(
              `[data-name="${currentSoundName}"]`
            );
            if (playButton)
              setImageSrc(
                playButton.querySelector('img'),
                data[currentSoundName].iconSrc
              );
          }

          bodyElement.style.backgroundImage = `url('${data[btnName].bgUrl}')`;

          playerElement.dataset.soundName = btnName;
          playerElement.src = data[btnName].audioSrc;
          playerElement.play();
        }
      }
    }
  }
});

// Установка слушателя события при перемещении ползунка для изменения громкости
volumeControl.addEventListener('change', ({ target }) => {
  if (target instanceof HTMLInputElement) {
    playerElement.volume = +target.value / 10;
  }
});
