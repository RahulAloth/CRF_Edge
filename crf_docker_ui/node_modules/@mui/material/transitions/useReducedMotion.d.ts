import type { ReducedMotionMode } from "../styles/createMotion.js";
interface TransitionTiming {
  duration: string | number;
  delay: string | undefined;
}
/**
 * Resolves whether a Material UI transition should reduce motion and provides
 * adjusted CSS transition timing for MUI-owned duration/delay values.
 */
export default function useReducedMotion(mode: ReducedMotionMode, disablePrefersReducedMotion: boolean | undefined): {
  shouldReduceMotion: boolean;
  getTransitionTiming(timing: TransitionTiming): TransitionTiming;
};
export {};