'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["rowId", "material"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from '@mui/x-internals/forwardRef';
import { useGridRootProps } from "../../hooks/utils/useGridRootProps.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
const GridRowCheckbox = forwardRef(function GridRowCheckbox(props, ref) {
  const {
      material
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootProps = useGridRootProps();
  return /*#__PURE__*/_jsx(rootProps.slots.baseCheckbox, _extends({}, rootProps.slotProps?.baseCheckbox, other, {
    material: _extends({
      disableRipple: props.disabled
    }, material),
    ref: ref
  }));
});
if (process.env.NODE_ENV !== "production") GridRowCheckbox.displayName = "GridRowCheckbox";
process.env.NODE_ENV !== "production" ? GridRowCheckbox.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  density: PropTypes.oneOf(['compact', 'standard']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  indeterminate: PropTypes.bool,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.object
  })]),
  label: PropTypes.node,
  name: PropTypes.string,
  /**
   * The grid row id.
   */
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  size: PropTypes.oneOf(['medium', 'small']),
  slotProps: PropTypes.object,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  touchRippleRef: PropTypes.any
} : void 0;
export { GridRowCheckbox };