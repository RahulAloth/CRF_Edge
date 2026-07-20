"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _useTimeout = _interopRequireDefault(require("@mui/utils/useTimeout"));
var _jsxRuntime = require("react/jsx-runtime");
/**
 * @ignore - internal component.
 */function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = React.useState(false);
  const exitTimer = (0, _useTimeout.default)();
  const exitTimerStartedRef = React.useRef(false);
  const onExitedRef = React.useRef(onExited);
  onExitedRef.current = onExited;
  const hasExitedCallback = onExited != null;
  const rippleClassName = (0, _clsx.default)(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = (0, _clsx.default)(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React.useEffect(() => {
    if (!inProp && hasExitedCallback) {
      if (!exitTimerStartedRef.current) {
        exitTimerStartedRef.current = true;
        exitTimer.start(timeout, () => {
          exitTimerStartedRef.current = false;
          onExitedRef.current?.();
        });
      }
    } else {
      exitTimerStartedRef.current = false;
      exitTimer.clear();
    }
  }, [exitTimer, hasExitedCallback, inProp, timeout]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: childClassName
    })
  });
}
process.env.NODE_ENV !== "production" ? Ripple.propTypes /* remove-proptypes */ = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object.isRequired,
  className: _propTypes.default.string,
  /**
   * @ignore - controlled by TouchRipple
   */
  in: _propTypes.default.bool,
  /**
   * @ignore - controlled by TouchRipple
   */
  onExited: _propTypes.default.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: _propTypes.default.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: _propTypes.default.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: _propTypes.default.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: _propTypes.default.number,
  /**
   * Exit delay.
   */
  timeout: _propTypes.default.number.isRequired
} : void 0;
var _default = exports.default = Ripple;