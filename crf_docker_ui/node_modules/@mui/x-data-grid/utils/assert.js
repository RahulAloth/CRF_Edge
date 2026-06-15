"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotRendered = NotRendered;
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
function NotRendered(_props) {
  throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X: Failed assertion: should not be rendered' : (0, _formatErrorMessage2.default)(57));
}