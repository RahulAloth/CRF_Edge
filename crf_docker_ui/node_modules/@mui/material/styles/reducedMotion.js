"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultStyles = void 0;
exports.resolveReducedMotionStyles = resolveReducedMotionStyles;
const defaultStyles = exports.defaultStyles = {
  transition: 'none'
};
function resolveReducedMotionStyles(reducedMotion, styles) {
  if (reducedMotion === 'always') {
    return styles;
  }
  if (reducedMotion === 'system') {
    return {
      '@media (prefers-reduced-motion: reduce)': styles
    };
  }
  return null;
}