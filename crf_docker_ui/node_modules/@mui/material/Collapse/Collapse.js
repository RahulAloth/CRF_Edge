"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _elementTypeAcceptingRef = _interopRequireDefault(require("@mui/utils/elementTypeAcceptingRef"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _Transition = _interopRequireDefault(require("../internal/Transition"));
var _useReducedMotion = _interopRequireDefault(require("../transitions/useReducedMotion"));
var _zeroStyled = require("../zero-styled");
var _memoTheme = _interopRequireDefault(require("../utils/memoTheme"));
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _createTransitions = require("../styles/createTransitions");
var _utils = require("../transitions/utils");
var _utils2 = require("../utils");
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _collapseClasses = require("./collapseClasses");
var _jsxRuntime = require("react/jsx-runtime");
const EMPTY_OBJECT = {};
const useUtilityClasses = ownerState => {
  const {
    orientation,
    classes
  } = ownerState;
  const slots = {
    root: ['root', orientation],
    entered: ['entered'],
    hidden: ['hidden'],
    wrapper: ['wrapper', orientation],
    wrapperInner: ['wrapperInner', orientation]
  };
  return (0, _composeClasses.default)(slots, _collapseClasses.getCollapseUtilityClass, classes);
};
const CollapseRoot = (0, _zeroStyled.styled)('div', {
  name: 'MuiCollapse',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.state === 'entered' && styles.entered, ownerState.state === 'exited' && !ownerState.in && ownerState.collapsedSize === '0px' && styles.hidden];
  }
})((0, _memoTheme.default)(({
  theme
}) => ({
  height: 0,
  overflow: 'hidden',
  transition: theme.transitions.create('height'),
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      height: 'auto',
      width: 0,
      transition: theme.transitions.create('width')
    }
  }, {
    props: {
      state: 'entered'
    },
    style: {
      height: 'auto',
      overflow: 'visible'
    }
  }, {
    props: {
      state: 'entered',
      orientation: 'horizontal'
    },
    style: {
      width: 'auto'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.state === 'exited' && !ownerState.in && ownerState.collapsedSize === '0px',
    style: {
      visibility: 'hidden'
    }
  }]
})));
const CollapseWrapper = (0, _zeroStyled.styled)('div', {
  name: 'MuiCollapse',
  slot: 'Wrapper'
})({
  // Prevent children with negative margins from making the measured size too small.
  display: 'flex',
  width: '100%',
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      width: 'auto',
      height: '100%'
    }
  }]
});
const CollapseWrapperInner = (0, _zeroStyled.styled)('div', {
  name: 'MuiCollapse',
  slot: 'WrapperInner'
})({
  width: '100%',
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      width: 'auto',
      height: '100%'
    }
  }]
});

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/material-ui/react-stepper/#vertical-stepper) StepContent component.
 */
const Collapse = /*#__PURE__*/React.forwardRef(function Collapse(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiCollapse'
  });
  const {
    addEndListener,
    children,
    className,
    collapsedSize: collapsedSizeProp = '0px',
    component,
    disablePrefersReducedMotion = false,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = 'vertical',
    slots = EMPTY_OBJECT,
    slotProps = EMPTY_OBJECT,
    style,
    timeout = _createTransitions.duration.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = _Transition.default,
    ...other
  } = props;
  const ownerState = {
    ...props,
    orientation,
    collapsedSize: collapsedSizeProp
  };
  const classes = useUtilityClasses(ownerState);
  const theme = (0, _zeroStyled.useTheme)();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef(null);
  const collapsedSize = typeof collapsedSizeProp === 'number' ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === 'horizontal';
  const size = isHorizontal ? 'width' : 'height';
  const reducedMotion = (0, _useReducedMotion.default)(theme.motion.reducedMotion, disablePrefersReducedMotion);
  const nodeRef = React.useRef(null);
  const handleRef = (0, _utils2.useForkRef)(ref, nodeRef);
  const getWrapperSize = () => wrapperRef.current ? wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'] : 0;
  const handleEnter = (0, _utils.normalizedTransitionCallback)(nodeRef, (node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      // Temporarily remove horizontal content from normal layout so we can
      // measure its natural width.
      wrapperRef.current.style.position = 'absolute';
    }
    node.style[size] = collapsedSize;
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = (0, _utils.normalizedTransitionCallback)(nodeRef, (node, isAppearing) => {
    const wrapperSize = getWrapperSize();
    if (wrapperRef.current && isHorizontal) {
      // Restore normal layout after measuring the horizontal content.
      wrapperRef.current.style.position = '';
    }
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = (0, _utils.getTransitionProps)({
      style,
      timeout,
      easing
    }, {
      mode: 'enter'
    });
    if (timeout === 'auto' && !reducedMotion.shouldReduceMotion) {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      autoTransitionDuration.current = duration2;
    } else {
      autoTransitionDuration.current = null;
    }
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: autoTransitionDuration.current ?? transitionDuration,
      delay: undefined
    });
    node.style.transitionDuration = typeof transitionTiming.duration === 'string' ? transitionTiming.duration : `${transitionTiming.duration}ms`;
    node.style[size] = `${wrapperSize}px`;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = (0, _utils.normalizedTransitionCallback)(nodeRef, (node, isAppearing) => {
    node.style[size] = 'auto';
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  const handleExit = (0, _utils.normalizedTransitionCallback)(nodeRef, node => {
    node.style[size] = `${getWrapperSize()}px`;
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = (0, _utils.normalizedTransitionCallback)(nodeRef, onExited);
  const handleExiting = (0, _utils.normalizedTransitionCallback)(nodeRef, node => {
    const wrapperSize = getWrapperSize();
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = (0, _utils.getTransitionProps)({
      style,
      timeout,
      easing
    }, {
      mode: 'exit'
    });
    if (timeout === 'auto' && !reducedMotion.shouldReduceMotion) {
      // getAutoHeightDuration also works for width; it calculates duration from size.
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      autoTransitionDuration.current = duration2;
    } else {
      autoTransitionDuration.current = null;
    }
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: autoTransitionDuration.current ?? transitionDuration,
      delay: undefined
    });
    node.style.transitionDuration = typeof transitionTiming.duration === 'string' ? transitionTiming.duration : `${transitionTiming.duration}ms`;
    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onExiting) {
      onExiting(node);
    }
  });
  const handleAddEndListener = addEndListener ? next => {
    addEndListener(nodeRef.current, next);
  } : undefined;
  const externalForwardedProps = {
    slots,
    slotProps,
    component
  };
  const [RootSlot, rootSlotProps] = (0, _useSlot.default)('root', {
    ref: handleRef,
    className: (0, _clsx.default)(classes.root, className),
    elementType: CollapseRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: {
        [isHorizontal ? 'minWidth' : 'minHeight']: collapsedSize,
        ...style
      }
    }
  });
  const [WrapperSlot, wrapperSlotProps] = (0, _useSlot.default)('wrapper', {
    ref: wrapperRef,
    className: classes.wrapper,
    elementType: CollapseWrapper,
    externalForwardedProps,
    ownerState
  });
  const [WrapperInnerSlot, wrapperInnerSlotProps] = (0, _useSlot.default)('wrapperInner', {
    className: classes.wrapperInner,
    elementType: CollapseWrapperInner,
    externalForwardedProps,
    ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionComponent, {
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    getAutoTimeout: timeout === 'auto' ? () => autoTransitionDuration.current : undefined,
    reduceMotion: reducedMotion.shouldReduceMotion,
    nodeRef: nodeRef,
    timeout: timeout === 'auto' ? null : timeout,
    ...other,
    children: (state, {
      ownerState: incomingOwnerState,
      ...restChildProps
    }) => {
      const stateOwnerState = {
        ...ownerState,
        state
      };
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(RootSlot, {
        ...rootSlotProps,
        className: (0, _clsx.default)(rootSlotProps.className, {
          'entered': classes.entered,
          'exited': !inProp && collapsedSize === '0px' && classes.hidden
        }[state]),
        ownerState: stateOwnerState,
        ...restChildProps,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(WrapperSlot, {
          ...wrapperSlotProps,
          ownerState: stateOwnerState,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(WrapperInnerSlot, {
            ...wrapperInnerSlotProps,
            ownerState: stateOwnerState,
            children: children
          })
        })
      });
    }
  });
});
process.env.NODE_ENV !== "production" ? Collapse.propTypes /* remove-proptypes */ = {
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
   * The content node to be collapsed.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _elementTypeAcceptingRef.default,
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
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    wrapper: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    wrapperInner: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    root: _propTypes.default.elementType,
    wrapper: _propTypes.default.elementType,
    wrapperInner: _propTypes.default.elementType
  }),
  /**
   * @ignore
   */
  style: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })])
} : void 0;
if (Collapse) {
  Collapse.muiSupportAuto = true;
}
var _default = exports.default = Collapse;