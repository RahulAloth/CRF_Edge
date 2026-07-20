'use client';

import useEnhancedEffect from "../useEnhancedEffect/useEnhancedEffect.mjs";
import useLazyRef from "../useLazyRef/useLazyRef.mjs";
/**
 * Copied from `@base-ui/utils/useValueAsRef`.
 *
 * Stores the latest value in a stable ref. The ref updates after React commits,
 * so effects and delayed callbacks can read the current value without depending
 * on it and rerunning.
 */
export default function useValueAsRef(value) {
  const latest = useLazyRef(() => createValueRef(value)).current;
  latest.next = value;

  // eslint-disable-next-line react-hooks/exhaustive-deps -- effect never changes; it reads latest.next.
  useEnhancedEffect(latest.effect);
  return latest;
}
function createValueRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    }
  };
  return latest;
}