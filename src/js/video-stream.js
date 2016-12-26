import getUserMedia from 'getusermedia';

function callback(window, el, err, stream) {
  if (err) {
    return;
  }

  if (el.mozSrcObject !== undefined) {
    el.mozSrcObject = stream;
  } else {
    el.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
  }

  el.play();
}

export default function(window, el) {
  getUserMedia(
    {video: true},
    callback.bind(undefined, window, el)
  );
}
