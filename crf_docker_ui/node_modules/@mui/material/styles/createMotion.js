"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMotion;
const EMPTY_MOTION = {};
function createMotion(inputMotion = EMPTY_MOTION) {
  return {
    reducedMotion: 'never',
    ...inputMotion
  };
}