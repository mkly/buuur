import "purecss";
import "./css/style.css";

import getSocket from "./js/get-socket";
import normie from "./js/normie";
import { getImages } from "./js/imagesRepo";
import generateGif from "./js/generate-gif";
import actions from "./js/actions";
import getStore from "./js/store";

import imagesRenderer from "./components/images";
import clearButtonRenderer from "./components/clear_button";
import videoStream from "./components/video_stream";
import roomForm from "./components/room_form";
import navigation from "./components/navigation";
import "./components/canvas";

import fontawesome from "@fortawesome/fontawesome";
import faVideo from "@fortawesome/fontawesome-free-solid/faVideo";
fontawesome.library.add(faVideo);

const snapBtn = document.getElementById("snap"),
  width = 160,
  height = 160,
  store = getStore(),
  socket = getSocket();

normie(window);
store.subscribe(imagesRenderer("images-template", "images"));
store.subscribe(
  clearButtonRenderer("clear-button-template", "clear-button-container"),
);
store.subscribe(navigation("image-booth", "room-select"));
videoStream("video-stream", "canvas", height, width);
roomForm("room-form", "room-form-input");

socket.on("buuur added", function (data) {
  console.log("buuur added");
  store.dispatch(actions.creators.addImage(data.img));
  store.dispatch(actions.creators.popImage());
});

socket.on("buuur cleared", function () {
  store.dispatch(actions.creators.clearImages());
});

snapBtn.appendChild(fontawesome.icon(faVideo).node[0]);
snapBtn.onclick = function () {
  const canvasElement = document.getElementById("canvas");

  generateGif(
    window,
    document.getElementById("snap"),
    height,
    width,
    document.getElementById("video-stream"),
    canvasElement.getContext("2d"),
    socket,
  );
};

if (window.location.hash) {
  const room = window.location.hash.replace("#", "");
  store.dispatch(actions.creators.setRoom(room));
  store.dispatch(actions.creators.setView("image-booth"));
  getImages();
}
