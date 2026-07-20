import * as React from 'react';
import { defaultStyles } from "../styles/reducedMotion.js";
import type { ReducedMotionMode } from "../styles/createMotion.js";
export declare const reflow: (node: Element) => number;
interface ComponentProps {
  easing: string | {
    enter?: string | undefined;
    exit?: string | undefined;
  } | undefined;
  style: React.CSSProperties | undefined;
  timeout: number | {
    enter?: number | undefined;
    exit?: number | undefined;
  };
}
interface Options {
  mode: 'enter' | 'exit';
}
interface TransitionProps {
  duration: string | number;
  easing: string | undefined;
  delay: string | undefined;
}
interface TransitionCreateOptions {
  duration: number | string;
  easing: string;
  delay: number | string;
}
interface TranslateOffset {
  offsetX: number;
  offsetY: number;
}
/**
 * Extracts the x/y translation from a CSS transform string.
 *
 * Transition components use these offsets when calculating off-screen positions:
 * if an element is already translated, the distance needed to hide it must start
 * from that visual position instead of its untransformed layout position.
 *
 * CSSOM commonly serializes translations as matrix() or matrix3d(), while inline
 * gesture styles may use translate(), translate3d(), translateX(), or
 * translateY(). This helper normalizes those supported forms into numeric pixel
 * offsets and returns zero offsets for empty, none, or unsupported transforms.
 */
export declare function getTranslateOffsets(transform: string | undefined): TranslateOffset;
export declare function normalizedTransitionCallback(nodeRef: React.RefObject<HTMLElement | null>, callback: ((node: HTMLElement, isAppearing?: boolean) => void) | undefined): (maybeIsAppearing?: boolean) => void;
type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';
/**
 * Return the child style for a transition. Reuse predefined style objects when
 * no custom styles are present so memoized children see the same object.
 */
export declare function getTransitionChildStyle(state: TransitionState, inProp: boolean | undefined, baseStyles: Record<string, React.CSSProperties>, hiddenStyles: React.CSSProperties, styleProp: React.CSSProperties | undefined, childStyle: React.CSSProperties | undefined): React.CSSProperties | undefined;
export declare function getTransitionProps(props: ComponentProps, options: Options): TransitionProps;
/**
 * Returns CSS that disables component-owned transitions when reduced motion is active.
 * Pass custom styles only when the default `transition: none` reset is not enough.
 */
export declare function getReducedMotionStyles<Styles extends object = typeof defaultStyles>(theme: {
  motion?: {
    reducedMotion?: ReducedMotionMode | undefined;
  } | undefined;
}, styles?: Styles): Styles | {
  '@media (prefers-reduced-motion: reduce)': Styles;
} | null;
export declare function getTransitionStyles(theme: {
  transitions?: {
    create: (props?: string | string[], options?: Partial<TransitionCreateOptions>) => string;
  } | undefined;
  motion?: {
    reducedMotion?: ReducedMotionMode | undefined;
  } | undefined;
}, props?: string | string[], options?: Partial<TransitionCreateOptions>): React.CSSProperties | {
  transition: string;
} | {
  '@media (prefers-reduced-motion: reduce)': {
    transition: string;
  };
};
export {};