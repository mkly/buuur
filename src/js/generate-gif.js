import GIF from "gif.js";
import getStore from "./store";

export default function (window, snapBtn, height, width, video, ctx, socket) {
  snapBtn.disabled = true;
  video.className = "";

  let oldblob,
    numFrames = 8;

  const room = getStore().getState().room.room;
  if (!room) {
    return;
  }
  const gif = new GIF({
      workers: 2,
      quality: 3,
      height: height,
      width: width,
    }),
    interval = window.setInterval(function () {
      if (numFrames < 1) {
        window.clearInterval(interval);
        gif.render();
        video.className = "lighten";
        return;
      }
      numFrames -= 1;

      if (video.videoHeight < video.videoWidth) {
        ctx.drawImage(
          video,
          (video.videoWidth - video.videoHeight) / 2,
          0,
          video.videoHeight,
          video.videoHeight,
          0,
          0,
          width,
          height,
        );
      } else {
        ctx.drawImage(
          video,
          0,
          (video.videoHeight - video.videoWidth) / 2,
          video.videoWidth,
          video.videoWidth,
          0,
          0,
          width,
          height,
        );
      }

      gif.addFrame(ctx, { copy: true, delay: 100 });
    }, 340);

  gif.on("finished", function (blob) {
    const reader = new FileReader();
    reader.onload = function () {
      const currentRoom = getStore().getState().room.room;
      if (currentRoom && currentRoom === room) {
        socket.emit("add buuur", { img: reader.result, room: room });
      }
    };
    reader.readAsDataURL(blob);
    window.URL.revokeObjectURL(oldblob);
    oldblob = blob;
    snapBtn.disabled = false;
  });
}
