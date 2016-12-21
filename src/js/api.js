var actions = require('./actions');

function getImages(store) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/images', true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      images = JSON.parse(xhr.responseText);
      while (images.length) {
        store.dispatch(actions.creators.addImage(images.pop()));
      }
    }
  };
  xhr.send();
}

function clearImages(store) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/clear', true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      var images = JSON.parse(xhr.responseText);
      while (images.length) {
        store.dispatch(actions.creators.addImage(images.pop()));
      }
    }
  };
  xhr.send();
}

module.exports = {
  getImages: getImages,
  clearImages: clearImages
};
