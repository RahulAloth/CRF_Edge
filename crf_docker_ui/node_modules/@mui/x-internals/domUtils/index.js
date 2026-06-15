"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _getTarget = require("./getTarget");
Object.keys(_getTarget).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getTarget[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getTarget[key];
    }
  });
});
var _isHTMLElement = require("./isHTMLElement");
Object.keys(_isHTMLElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isHTMLElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isHTMLElement[key];
    }
  });
});