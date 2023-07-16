import "./style.css";

export default function (videoId, canvasId, height, width) {
  const video = document.getElementById(videoId);
  const canvas = document.getElementById(canvasId);

  navigator.mediaDevices.getUserMedia(
    { audio: false, video: true, facingMode: { exact: "user" } },
  ).then((stream) => {
    callback(video, canvas, height, width, stream);
  }).catch(() => {
    alert("No camera :(");
  });
}

function callback(el, canvas, height, width, stream) {
  if (el.mozSrcObject !== undefined) {
    el.mozSrcObject = stream;
  } else {
    el.srcObject = stream;
    el.src = stream;
  }

  el.addEventListener("playing", () => {
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
  const ctx = canvas.getContext("2d");

  canvas.height = height;
  canvas.width = width;
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
}
