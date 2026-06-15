import _extends from "@babel/runtime/helpers/esm/extends";
import { gridNumberComparator } from "../hooks/features/sorting/gridSortingUtils.mjs";
import { isNumber } from "../utils/utils.mjs";
import { getGridNumericOperators, getGridNumericQuickFilterFn } from "./gridNumericOperators.mjs";
import { GRID_STRING_COL_DEF } from "./gridStringColDef.mjs";
export const GRID_NUMERIC_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'number',
  align: 'right',
  headerAlign: 'right',
  sortComparator: gridNumberComparator,
  valueParser: value => value === '' ? null : Number(value),
  valueFormatter: value => isNumber(value) ? value.toLocaleString() : value || '',
  filterOperators: getGridNumericOperators(),
  getApplyQuickFilterFn: getGridNumericQuickFilterFn
});