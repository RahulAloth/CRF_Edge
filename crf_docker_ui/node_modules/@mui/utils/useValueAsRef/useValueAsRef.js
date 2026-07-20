"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useValueAsRef;
var _useEnhancedEffect = _interopRequireDefault(require("../useEnhancedEffect/useEnhancedEffect"));
var _useLazyRef = _interopRequireDefault(require("../useLazyRef/useLazyRef"));
/**
 * Copied from `@base-ui/utils/useValueAsRef`.
 *
 * Stores the latest value in a stable ref. The ref updates after React commits,
 * so effects and delayed callbacks can read the current value without depending
 * on it and rerunning.
 */
function useValueAsRef(value) {
  const latest = (0, _useLazyRef.default)(() => createValueRef(value)).current;
  latest.next = value;

  // eslint-disable-next-line react-hooks/exhaustive-deps -- effect never changes; it reads latest.next.
  (0, _useEnhancedEffect.default)(latest.effect);
  return latest;
}
function createValueRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    }
  };
  return latest;
}