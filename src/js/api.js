import actions from './actions';

export function getImages(store) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/images', true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      let images = JSON.parse(xhr.responseText);
      while (images.length) {
        store.dispatch(actions.creators.addImage(images.pop()));
      }
    }
  };
  xhr.send();
}

export function clearImages(store) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/clear', true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      store.dispatch(actions.creators.clearImages());
    }
  };
  xhr.send();
}
