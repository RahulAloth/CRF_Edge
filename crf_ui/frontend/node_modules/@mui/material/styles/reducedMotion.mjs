export const defaultStyles = {
  transition: 'none'
};
export function resolveReducedMotionStyles(reducedMotion, styles) {
  if (reducedMotion === 'always') {
    return styles;
  }
  if (reducedMotion === 'system') {
    return {
      '@media (prefers-reduced-motion: reduce)': styles
    };
  }
  return null;
}