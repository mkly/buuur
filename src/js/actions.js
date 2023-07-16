const ADD_IMAGE = "images/ADD_IMAGE";
const POP_IMAGE = "images/REMOVE_IMAGE";
const CLEAR_IMAGES = "images/CLEAR_IMAGES";

const SET_ROOM = "room/SET_ROOM";

const SET_VIEW = "navigation/SET_VIEW";

export default {
  types: {
    ADD_IMAGE: ADD_IMAGE,
    POP_IMAGE: POP_IMAGE,
    CLEAR_IMAGES: CLEAR_IMAGES,

    SET_ROOM: SET_ROOM,

    SET_VIEW: SET_VIEW,
  },
  creators: {
    addImage: function (image) {
      return {
        type: ADD_IMAGE,
        image: image,
      };
    },
    popImage: function () {
      return {
        type: POP_IMAGE,
      };
    },
    clearImages: function () {
      return {
        type: CLEAR_IMAGES,
      };
    },

    setRoom: function (room) {
      return {
        type: SET_ROOM,
        room: room,
      };
    },

    setView: function (view) {
      return {
        type: SET_VIEW,
        view: view,
      };
    },
  },
};
