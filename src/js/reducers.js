var actions = require('./actions');
var initialState = require('./initial-state');
var _ = require('lodash');

function images(state, action) {
  if (typeof state === 'undefined') {
    state = initialState();
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

module.exports = images;
