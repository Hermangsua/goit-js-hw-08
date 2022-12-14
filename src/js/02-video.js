import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_STORAGE = 'videoplayer-current-time';
player.on(
  'timeupdate',
  throttle(event => {
    localStorage.setItem(KEY_STORAGE, event.seconds);
  }, 1000)
);
player
  .setCurrentTime(localStorage.getItem(KEY_STORAGE))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
