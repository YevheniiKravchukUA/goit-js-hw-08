import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);

function setVideoTime(event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
}
console.log(throttle);
player.on('timeupdate', throttle(setVideoTime, 1000));

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(error.name);
        break;

      default:
        console.log(error.name);
        break;
    }
  });
