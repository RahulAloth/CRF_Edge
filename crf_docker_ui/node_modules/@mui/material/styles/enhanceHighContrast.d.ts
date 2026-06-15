import { Theme } from "./createTheme.js";
export interface HighContrastTokens {
  /**
   * Color for disabled elements.
   * @default 'GrayText'
   */
  disabled?: string | undefined;
  /**
   * Color for error states.
   * @default 'ActiveText'
   */
  error?: string | undefined;
  /**
   * Background color for selected items.
   * @default 'SelectedItem'
   */
  selectedBackground?: string | undefined;
  /**
   * Text color on selected items.
   * @default 'SelectedItemText'
   */
  selectedText?: string | undefined;
  /**
   * Background color for active/toggled controls.
   * @default 'Highlight'
   */
  activeBackground?: string | undefined;
  /**
   * Text color on active/toggled controls.
   * @default 'HighlightText'
   */
  activeText?: string | undefined;
  /**
   * Border color for interactive controls.
   * @default 'ButtonBorder'
   */
  buttonBorder?: string | undefined;
  /**
   * Text/icon color on buttons.
   * @default 'ButtonText'
   */
  buttonText?: string | undefined;
  /**
   * Background color for the page/canvas.
   * @default 'Canvas'
   */
  canvas?: string | undefined;
}
/**
 * Enhances a theme with styles for Windows High Contrast Mode (forced-colors).
 *
 * Accepts a fully-created theme, merges in HCM component overrides using arrays
 * so that Emotion emits each entry as a separate CSS rule and the browser
 * cascade (rather than JS object merging) resolves specificity.
 *
 * @param themeInput - The theme to enhance.
 * @param tokens - Override any of the default system color tokens.
 * @returns The enhanced theme (same type as the input).
 *
 * @example
 * // Use defaults
 * const theme = enhanceHighContrast(createTheme({ palette: { ... } }));
 *
 * @example
 * // Override specific tokens
 * const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });
 */
export default function enhanceHighContrast<T extends {
  components?: Theme['components'] | undefined;
}>(themeInput: T, tokens?: HighContrastTokens): T;