"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useReducedMotion;
var React = _interopRequireWildcard(require("react"));
var _useEnhancedEffect = _interopRequireDefault(require("@mui/utils/useEnhancedEffect"));
const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';
const REDUCED_MOTION_DURATION = 0;
const REDUCED_MOTION_DELAY = '0ms';
const NOOP = () => {};
const getDefaultSnapshot = () => false;
const getReducedMotionSnapshot = () => true;
const subscribeNoop = () => NOOP;
/**
 * Subscribes to the OS reduced-motion media query only when the theme mode needs it.
 * React 17 reads the media query after mount, matching useMediaQuery's fallback path.
 */
function useReducedMotionMediaQueryOld(enabled) {
  const [queryState, setQueryState] = React.useState(() => ({
    enabled,
    matches: enabled ? null : false
  }));
  let matches = queryState.matches;
  if (queryState.enabled !== enabled) {
    matches = null;
    if (!enabled) {
      matches = false;
    }
  }
  (0, _useEnhancedEffect.default)(() => {
    const setResolvedMatches = nextMatches => {
      setQueryState(previousState => {
        if (previousState.enabled === enabled && previousState.matches === nextMatches) {
          return previousState;
        }
        return {
          enabled,
          matches: nextMatches
        };
      });
    };
    if (!enabled) {
      if (queryState.enabled) {
        setResolvedMatches(false);
      }
      return undefined;
    }
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setResolvedMatches(false);
      return undefined;
    }
    const mediaQueryList = window.matchMedia(MEDIA_QUERY);
    const update = () => {
      setResolvedMatches(mediaQueryList.matches);
    };
    update();
    mediaQueryList.addEventListener('change', update);
    return () => {
      mediaQueryList.removeEventListener('change', update);
    };
  }, [enabled, queryState.enabled]);
  return matches;
}

// See https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379 for why
const safeReact = {
  ...React
};
const maybeReactUseSyncExternalStore = safeReact.useSyncExternalStore;

/**
 * React 18+ can read the media query during client renders, so newly mounted
 * transitions do not start from the SSR-safe reduced-motion default.
 */
function useReducedMotionMediaQueryNew(enabled) {
  const getServerSnapshot = enabled ? getReducedMotionSnapshot : getDefaultSnapshot;
  const [getSnapshot, subscribe] = React.useMemo(() => {
    if (!enabled || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return [getDefaultSnapshot, subscribeNoop];
    }
    const mediaQueryList = window.matchMedia(MEDIA_QUERY);
    return [() => mediaQueryList.matches, notify => {
      mediaQueryList.addEventListener('change', notify);
      return () => {
        mediaQueryList.removeEventListener('change', notify);
      };
    }];
  }, [enabled]);
  return maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
const useReducedMotionMediaQuery = maybeReactUseSyncExternalStore !== undefined ? useReducedMotionMediaQueryNew : useReducedMotionMediaQueryOld;

/**
 * Resolves whether a Material UI transition should reduce motion and provides
 * adjusted CSS transition timing for MUI-owned duration/delay values.
 */
function useReducedMotion(mode, disablePrefersReducedMotion) {
  const prefersReducedMotion = useReducedMotionMediaQuery(!disablePrefersReducedMotion && mode === 'system');
  const shouldReduceMotion = !disablePrefersReducedMotion && (mode === 'always' || mode === 'system' && prefersReducedMotion !== false);
  return React.useMemo(() => ({
    shouldReduceMotion,
    getTransitionTiming(timing) {
      if (!shouldReduceMotion) {
        return timing;
      }
      return {
        duration: REDUCED_MOTION_DURATION,
        delay: REDUCED_MOTION_DELAY
      };
    }
  }), [shouldReduceMotion]);
}