import './index.scss';
import { Data, CurrentSound } from './types/index';

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
//
let currentSoundName: string;
const currentSound: CurrentSound = {
  name: null,
  btn: null,
};
// Установка фонового изображения для каждой кнопки
buttonList.forEach((button) => {
  const { name } = button.dataset;
  if (name) {
    button.style.backgroundImage = `url('${data[name].bgUrl}')`;
  }
});

// Функция определяет существует ли data атрибут в HTMLElement
function isExistDataAttr(val: string | undefined): val is string {
  return typeof val === 'string';
}

// Функция изменяет иконку кнопки
function setBtnIcon(btnElement: HTMLElement, src: string): void {
  const imgElement = btnElement.querySelector('img');
  if (imgElement) {
    imgElement.src = src;
  }
}

// функция выполняет дейцствия при нажатии на кнопку с текущим звуком
function onClickCurrentSoundBtn(
  btnElement: HTMLElement,
  btnName: string
): void {
  if (playerElement.paused) {
    setBtnIcon(btnElement, data[btnName].iconSrc);
    playerElement.play();
  } else {
    setBtnIcon(btnElement, pauseIconSrc);
    playerElement.pause();
  }
}

// функция выполняет дейцствия при нажатии на кнопку с новым звуком
const onClickNewSoundBtn = (btnElement: HTMLElement, btnName: string): void => {
  if (currentSound.btn && currentSound.name) {
    setBtnIcon(currentSound.btn, data[currentSound.name].iconSrc);
  }

  currentSound.btn = btnElement;
  currentSound.name = btnName;

  bodyElement.style.backgroundImage = `url('${data[btnName].bgUrl}')`;

  playerElement.src = data[btnName].audioSrc;
  playerElement.play();
};

// Установка слушателя события по нажатию кнопки
buttonsElement.addEventListener('click', ({ target }) => {
  if (target instanceof HTMLElement) {
    const button = target.closest('.button');
    if (button instanceof HTMLElement) {
      const btnName = button.dataset.name;
      if (!isExistDataAttr(btnName))
        throw new Error(`У элемента ${button} отсутствует атрибут data-name`);

      if (btnName === currentSound.name) {
        onClickCurrentSoundBtn(button, btnName);
      } else {
        onClickNewSoundBtn(button, btnName);
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
