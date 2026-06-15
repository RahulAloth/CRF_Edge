"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRefCallback;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _reactMajor = _interopRequireDefault(require("@mui/x-internals/reactMajor"));
function useRefCallback(fn) {
  const refCleanup = React.useRef(undefined);
  const refCallback = (0, _useEventCallback.default)(node => {
    if (!node) {
      // Cleanup for R18
      refCleanup.current?.();
      return;
    }
    refCleanup.current = fn(node);
    if (_reactMajor.default >= 19) {
      /* eslint-disable-next-line consistent-return */
      return refCleanup.current;
    }
  });
  return refCallback;
}