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
var _elementAcceptingRef = _interopRequireDefault(require("@mui/utils/elementAcceptingRef"));
var _getReactElementRef = _interopRequireDefault(require("@mui/utils/getReactElementRef"));
var _Transition = _interopRequireDefault(require("../internal/Transition"));
var _useReducedMotion = _interopRequireDefault(require("../transitions/useReducedMotion"));
var _zeroStyled = require("../zero-styled");
var _utils = require("../transitions/utils");
var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));
var _jsxRuntime = require("react/jsx-runtime");
const styles = {
  entering: {
    transform: 'none'
  },
  entered: {
    transform: 'none'
  },
  exiting: {
    transform: 'scale(0)'
  },
  exited: {
    transform: 'scale(0)'
  }
};
const hiddenStyles = {
  transform: 'scale(0)',
  visibility: 'hidden'
};

/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](/material-ui/react-floating-action-button/#animation) component.
 */
const Zoom = /*#__PURE__*/React.forwardRef(function Zoom(props, ref) {
  const theme = (0, _zeroStyled.useTheme)();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    addEndListener,
    appear = true,
    children,
    disablePrefersReducedMotion = false,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    ...other
  } = props;
  const reducedMotion = (0, _useReducedMotion.default)(theme.motion.reducedMotion, disablePrefersReducedMotion);
  const nodeRef = React.useRef(null);
  const handleRef = (0, _useForkRef.default)(nodeRef, (0, _getReactElementRef.default)(children), ref);
  const handleEntering = (0, _utils.normalizedTransitionCallback)(nodeRef, onEntering);
  const handleEnter = (0, _utils.normalizedTransitionCallback)(nodeRef, (node, isAppearing) => {
    if (!reducedMotion.shouldReduceMotion) {
      (0, _utils.reflow)(node); // Force layout so the animation starts from the initial styles.
    }
    const transitionProps = (0, _utils.getTransitionProps)({
      style,
      timeout,
      easing
    }, {
      mode: 'enter'
    });
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: transitionProps.duration,
      delay: transitionProps.delay
    });
    node.style.transition = theme.transitions.create('transform', {
      duration: transitionTiming.duration,
      easing: transitionProps.easing,
      delay: transitionTiming.delay
    });
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = (0, _utils.normalizedTransitionCallback)(nodeRef, onEntered);
  const handleExiting = (0, _utils.normalizedTransitionCallback)(nodeRef, onExiting);
  const handleExit = (0, _utils.normalizedTransitionCallback)(nodeRef, node => {
    const transitionProps = (0, _utils.getTransitionProps)({
      style,
      timeout,
      easing
    }, {
      mode: 'exit'
    });
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: transitionProps.duration,
      delay: transitionProps.delay
    });
    node.style.transition = theme.transitions.create('transform', {
      duration: transitionTiming.duration,
      easing: transitionProps.easing,
      delay: transitionTiming.delay
    });
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = (0, _utils.normalizedTransitionCallback)(nodeRef, node => {
    node.style.transition = '';
    if (onExited) {
      onExited(node);
    }
  });
  const handleAddEndListener = addEndListener ? next => {
    addEndListener(nodeRef.current, next);
  } : undefined;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Transition.default, {
    appear: appear,
    in: inProp,
    nodeRef: nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    reduceMotion: reducedMotion.shouldReduceMotion,
    timeout: timeout,
    ...other,
    children: (state, {
      ownerState,
      ...restChildProps
    }) => {
      // Do not pass ownerState to a DOM child. ownerState is only for
      // Material UI styling, and React would treat it as an invalid DOM attribute.
      const childStyle = (0, _utils.getTransitionChildStyle)(state, inProp, styles, hiddenStyles, style, children.props.style);
      return /*#__PURE__*/React.cloneElement(children, {
        style: childStyle,
        ref: handleRef,
        ...restChildProps
      });
    }
  });
});
process.env.NODE_ENV !== "production" ? Zoom.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger.
   * Use it when you need custom logic to decide when the transition has ended.
   * Note: Timeouts are still used as a fallback if provided.
   *
   * @param {HTMLElement} node The transitioning DOM node.
   * @param {Function} done Call this when the transition has finished.
   */
  addEndListener: _propTypes.default.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: _propTypes.default.bool,
  /**
   * A single child content element.
   */
  children: _elementAcceptingRef.default.isRequired,
  /**
   * If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
   * @default false
   */
  disablePrefersReducedMotion: _propTypes.default.bool,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: _propTypes.default.oneOfType([_propTypes.default.shape({
    enter: _propTypes.default.string,
    exit: _propTypes.default.string
  }), _propTypes.default.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: _propTypes.default.bool,
  /**
   * @ignore
   */
  onEnter: _propTypes.default.func,
  /**
   * @ignore
   */
  onEntered: _propTypes.default.func,
  /**
   * @ignore
   */
  onEntering: _propTypes.default.func,
  /**
   * @ignore
   */
  onExit: _propTypes.default.func,
  /**
   * @ignore
   */
  onExited: _propTypes.default.func,
  /**
   * @ignore
   */
  onExiting: _propTypes.default.func,
  /**
   * @ignore
   */
  style: _propTypes.default.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })])
} : void 0;
var _default = exports.default = Zoom;