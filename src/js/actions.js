var ADD_IMAGE = 'ADD_IMAGE';
var POP_IMAGE = 'REMOVE_IMAGE';
var CLEAR_IMAGES = 'CLEAR_IMAGES';

module.exports = {
  types: {
    ADD_IMAGE: ADD_IMAGE,
    POP_IMAGE: POP_IMAGE,
    CLEAR_IMAGES: CLEAR_IMAGES
  },
  creators: {
    addImage: function(image) {
      return {
        type: ADD_IMAGE,
        image: image
      };
    },
    popImage: function() {
      return {
        type: POP_IMAGE
      };
    },
    clearImages: function() {
      return {
        type: CLEAR_IMAGES
      };
    }
  }
}
