import 'purecss';
import './css/style.css';

import io from 'socket.io-client';
import normie from './js/normie';

import { getImages } from './js/api';
import generateGif from './js/generate-gif';
import actions from './js/actions';
import getStore from './js/store';

import imagesRenderer from './components/images';
import clearButtonRenderer from './components/clear_button';
import videoStream from './components/video_stream';
import './components/canvas';
import './components/result';

const snapBtn = document.getElementById('snap'),
      width = 160,
      height = 120,
      store = getStore(),
      socket = io.connect();

normie(window);
store.subscribe(imagesRenderer('images-template', 'images'));
store.subscribe(clearButtonRenderer('clear-button-template', 'clear-button-container'));
videoStream('video-stream', 'canvas', height, width);
getImages(store);

socket.on('buuur added', function(data) {
  store.dispatch(actions.creators.addImage(data.img));
  store.dispatch(actions.creators.popImage());
});

snapBtn.onclick = function() {
  const canvasElement = document.getElementById('canvas');

  generateGif(
    window,
    document.getElementById('snap'),
    height,
    width,
    document.getElementById('video-stream'),
    document.getElementById('result'),
    canvasElement.getContext('2d'),
    socket
  );
};
