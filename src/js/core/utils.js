// @flow

import {Location} from './base/models';
import {$canvas, canvasCtx} from '../constants';
import {UIElement} from '../core/base/models';

/**
 * gets X and Y positions of mouse by its event
 */
export function getMousePos(event: MouseEvent): Location {
  const canvasRect = $canvas.getBoundingClientRect();
  return new Location(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
}

/**
 * ...
 */
export function isElementHover(element: UIElement, mousePos: Location): boolean {
  if (!element.isDisplayed || !element.location || !element.width || !element.height) return false;
  return (mousePos.x >= element.location.x) && (element.location.x + element.width >= mousePos.x) &&
         (mousePos.y >= element.location.y) && (element.location.y + element.height >= mousePos.y);
}

/**
 * ...
 */
export function isCircleHover(element: Object, mousePos: Location): boolean {
  if (!element.location || !element.radius) throw Error('element object has to have location and radius!');
  // Euclidean distance in various coordinate systems
  const distance = Math.sqrt(
    Math.pow(element.location.x - mousePos.x, 2) +
    Math.pow(element.location.y - mousePos.y, 2)
  );
  return distance <= element.radius;
}

/**
 * say to App that need to redraw the canvas
 */
export function redraw() {
  redraw.isValidCanvasState = false;
}

/**
 * check are both args are the same
 * it checks object type and object fields
 */
export function isEqual(first: any, second: any): boolean {
  if (typeof first !== 'object' || typeof second !== 'object' ||
      first === null || second === null) {
    return first === second;
  }
  if (first.constructor !== second.constructor) return false;

  // check object fields
  const firstKeys = Object.getOwnPropertyNames(first);
  const secondKeys = Object.getOwnPropertyNames(second);
  if (firstKeys.length !== secondKeys.length) return false;
  for (const field of firstKeys) {
    if (!isEqual(first[field], second[field])) return false;
  }
  return true;
}

/**
 * Renders an image on the canvas
 * - saves a loaded image to cache and loads it next times for the same `url`
 */
export function drawImage(url: string, ...args) {
  const cacheKey = `img__${url}`;
  // try to get the image from cache
  let img = drawImage[cacheKey];

  if (img) {
    canvasCtx.drawImage(img, ...args);
  } else {
    img = new Image();
    img.onload = function() {
      canvasCtx.drawImage(img, ...args);
    };
    img.src = `/src/img/${url}`;
    // save img to cache
    drawImage[cacheKey] = img;
  }
}
