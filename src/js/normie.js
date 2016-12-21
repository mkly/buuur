module.exports = function(window) {
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  if (
    !window.URL ||
    !window.requestAnimationFrame
  ) {
    throw new Error("Unsupported Browser");
  }
};
