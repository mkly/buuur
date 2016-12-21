var api = require('./api');
var actions = require('./actions');

module.exports = function(document, store, imagesContainer, imagesTemplate, clearButtonContainer, clearButtonTemplate) {
  return function() {
    var images = store.getState().images.map(function(obj) {
      return obj.image;
    });

    imagesContainer.innerHTML = imagesTemplate({images: images});
    clearButtonContainer.innerHTML = clearButtonTemplate({images: images});
    var clearBtn = document.getElementById("clear-button");
    if (clearBtn) {
      clearBtn.onclick = function() {
        clearBtn.disabled = true;
        store.dispatch(actions.creators.clearImages());
        api.clearImages(store);
      };
    }
  }
};
