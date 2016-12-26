const ADD_IMAGE = 'ADD_IMAGE';
const POP_IMAGE = 'REMOVE_IMAGE';
const CLEAR_IMAGES = 'CLEAR_IMAGES';

export default {
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
