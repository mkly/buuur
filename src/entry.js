import _ from 'lodash';
import { createStore } from 'redux';
import io from 'socket.io-client';
import normie from './js/normie';
const socket = io.connect();


import 'purecss';
import './css/style.css';

normie(window);

import { getImages } from './js/api';
import videoStream from './js/video-stream';
import generateGif from './js/generate-gif';
import getRender from './js/get-render';
import setupCanvas from './js/setup-canvas';
import actions from './js/actions';
import { images as imagesReducer } from './js/reducers';

const store = createStore(imagesReducer);

const video = document.getElementById("webcam"),
      snapBtn = document.getElementById("snap"),
      clearBtn = document.getElementById("clear-button"),
      canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      result = document.getElementById("result"),
      width = 160,
      height = 120,
      imagesContainer = document.getElementById("images"),
      imageContainers = imagesContainer.getElementsByTagName("li"),
      clearButtonContainer = document.getElementById("clear-button-container"),
      imagesTemplate = _.template(document.getElementById("images-template").innerHTML),
      clearButtonTemplate = _.template(document.getElementById("clear-button-template").innerHTML);

videoStream(window, video);

store.subscribe(
  getRender(
    document,
    store,
    imagesContainer,
    imagesTemplate,
    clearButtonContainer,
    clearButtonTemplate
  )
);

getImages(store);

socket.on('buuur added', function(data) {
  store.dispatch(actions.creators.addImage(data.img));
  store.dispatch(actions.creators.popImage());
});

setupCanvas(canvas, ctx, height, width);

snapBtn.onclick = function() {
  generateGif(
    window,
    snapBtn,
    height,
    width,
    video,
    result,
    ctx,
    socket
  );
};
