import { clearImages } from './api';
import actions from './actions';

export default function(document, store, imagesContainer, imagesTemplate, clearButtonContainer, clearButtonTemplate) {
  return function() {
    const images = store.getState().images.map(function(obj) {
      return obj.image;
    });

    imagesContainer.innerHTML = imagesTemplate({images: images});
    clearButtonContainer.innerHTML = clearButtonTemplate({images: images});
    const clearBtn = document.getElementById("clear-button");
    if (clearBtn) {
      clearBtn.onclick = function() {
        clearBtn.disabled = true;
        store.dispatch(actions.creators.clearImages());
        clearImages(store);
      };
    }
  }
}
