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

const bodyElement = document.getElementById('body');
const playerElement = document.getElementById('player');
const buttonsElement = document.querySelector('.buttons');
const buttonList = document.querySelectorAll('.button');
const volumeControl = document.querySelector('.volume-control');
