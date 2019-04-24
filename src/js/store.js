import { images, room, navigation } from './reducers';
import { createStore, combineReducers } from 'redux';

export default function getStore() {
  const store = createStore(
    combineReducers({
      images: images,
      room: room,
      navigation: navigation
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  getStore = function() {
    return store;
  }

  return store;
}
