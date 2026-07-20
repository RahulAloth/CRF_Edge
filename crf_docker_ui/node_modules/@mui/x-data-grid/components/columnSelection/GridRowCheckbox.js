"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridRowCheckbox = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _forwardRef = require("@mui/x-internals/forwardRef");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["rowId", "material"];
const GridRowCheckbox = exports.GridRowCheckbox = (0, _forwardRef.forwardRef)(function GridRowCheckbox(props, ref) {
  const {
      material
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseCheckbox, (0, _extends2.default)({}, rootProps.slotProps?.baseCheckbox, other, {
    material: (0, _extends2.default)({
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
  autoFocus: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  className: _propTypes.default.string,
  density: _propTypes.default.oneOf(['compact', 'standard']),
  disabled: _propTypes.default.bool,
  fullWidth: _propTypes.default.bool,
  id: _propTypes.default.string,
  indeterminate: _propTypes.default.bool,
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.object
  })]),
  label: _propTypes.default.node,
  name: _propTypes.default.string,
  /**
   * The grid row id.
   */
  rowId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  size: _propTypes.default.oneOf(['medium', 'small']),
  slotProps: _propTypes.default.object,
  style: _propTypes.default.object,
  tabIndex: _propTypes.default.number,
  touchRippleRef: _propTypes.default.any
} : void 0;