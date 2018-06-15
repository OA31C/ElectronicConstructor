// @flow

// canvas
export const canvasSelector = '#app';
export const $canvas: HTMLCanvasElement = document.querySelector(canvasSelector);
export const canvasCtx = $canvas.getContext('2d');

export const FPS = 60;

export const GRID_STEP = 20;

export const DEFAULT_CURSOR = 'default';
