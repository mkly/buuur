import { images as imagesReducer } from './reducers';
import { createStore } from 'redux';

export default function getStore() {
  const store = createStore(imagesReducer);
  getStore = function() {
    return store;
  }

  return store;
}
