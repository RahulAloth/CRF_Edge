"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHTMLElement = isHTMLElement;
var _ownerWindow = _interopRequireDefault(require("@mui/utils/ownerWindow"));
/**
 * Checks if a value is an HTMLElement, including elements from other iframes/realms.
 */
function isHTMLElement(value) {
  if (typeof window === 'undefined' || value == null) {
    return false;
  }
  if (value instanceof HTMLElement) {
    return true;
  }
  // Cross-realm: must be an element node (nodeType 1) from another window.
  // The try/catch guards against detached/destroyed windows where accessing
  // `.HTMLElement` on the owner window may throw.
  try {
    return value.nodeType === 1 && value instanceof (0, _ownerWindow.default)(value).HTMLElement;
  } catch {
    return false;
  }
}