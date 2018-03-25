import './style.css';

import getUserMedia from 'getusermedia';

export default function(videoId, canvasId, resultId, height, width) {
  const video = document.getElementById(videoId);
  const canvas = document.getElementById(canvasId);
  const result = document.getElementById(resultId);

  getUserMedia(
    { audio: false, video: true },
    callback.bind(undefined, window, video, canvas, result, height, width)
  );
}

function callback(window, el, canvas, result, height, width, err, stream) {
  if (err) {
    return;
  }

  if (el.mozSrcObject !== undefined) {
    el.mozSrcObject = stream;
  } else {
    el.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
  }
  
  el.addEventListener('playing', e => {
    if (el.videoHeight < el.videoWidth) {
      const newWidth = width * (el.videoWidth / el.videoHeight);
      el.style.height = `${height}px`;
      el.style.width = `${newWidth}px`;
      el.style.right = `-${(newWidth - height) / 2}px`;
    } else if (el.videoWidth < el.videoHeight) {
      const newHeight = height * (el.videoHeight / el.videoWidth);
      el.style.height = `${newHeight}px`;
      el.style.width = `${width}px`;
      el.style.top = `-${(newHeight - width) / 2}px`;
    }

  });

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
