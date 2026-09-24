import type { ReducedMotionMode } from "./createMotion.mjs";
export declare const defaultStyles: {
  transition: string;
};
export declare function resolveReducedMotionStyles<Styles extends object>(reducedMotion: ReducedMotionMode | undefined, styles: Styles): Styles | {
  '@media (prefers-reduced-motion: reduce)': Styles;
} | null;