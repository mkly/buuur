import './style.css';

import getUserMedia from 'getusermedia';

export default function(videoId, canvasId, height, width) {
  const video = document.getElementById(videoId);
  const canvas = document.getElementById(canvasId);

  getUserMedia(
    { video: true },
    callback.bind(undefined, window, video, canvas, height, width)
  );
}

function callback(window, el, canvas, height, width, err, stream) {
  if (err) {
    return;
  }

  if (el.mozSrcObject !== undefined) {
    el.mozSrcObject = stream;
  } else {
    el.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
  }

  el.play();

  setupCanvas(canvas, height, width);
}

function setupCanvas(canvas, height, width) {
  const ctx = canvas.getContext('2d');

  canvas.height = height;
  canvas.width = width;
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
}
