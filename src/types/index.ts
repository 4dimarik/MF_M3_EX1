interface WeatherSrc {
  bgUrl: string;
  iconSrc: string;
  audioSrc: string;
}
interface Data {
  [id: string]: WeatherSrc;
}

interface CurrentSound {
  name: string | null;
  btn: HTMLElement | null;
}

export { Data, CurrentSound };
