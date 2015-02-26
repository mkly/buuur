require.config({
  baseUrl: 'js',
  shim: {
    gifjs: {
      exports: 'GIF'
    },
    io: {
      exports: 'io'
    },
    hammer: {
      exports: 'Hammer'
    }
  },
  paths: {
    'gifjs': 'gif.js/gif',
    'io': 'socketio-client/socket.io',
    'underscore': 'underscore/underscore-min',
    'hammer': 'hammer.js/hammer'
  }
});

requirejs([
  'gifjs',
  'io',
  'underscore',
  'hammer'
], function(GIF, io, _, Hammer) { 'use strict';

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  var video = document.getElementById("webcam"),
      preview = document.getElementById("preview"),
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
      images = [],
      socket = io.connect(),
      imagesTemplate = _.template(document.getElementById("images-template").innerHTML),
      clearButtonTemplate = _.template(document.getElementById("clear-button-template").innerHTML);

  if (!navigator.getUserMedia) {
    console.log("Camera Not Supported");
    return;
  }
  new Hammer(result).on("dragstart", function() {
    result.style.opacity = "0.5";
    imageContainers = imagesContainer.getElementsByTagName("li");
  });
  new Hammer(result).on("drag", function(ev) {
    ev.gesture.preventDefault();
  });
  new Hammer(result).on("drag", (function() {
    return _.throttle(function(ev) {
      var g = ev.gesture;
      var translate = ['translate(', g.deltaX, 'px, ', g.deltaY, 'px', ')'].join("");
      result.style.transform = translate;
      var i,l = imageContainers.length;
      var cx = result.offsetLeft + Math.ceil(result.offsetWidth / 2) + g.deltaX;
      var cy = result.offsetTop + Math.ceil(result.offsetHeight / 2) + g.deltaY;
      for (i=0; i<l; i++) {
        var x = imageContainers[i].offsetLeft;
        var y = imageContainers[i].offsetTop;
        var x2 = imageContainers[i].offsetWidth + x;
        var y2 = imageContainers[i].offsetHeight + y;
        if (cx > x && cx < x2 && cy > y && cy < y2) {
          imageContainers[i].style.opacity = "0.4";
        } else {
          imageContainers[i].style.opacity = "1";
        }
      }
    }, 1000 / 15, {trailing: false});
  })());

  new Hammer(result).on("dragend", function(ev) {
    result.style.transform = "translate(0,0)";
    result.style.opacity = "1";
    var i,l = imageContainers.length;
    for (i=0;i<l;i++) {
      imageContainers[i].style.opacity = "1";
    }
  });

  socket.on('buuur added', function(data) {
    images.unshift(data.img);
    while (images.length > 10) {
      images.pop();
    }
    render({images: images});
  });

  navigator.getUserMedia({video: true}, successCallback, errorCallback);

  function successCallback(stream) {
    if (video.mozSrcObject !== undefined) {
      video.mozSrcObject = stream;
    } else {
      video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
    }
  }

  function errorCallback() {}

  function render(data) {
    data = data || {};
    imagesContainer.innerHTML = imagesTemplate({images: images});
    clearButtonContainer.innerHTML = clearButtonTemplate({images: images});
    var clearBtn = document.getElementById("clear-button");
    if (clearBtn) {
      clearBtn.onclick = function() {
        clearBtn.disabled = true;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/clear', true);
        xhr.onload = function() {
          if (xhr.status == 200) {
            images = JSON.parse(xhr.responseText);
            render({images: images});
          }
        };
        xhr.send();
      };
    }
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/images', true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      images = JSON.parse(xhr.responseText);
      render({images: images});
    }
  };
  xhr.send();

  (function init() {

    canvas.height = height;
    canvas.width = width;
    ctx.translate(width, 0);
    ctx.scale(-1, 1);



    snapBtn.onclick = function() {

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

    video.play();

  }());

});
