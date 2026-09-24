"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = enhanceHighContrast;
var _accordionSummaryClasses = _interopRequireDefault(require("../AccordionSummary/accordionSummaryClasses"));
var _autocompleteClasses = _interopRequireDefault(require("../Autocomplete/autocompleteClasses"));
var _checkboxClasses = _interopRequireDefault(require("../Checkbox/checkboxClasses"));
var _filledInputClasses = _interopRequireDefault(require("../FilledInput/filledInputClasses"));
var _formControlLabelClasses = _interopRequireDefault(require("../FormControlLabel/formControlLabelClasses"));
var _formHelperTextClasses = _interopRequireDefault(require("../FormHelperText/formHelperTextClasses"));
var _formLabelClasses = _interopRequireDefault(require("../FormLabel/formLabelClasses"));
var _inputClasses = _interopRequireDefault(require("../Input/inputClasses"));
var _listItemButtonClasses = _interopRequireDefault(require("../ListItemButton/listItemButtonClasses"));
var _menuItemClasses = _interopRequireDefault(require("../MenuItem/menuItemClasses"));
var _nativeSelectClasses = _interopRequireDefault(require("../NativeSelect/nativeSelectClasses"));
var _outlinedInputClasses = _interopRequireDefault(require("../OutlinedInput/outlinedInputClasses"));
var _radioClasses = _interopRequireDefault(require("../Radio/radioClasses"));
var _sliderClasses = _interopRequireDefault(require("../Slider/sliderClasses"));
var _toggleButtonClasses = _interopRequireDefault(require("../ToggleButton/toggleButtonClasses"));
// System color keywords used in forced-colors / high contrast mode.
const defaultHcTokens = {
  disabled: 'GrayText',
  error: 'ActiveText',
  selectedBackground: 'SelectedItem',
  selectedText: 'SelectedItemText',
  activeBackground: 'Highlight',
  activeText: 'HighlightText',
  buttonBorder: 'ButtonBorder',
  buttonText: 'ButtonText',
  canvas: 'Canvas'
};
const HCM = '@media (forced-colors: active)';

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
function enhanceHighContrast(themeInput, tokens) {
  const hcTokens = {
    disabled: tokens?.disabled ?? defaultHcTokens.disabled,
    error: tokens?.error ?? defaultHcTokens.error,
    selectedBackground: tokens?.selectedBackground ?? defaultHcTokens.selectedBackground,
    selectedText: tokens?.selectedText ?? defaultHcTokens.selectedText,
    activeBackground: tokens?.activeBackground ?? defaultHcTokens.activeBackground,
    activeText: tokens?.activeText ?? defaultHcTokens.activeText,
    buttonBorder: tokens?.buttonBorder ?? defaultHcTokens.buttonBorder,
    buttonText: tokens?.buttonText ?? defaultHcTokens.buttonText,
    canvas: tokens?.canvas ?? defaultHcTokens.canvas
  };
  const theme = {
    ...themeInput
  };
  const c = theme.components;
  theme.components = {
    ...c,
    MuiAccordionSummary: {
      ...c?.MuiAccordionSummary,
      styleOverrides: {
        ...c?.MuiAccordionSummary?.styleOverrides,
        root: [c?.MuiAccordionSummary?.styleOverrides?.root, {
          [`&.${_accordionSummaryClasses.default.disabled}`]: {
            [HCM]: {
              opacity: 1
            }
          }
        }]
      }
    },
    MuiAutocomplete: {
      ...c?.MuiAutocomplete,
      styleOverrides: {
        ...c?.MuiAutocomplete?.styleOverrides,
        listbox: [c?.MuiAutocomplete?.styleOverrides?.listbox, {
          [`& .${_autocompleteClasses.default.option}`]: {
            '&[aria-disabled="true"]': {
              [HCM]: {
                color: hcTokens.disabled,
                opacity: 1
              }
            },
            [`&.${_autocompleteClasses.default.focused}, &.${_autocompleteClasses.default.focusVisible}`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.activeText,
                backgroundColor: hcTokens.activeBackground
              }
            },
            '&[aria-selected="true"]': {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.selectedText,
                backgroundColor: hcTokens.selectedBackground
              },
              [`&.${_autocompleteClasses.default.focused}`]: {
                [HCM]: {
                  color: hcTokens.activeText,
                  backgroundColor: hcTokens.activeBackground
                }
              }
            }
          }
        }]
      }
    },
    MuiCheckbox: {
      ...c?.MuiCheckbox,
      styleOverrides: {
        ...c?.MuiCheckbox?.styleOverrides,
        root: [c?.MuiCheckbox?.styleOverrides?.root, {
          [`&.${_checkboxClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiFilledInput: {
      ...c?.MuiFilledInput,
      styleOverrides: {
        ...c?.MuiFilledInput?.styleOverrides,
        root: [c?.MuiFilledInput?.styleOverrides?.root, {
          [`&.${_filledInputClasses.default.error}`]: {
            '&::before, &::after': {
              [HCM]: {
                borderBottomColor: hcTokens.error
              }
            }
          },
          [`&.${_filledInputClasses.default.disabled}:before`]: {
            [HCM]: {
              borderBottomStyle: 'solid',
              borderBottomColor: hcTokens.disabled
            }
          },
          [`&.${_filledInputClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiFormControlLabel: {
      ...c?.MuiFormControlLabel,
      styleOverrides: {
        ...c?.MuiFormControlLabel?.styleOverrides,
        root: [c?.MuiFormControlLabel?.styleOverrides?.root, {
          [`& .${_formControlLabelClasses.default.label}.${_formControlLabelClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiFormHelperText: {
      ...c?.MuiFormHelperText,
      styleOverrides: {
        ...c?.MuiFormHelperText?.styleOverrides,
        root: [c?.MuiFormHelperText?.styleOverrides?.root, {
          [`&.${_formHelperTextClasses.default.error}`]: {
            [HCM]: {
              color: hcTokens.error
            }
          },
          [`&.${_formHelperTextClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiFormLabel: {
      ...c?.MuiFormLabel,
      styleOverrides: {
        ...c?.MuiFormLabel?.styleOverrides,
        root: [c?.MuiFormLabel?.styleOverrides?.root, {
          [`&.${_formLabelClasses.default.error}`]: {
            [HCM]: {
              color: hcTokens.error
            }
          },
          [`&.${_formLabelClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiInput: {
      ...c?.MuiInput,
      styleOverrides: {
        ...c?.MuiInput?.styleOverrides,
        root: [c?.MuiInput?.styleOverrides?.root, {
          [`&.${_inputClasses.default.error}`]: {
            '&::before, &::after': {
              [HCM]: {
                borderBottomColor: hcTokens.error
              }
            }
          },
          [`&.${_inputClasses.default.disabled}:before`]: {
            [HCM]: {
              borderBottomStyle: 'solid',
              borderBottomColor: hcTokens.disabled
            }
          },
          [`&.${_inputClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiLinearProgress: {
      ...c?.MuiLinearProgress,
      styleOverrides: {
        ...c?.MuiLinearProgress?.styleOverrides,
        root: [c?.MuiLinearProgress?.styleOverrides?.root, {
          [HCM]: {
            forcedColorAdjust: 'none',
            outline: `1px solid ${hcTokens.buttonBorder}`,
            backgroundColor: hcTokens.canvas
          }
        }],
        bar: [c?.MuiLinearProgress?.styleOverrides?.bar, {
          [HCM]: {
            backgroundColor: hcTokens.buttonText
          }
        }],
        bar2: [c?.MuiLinearProgress?.styleOverrides?.bar2, {
          variants: [{
            props: {
              variant: 'buffer'
            },
            style: {
              [HCM]: {
                backgroundColor: hcTokens.disabled
              }
            }
          }]
        }]
      }
    },
    MuiInputBase: {
      ...c?.MuiInputBase,
      styleOverrides: {
        ...c?.MuiInputBase?.styleOverrides,
        input: [c?.MuiInputBase?.styleOverrides?.input, {
          [HCM]: {
            '&::placeholder': {
              opacity: 1
            }
          }
        }]
      }
    },
    MuiMenuItem: {
      ...c?.MuiMenuItem,
      styleOverrides: {
        ...c?.MuiMenuItem?.styleOverrides,
        root: [c?.MuiMenuItem?.styleOverrides?.root, {
          [`&.${_menuItemClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled,
              opacity: 1
            }
          },
          [`&.${_menuItemClasses.default.focusVisible}, &:hover`]: {
            [HCM]: {
              forcedColorAdjust: 'none',
              color: hcTokens.activeText,
              backgroundColor: hcTokens.activeBackground,
              outline: 'none'
            }
          },
          [`&.${_menuItemClasses.default.selected}`]: {
            [HCM]: {
              forcedColorAdjust: 'none',
              color: hcTokens.selectedText,
              backgroundColor: hcTokens.selectedBackground
            }
          },
          [`&.${_menuItemClasses.default.selected}.${_menuItemClasses.default.focusVisible}, &.${_menuItemClasses.default.selected}:hover`]: {
            [HCM]: {
              color: hcTokens.activeText,
              backgroundColor: hcTokens.activeBackground
            }
          }
        }]
      }
    },
    MuiListItemIcon: {
      ...c?.MuiListItemIcon,
      styleOverrides: {
        ...c?.MuiListItemIcon?.styleOverrides,
        root: [c?.MuiListItemIcon?.styleOverrides?.root, {
          [HCM]: {
            color: 'inherit'
          }
        }]
      }
    },
    MuiListItemButton: {
      ...c?.MuiListItemButton,
      styleOverrides: {
        ...c?.MuiListItemButton?.styleOverrides,
        root: [c?.MuiListItemButton?.styleOverrides?.root, {
          [`&.${_listItemButtonClasses.default.focusVisible}, &:hover`]: {
            [HCM]: {
              forcedColorAdjust: 'none',
              color: hcTokens.activeText,
              backgroundColor: hcTokens.activeBackground
            }
          },
          [`&.${_listItemButtonClasses.default.selected}`]: {
            [HCM]: {
              forcedColorAdjust: 'none',
              color: hcTokens.selectedText,
              backgroundColor: hcTokens.selectedBackground
            }
          },
          [`&.${_listItemButtonClasses.default.selected}.${_listItemButtonClasses.default.focusVisible}, &.${_listItemButtonClasses.default.selected}:hover`]: {
            [HCM]: {
              color: hcTokens.activeText,
              backgroundColor: hcTokens.activeBackground
            }
          }
        }]
      }
    },
    MuiNativeSelect: {
      ...c?.MuiNativeSelect,
      styleOverrides: {
        ...c?.MuiNativeSelect?.styleOverrides,
        icon: [c?.MuiNativeSelect?.styleOverrides?.icon, {
          [`&.${_nativeSelectClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiOutlinedInput: {
      ...c?.MuiOutlinedInput,
      styleOverrides: {
        ...c?.MuiOutlinedInput?.styleOverrides,
        root: [c?.MuiOutlinedInput?.styleOverrides?.root, {
          [`&.${_outlinedInputClasses.default.error} .${_outlinedInputClasses.default.notchedOutline}`]: {
            [HCM]: {
              borderColor: hcTokens.error
            }
          },
          [`&.${_outlinedInputClasses.default.disabled} .${_outlinedInputClasses.default.notchedOutline}`]: {
            [HCM]: {
              borderColor: hcTokens.disabled
            }
          },
          [`&.${_outlinedInputClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiRadio: {
      ...c?.MuiRadio,
      styleOverrides: {
        ...c?.MuiRadio?.styleOverrides,
        root: [c?.MuiRadio?.styleOverrides?.root, {
          [`&.${_radioClasses.default.disabled}`]: {
            [HCM]: {
              color: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiSlider: {
      ...c?.MuiSlider,
      styleOverrides: {
        ...c?.MuiSlider?.styleOverrides,
        // track doesn't receive the disabled class — use ownerState
        track: [c?.MuiSlider?.styleOverrides?.track, ({
          ownerState
        }) => ({
          ...(ownerState.disabled && {
            [HCM]: {
              borderColor: hcTokens.disabled
            }
          })
        })],
        // thumb receives the disabled class directly
        thumb: [c?.MuiSlider?.styleOverrides?.thumb, {
          [`&.${_sliderClasses.default.disabled}`]: {
            [HCM]: {
              borderColor: hcTokens.disabled
            }
          }
        }]
      }
    },
    MuiSwitch: {
      ...c?.MuiSwitch,
      styleOverrides: {
        ...c?.MuiSwitch?.styleOverrides,
        // track and thumb don't receive the disabled class — use ownerState
        track: [c?.MuiSwitch?.styleOverrides?.track, ({
          ownerState
        }) => ({
          ...(ownerState.disabled && {
            [HCM]: {
              borderColor: hcTokens.disabled
            }
          })
        })],
        thumb: [c?.MuiSwitch?.styleOverrides?.thumb, ({
          ownerState
        }) => ({
          ...(ownerState.disabled && {
            [HCM]: {
              borderColor: hcTokens.disabled
            }
          })
        })]
      }
    },
    MuiButtonBase: {
      ...c?.MuiButtonBase,
      styleOverrides: {
        ...c?.MuiButtonBase?.styleOverrides,
        root: [c?.MuiButtonBase?.styleOverrides?.root, {
          // Restore the focus outline in HCM since the ripple is not visible.
          // Also handle components where the focusable element is a hidden inner input (Checkbox, Radio, Switch).
          [HCM]: {
            '&:focus-visible, &:focus-within:has(input:focus-visible)': {
              outline: `5px auto ${hcTokens.activeBackground}`
            }
          }
        }]
      }
    },
    MuiTooltip: {
      ...c?.MuiTooltip,
      styleOverrides: {
        ...c?.MuiTooltip?.styleOverrides,
        tooltip: [c?.MuiTooltip?.styleOverrides?.tooltip, {
          [HCM]: {
            border: `1px solid ${hcTokens.buttonText}`
          }
        }]
      }
    },
    MuiToggleButton: {
      ...c?.MuiToggleButton,
      styleOverrides: {
        ...c?.MuiToggleButton?.styleOverrides,
        root: [c?.MuiToggleButton?.styleOverrides?.root, {
          [`&.${_toggleButtonClasses.default.selected}`]: {
            [HCM]: {
              forcedColorAdjust: 'none',
              color: hcTokens.activeText,
              backgroundColor: hcTokens.activeBackground,
              borderColor: hcTokens.activeBackground
            },
            '&:hover': {
              [HCM]: {
                backgroundColor: hcTokens.activeBackground,
                borderColor: hcTokens.buttonBorder
              }
            }
          }
        }]
      }
    }
  };
  return theme;
}