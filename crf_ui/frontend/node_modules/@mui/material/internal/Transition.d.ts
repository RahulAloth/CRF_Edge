import * as React from 'react';
type RenderedTransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
type TransitionEndListener = ((done: () => void) => void) | ((node: HTMLElement, done: () => void) => void);
interface InternalTransitionProps {
  in?: boolean | undefined;
  appear?: boolean | undefined;
  enter?: boolean | undefined;
  exit?: boolean | undefined;
  timeout?: number | null | {
    appear?: number | undefined;
    enter?: number | undefined;
    exit?: number | undefined;
  } | undefined;
  nodeRef: React.RefObject<HTMLElement | null>;
  mountOnEnter?: boolean | undefined;
  unmountOnExit?: boolean | undefined;
  addEndListener?: TransitionEndListener | undefined;
  reduceMotion?: boolean | undefined;
  getAutoTimeout?: (() => number | null | undefined) | undefined;
  onEnter?: ((isAppearing: boolean) => void) | undefined;
  onEntering?: ((isAppearing: boolean) => void) | undefined;
  onEntered?: ((isAppearing: boolean) => void) | undefined;
  onExit?: (() => void) | undefined;
  onExiting?: (() => void) | undefined;
  onExited?: (() => void) | undefined;
  children: (status: RenderedTransitionStatus, childProps: Record<string, unknown>) => React.ReactNode;
  [key: string]: unknown;
}
declare function Transition(props: InternalTransitionProps): React.ReactNode;
declare namespace Transition {
  var propTypes: any;
}
export default Transition;
export type { InternalTransitionProps, RenderedTransitionStatus };