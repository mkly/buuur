import actions from './actions';
import getStore from './store';

export function getImages() {
  const xhr = new XMLHttpRequest();
  const store = getStore();
  const room = store.getState().room.room;
  if (!room) {
    return;
  }
  xhr.open('GET', `/images/${room}`, true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      let images = JSON.parse(xhr.responseText);
      while (images.length) {
        const store = getStore();
        if (room && room === store.getState().room.room) {
          store.dispatch(actions.creators.addImage(images.pop()));
        }
      }
    }
  };
  xhr.send();
}

export function clearImages() {
  const xhr = new XMLHttpRequest();
  const store = getStore();
  const room = store.getState().room.room;
  if (!room) {
    return;
  }
  xhr.open('GET', `/clear/${room}`, true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      const store = getStore();
      if (room && room === store.getState().room.room) {
        store.dispatch(actions.creators.clearImages());
      }
    }
  };
  xhr.send();
}
