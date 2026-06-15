interface ValueRef<T> {
  current: T;
  next: T;
  effect: () => void;
}
/**
 * Copied from `@base-ui/utils/useValueAsRef`.
 *
 * Stores the latest value in a stable ref. The ref updates after React commits,
 * so effects and delayed callbacks can read the current value without depending
 * on it and rerunning.
 */
export default function useValueAsRef<T>(value: T): ValueRef<T>;
export {};