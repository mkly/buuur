export default function(canvas, ctx, height, width) {
  canvas.height = height;
  canvas.width = width;
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
}
