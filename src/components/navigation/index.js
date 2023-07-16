import actions from "../../js/actions";
import { getImages } from "../../js/imagesRepo";
import getStore from "../../js/store";

export default function (imageBoothId, roomSelectId) {
  const imageBooth = document.getElementById(imageBoothId);
  const roomSelect = document.getElementById(roomSelectId);
  const currentView = "";

  window.addEventListener("popstate", function (e) {
    const hash = window.location.hash;
    const store = getStore();
    if (hash) {
      store.dispatch(
        actions.creators.setRoom(window.location.hash.replace("#", "")),
      );
      store.dispatch(actions.creators.setView("image-booth"));
      store.dispatch(actions.creators.clearImages());
      getImages();
    } else {
      store.dispatch(actions.creators.setRoom(""));
      store.dispatch(actions.creators.setView("room-select"));
      store.dispatch(actions.creators.clearImages());
    }
  });

  return function () {
    const state = getStore().getState().navigation;
    if (state.view === currentView) {
      return;
    }

    switch (state.view) {
      case "image-booth":
        imageBooth.removeAttribute("hidden");
        roomSelect.setAttribute("hidden", 1);
        window.location.hash = getStore().getState().room.room;
        break;
      case "room-select":
        roomSelect.removeAttribute("hidden");
        imageBooth.setAttribute("hidden", 1);
        break;
    }
  };
}
