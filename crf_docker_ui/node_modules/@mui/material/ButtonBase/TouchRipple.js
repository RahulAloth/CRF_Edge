"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TouchRippleRoot = exports.TouchRippleRipple = exports.DELAY_RIPPLE = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _useOnMount = _interopRequireDefault(require("@mui/utils/useOnMount"));
var _useTimeout = _interopRequireDefault(require("@mui/utils/useTimeout"));
var _zeroStyled = require("../zero-styled");
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _Ripple = _interopRequireDefault(require("./Ripple"));
var _touchRippleClasses = _interopRequireDefault(require("./touchRippleClasses"));
var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));
var _useReducedMotion = _interopRequireDefault(require("../transitions/useReducedMotion"));
var _jsxRuntime = require("react/jsx-runtime");
const DURATION = 550;
const DELAY_RIPPLE = exports.DELAY_RIPPLE = 80;
const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];
const NOOP = () => {};

/**
 * Keep the same DOM order TouchRipple had when it used react-transition-group:
 * exiting ripples stay in place, and new ripples are inserted before the final
 * group of ripples that are waiting for their exit animation to finish.
 *
 * @param {number[]} prevOrder The previous DOM order, including ripples that may be exiting.
 * @param {number[]} nextActiveKeys The ripples that should still be treated as active.
 * @returns {number[]} The next DOM order, preserving the position of exiting ripples where possible.
 */
function mergeRippleOrder(prevOrder, nextActiveKeys) {
  const nextKeySet = new Set(nextActiveKeys);
  const nextKeysPending = new Map();
  let pendingKeys = [];
  for (const prevKey of prevOrder) {
    if (nextKeySet.has(prevKey)) {
      if (pendingKeys.length > 0) {
        nextKeysPending.set(prevKey, pendingKeys);
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  const nextOrder = [];
  for (const nextKey of nextActiveKeys) {
    const pendingBefore = nextKeysPending.get(nextKey);
    if (pendingBefore) {
      nextOrder.push(...pendingBefore);
    }
    nextOrder.push(nextKey);
  }
  nextOrder.push(...pendingKeys);
  return nextOrder;
}

/**
 * Calculate where the ripple should start and how large it must be to cover the host element.
 *
 * @param {object} params
 * @param {object} params.event The mouse or touch event that started the ripple.
 * @param {HTMLElement | null} params.element The host element used for measurements. Tests pass `null`.
 * @param {boolean} params.center If `true`, start the ripple from the center of the host element.
 * @returns {{ rippleX: number, rippleY: number, rippleSize: number }} The ripple position and size.
 */
function computeRippleState({
  event,
  element,
  center
}) {
  const rect = element ? element.getBoundingClientRect() : {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  let rippleX;
  let rippleY;
  if (center || event === undefined || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
    rippleX = Math.round(rect.width / 2);
    rippleY = Math.round(rect.height / 2);
  } else {
    const {
      clientX,
      clientY
    } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    rippleX = Math.round(clientX - rect.left);
    rippleY = Math.round(clientY - rect.top);
  }
  let rippleSize;
  if (center) {
    rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

    // Mobile Chrome can skip this animation for even pixel sizes.
    if (rippleSize % 2 === 0) {
      rippleSize += 1;
    }
  } else {
    const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
    const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
    rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
  }
  return {
    rippleX,
    rippleY,
    rippleSize
  };
}
const enterKeyframe = (0, _zeroStyled.keyframes)`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
const exitKeyframe = (0, _zeroStyled.keyframes)`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
const pulsateKeyframe = (0, _zeroStyled.keyframes)`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
function getAnimationStyles(theme) {
  if (theme.motion.reducedMotion === 'always') {
    return null;
  }
  const styles = (0, _zeroStyled.css)`
    &.${_touchRippleClasses.default.rippleVisible} {
      animation-name: ${enterKeyframe};
      animation-duration: ${DURATION}ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
    }

    &.${_touchRippleClasses.default.ripplePulsate} {
      animation-duration: ${theme.transitions.duration.shorter}ms;
    }

    & .${_touchRippleClasses.default.childLeaving} {
      animation-name: ${exitKeyframe};
      animation-duration: ${DURATION}ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
    }

    & .${_touchRippleClasses.default.childPulsate} {
      animation-name: ${pulsateKeyframe};
      animation-duration: 2500ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;
  if (theme.motion.reducedMotion === 'system') {
    return (0, _zeroStyled.css)`
      @media (prefers-reduced-motion: no-preference) {
        ${styles}
      }
    `;
  }
  return styles;
}
const TouchRippleRoot = exports.TouchRippleRoot = (0, _zeroStyled.styled)('span', {
  name: 'MuiTouchRipple',
  slot: 'Root'
})({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit'
});

// This `styled()` call uses keyframes. styled-components only supports keyframes
// in template strings, so do not convert these styles to a JS object.
const TouchRippleRipple = exports.TouchRippleRipple = (0, _zeroStyled.styled)(_Ripple.default, {
  name: 'MuiTouchRipple',
  slot: 'Ripple'
})`
  opacity: 0;
  position: absolute;

  &.${_touchRippleClasses.default.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${_touchRippleClasses.default.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${_touchRippleClasses.default.childLeaving} {
    opacity: 0;
  }

  & .${_touchRippleClasses.default.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({
  theme
}) => getAnimationStyles(theme)}
`;

/**
 * @ignore - internal component.
 */
const TouchRipple = /*#__PURE__*/React.forwardRef(function TouchRipple(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiTouchRipple'
  });
  const theme = (0, _zeroStyled.useTheme)();
  const reducedMotion = (0, _useReducedMotion.default)(theme.motion.reducedMotion, false);
  const {
    center: centerProp = false,
    classes = EMPTY_OBJ,
    className,
    ...other
  } = props;
  // Store ripples as data so we can keep exiting ripples mounted until their
  // exit animation ends. Ripple calls onExited when it is safe to remove one.
  const [rippleState, setRippleState] = React.useState({
    items: EMPTY_ARRAY,
    order: EMPTY_ARRAY
  });
  const ripples = rippleState.items;
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef(null);
  const mountedRef = React.useRef(false);
  (0, _useOnMount.default)(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef(false);
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = (0, _useTimeout.default)();

  // Holds delayed touch-start work until the delay expires or touchend forces it to run.
  const startTimerCommit = React.useRef(null);
  const container = React.useRef(null);
  const handleExited = (0, _useEventCallback.default)(key => {
    if (!mountedRef.current) {
      return;
    }
    setRippleState(prevState => {
      const nextItems = prevState.items.filter(ripple => ripple.key !== key);
      const nextOrder = mergeRippleOrder(prevState.order.filter(rippleKey => rippleKey !== key), nextItems.filter(ripple => !ripple.exiting).map(ripple => ripple.key));
      return {
        items: nextItems,
        order: nextOrder
      };
    });
  });
  const startCommit = (0, _useEventCallback.default)(params => {
    const {
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    const key = nextKey.current;
    nextKey.current += 1;
    setRippleState(prevState => {
      const nextItems = [...prevState.items, {
        key,
        pulsate,
        rippleX,
        rippleY,
        rippleSize,
        exiting: false
      }];
      return {
        items: nextItems,
        order: mergeRippleOrder(prevState.order, nextItems.filter(ripple => !ripple.exiting).map(ripple => ripple.key))
      };
    });
    rippleCallback.current = cb;
  });
  const start = (0, _useEventCallback.default)((event = EMPTY_OBJ, options = EMPTY_OBJ, cb = NOOP) => {
    const {
      pulsate = false,
      center = centerProp || options.pulsate,
      fakeElement = false // Used only by tests.
    } = options;
    if (event?.type === 'mousedown' && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if (event?.type === 'touchstart') {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const {
      rippleX,
      rippleY,
      rippleSize
    } = computeRippleState({
      event,
      element,
      center
    });

    // Delay touch ripples so scroll gestures do not flash a ripple.
    if (event?.touches) {
      // Ignore extra touchstart events from multi-touch. There is only one
      // delayed start callback to clear on unmount.
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({
            pulsate,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        startTimer.start(DELAY_RIPPLE, () => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        });
      }
    } else {
      startCommit({
        pulsate,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  });
  const pulsate = (0, _useEventCallback.default)(() => {
    start(EMPTY_OBJ, {
      pulsate: true
    });
  });
  const stop = (0, _useEventCallback.default)((event, cb) => {
    startTimer.clear();

    // If touch ends before the delay finishes, show the ripple now and stop it
    // on the next tick so the user still gets feedback.
    if (event?.type === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.start(0, () => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRippleState(prevState => {
      const firstActiveIndex = prevState.items.findIndex(ripple => !ripple.exiting);
      if (firstActiveIndex === -1) {
        return prevState;
      }
      const nextItems = prevState.items.slice();
      nextItems[firstActiveIndex] = {
        ...nextItems[firstActiveIndex],
        exiting: true
      };
      return {
        items: nextItems,
        order: mergeRippleOrder(prevState.order, nextItems.filter(ripple => !ripple.exiting).map(ripple => ripple.key))
      };
    });
    rippleCallback.current = cb;
  });
  React.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  const rippleByKey = new Map(ripples.map(ripple => [ripple.key, ripple]));
  const orderedRipples = rippleState.order.map(rippleKey => rippleByKey.get(rippleKey)).filter(Boolean);

  // Keep the old react-transition-group DOM order:
  // exiting ripples stay in place, and new ripples are inserted before the
  // final group waiting for its exit animation to finish.
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TouchRippleRoot, {
    className: (0, _clsx.default)(_touchRippleClasses.default.root, classes.root, className),
    ref: container,
    ...other,
    children: orderedRipples.map(ripple => /*#__PURE__*/(0, _jsxRuntime.jsx)(TouchRippleRipple, {
      classes: {
        ripple: (0, _clsx.default)(classes.ripple, _touchRippleClasses.default.ripple),
        rippleVisible: (0, _clsx.default)(classes.rippleVisible, _touchRippleClasses.default.rippleVisible),
        ripplePulsate: (0, _clsx.default)(classes.ripplePulsate, _touchRippleClasses.default.ripplePulsate),
        child: (0, _clsx.default)(classes.child, _touchRippleClasses.default.child),
        childLeaving: (0, _clsx.default)(classes.childLeaving, _touchRippleClasses.default.childLeaving),
        childPulsate: (0, _clsx.default)(classes.childPulsate, _touchRippleClasses.default.childPulsate)
      },
      timeout: reducedMotion.shouldReduceMotion ? 0 : DURATION,
      pulsate: ripple.pulsate,
      rippleX: ripple.rippleX,
      rippleY: ripple.rippleY,
      rippleSize: ripple.rippleSize,
      in: !ripple.exiting,
      onExited: () => handleExited(ripple.key)
    }, ripple.key))
  });
});
process.env.NODE_ENV !== "production" ? TouchRipple.propTypes /* remove-proptypes */ = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: _propTypes.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string
} : void 0;
var _default = exports.default = TouchRipple;