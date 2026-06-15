import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_STRING_COL_DEF } from "./gridStringColDef.mjs";
import { renderLongTextCell } from "../components/cell/GridLongTextCell.mjs";
import { renderEditLongTextCell } from "../components/cell/GridEditLongTextCell.mjs";
export const GRID_LONG_TEXT_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'longText',
  display: 'flex',
  renderCell: renderLongTextCell,
  renderEditCell: renderEditLongTextCell
});