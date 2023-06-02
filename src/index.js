import './index.scss';

const data = {
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

const pauseIconSrc = '/assets/icons/pause.svg';

const bodyElement = document.getElementById('body');
const playerElement = document.getElementById('player');
const buttonsElement = document.querySelector('.buttons');
const buttonList = document.querySelectorAll('.button');
const volumeControl = document.querySelector('.volume-control');

bodyElement.style.backgroundImage = "url('/assets/summer-bg.jpg')";

buttonList.forEach((button) => {
  const { name } = button.dataset;
  button.style.backgroundImage = `url('${data[name].bgUrl}')`;
});

buttonsElement.addEventListener('click', (e) => {
  const button = e.target.closest('.button');
  if (button) {
    const { name: btnName } = button.dataset;
    const currentSoundName = playerElement.dataset.soundName;
    if (btnName === currentSoundName) {
      if (playerElement.paused) {
        button.querySelector('img').src = data[btnName].iconSrc;
        playerElement.play();
      } else {
        button.querySelector('img').src = pauseIconSrc;
        playerElement.pause();
      }
    } else {
      if (currentSoundName) {
        const playButton = document.querySelector(
          `[data-name="${currentSoundName}"]`
        );
        playButton.querySelector('img').src = data[currentSoundName].iconSrc;
      }

      playerElement.dataset.soundName = btnName;
      playerElement.src = data[btnName].audioSrc;
      playerElement.play();
    }
  }
});

volumeControl.addEventListener('change', ({ target }) => {
  playerElement.volume = target.value / 10;
});
