import actions from './actions';
import {
  imagesState,
  roomState,
  navigationState
} from './initial-state';

export function images(state, action) {
  if (typeof state === 'undefined') {
    state = imagesState()
  }
  
  switch (action.type) {
    case actions.types.ADD_IMAGE:
      return Object.assign({}, state, {
        images: [{image: action.image}].concat(state.images)
      });
    case actions.types.POP_IMAGE:
      return Object.assign({}, state, {
        images: state.images.slice(0, 4)
      });
    case actions.types.CLEAR_IMAGES:
      return Object.assign({}, state, {
        images: []
      });
    default:
      return state;
  };
}

export function room(state, action) {
  if (typeof state === 'undefined') {
    state = roomState();
  }

  switch(action.type) {
    case actions.types.SET_ROOM:
      return Object.assign({}, state, {
        room: action.room
      });
    default:
      return state;
  };
}

export function navigation(state, action) {
  if (typeof state === 'undefined') {
    state = navigationState();
  }

  switch(action.type) {
    case actions.types.SET_VIEW:
      return Object.assign({}, state, {
        view: action.view
      });
    default:
      return state;
  };
}
