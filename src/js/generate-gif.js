var GIF = require('gif.js');

module.exports = function(window, snapBtn, height, width, video, result, ctx, socket) {
  snapBtn.disabled = true;
  video.className = "";
  result.className = "lighten";

  var gif = new GIF({
        workers: 2,
        quality: 3,
        height: height,
        width: width
      }),
      numFrames = 8,
      interval = window.setInterval(function() {
        if (numFrames < 1) {
          window.clearInterval(interval);
          gif.render();
          video.className = "lighten";
          return;
        }
        numFrames -= 1;
        ctx.drawImage(video, 0, 0, width, height);
        gif.addFrame(ctx, {copy: true, delay: 100});
      }, 340),
      oldblob;

  gif.on("finished", function(blob) {
    var reader = new FileReader();
    reader.onload = function(e) {
      result.src = reader.result;
      socket.emit('add buuur', {img: reader.result});
    };
    reader.readAsDataURL(blob);
    window.URL.revokeObjectURL(oldblob);
    oldblob = blob;
    result.className = "";
    snapBtn.disabled = false;
  });

};
