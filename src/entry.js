var _ = require("lodash");
var createStore = require('redux').createStore;
var socket = require("socket.io-client").connect();

require('purecss');
require('./css/style.css');
require('./js/normie')(window);

var api = require('./js/api');
var videoStream = require('./js/video-stream');
var generateGif = require('./js/generate-gif');
var getRender = require('./js/get-render');
var setupCanvas = require('./js/setup-canvas');
var actions = require('./js/actions');
var reducers = require('./js/reducers');
var store = createStore(reducers);

var video = document.getElementById("webcam"),
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

api.getImages(store);

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
