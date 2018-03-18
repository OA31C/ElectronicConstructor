// @flow

// canvas
export const canvasSelector = '#app';
export const $canvas: HTMLCanvasElement = document.querySelector(canvasSelector);
export const canvasCtx = $canvas.getContext('2d');

export const FPS = 60;
