"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowsOverridableMethods = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
var React = _interopRequireWildcard(require("react"));
var _gridRowsSelector = require("./gridRowsSelector");
var _gridFilterSelector = require("../filter/gridFilterSelector");
var _gridRowsUtils = require("./gridRowsUtils");
const useGridRowsOverridableMethods = apiRef => {
  const setRowPosition = React.useCallback((sourceRowId, targetRowId, position) => {
    const sourceNode = (0, _gridRowsSelector.gridRowNodeSelector)(apiRef, sourceRowId);
    const targetNode = (0, _gridRowsSelector.gridRowNodeSelector)(apiRef, targetRowId);
    if (!sourceNode) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: No row with id #${sourceRowId} found.` : (0, _formatErrorMessage2.default)(89, sourceRowId));
    }
    if (!targetNode) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: No row with id #${targetRowId} found.` : (0, _formatErrorMessage2.default)(89, targetRowId));
    }
    if (sourceNode.type !== 'leaf') {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: The row reordering does not support reordering of footer or grouping rows.` : (0, _formatErrorMessage2.default)(93));
    }
    if (position === 'inside') {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: The 'inside' position is only supported for tree data. Use 'above' or 'below' for flat data.` : (0, _formatErrorMessage2.default)(94));
    }

    // Resolve positions in the filtered view to detect visible-order no-ops.
    const sortedFilteredRowIndexLookup = (0, _gridFilterSelector.gridExpandedSortedRowIndexLookupSelector)(apiRef);
    const targetFilteredIndex = sortedFilteredRowIndexLookup[targetRowId];
    const sourceFilteredIndex = sortedFilteredRowIndexLookup[sourceRowId];
    if (targetFilteredIndex === undefined) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: Target row with id #${targetRowId} not found in current view.` : (0, _formatErrorMessage2.default)(95, targetRowId));
    }
    if (sourceFilteredIndex === undefined) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: Source row with id #${sourceRowId} not found in current view.` : (0, _formatErrorMessage2.default)(96, sourceRowId));
    }

    // No-op when the requested drop would not change the visible order.
    // Mutating the backing tree here would silently reshuffle filtered-out
    // rows around the source without any visible feedback.
    if (sourceFilteredIndex === targetFilteredIndex || position === 'above' && sourceFilteredIndex === targetFilteredIndex - 1 || position === 'below' && sourceFilteredIndex === targetFilteredIndex + 1) {
      return;
    }
    apiRef.current.setState(state => {
      const group = (0, _gridRowsSelector.gridRowTreeSelector)(apiRef)[_gridRowsUtils.GRID_ROOT_GROUP_ID];
      const allRows = group.children;

      // Single pass: skip source and inline-insert it adjacent to the target
      // anchor id so filtered-out rows between source and target keep their
      // position next to the anchor.
      const updatedRows = [];
      let sourceFound = false;
      let targetFound = false;
      for (let i = 0; i < allRows.length; i += 1) {
        const id = allRows[i];
        if (id === sourceRowId) {
          sourceFound = true;
          continue;
        }
        if (id === targetRowId) {
          targetFound = true;
          if (position === 'above') {
            updatedRows.push(sourceRowId, id);
          } else {
            updatedRows.push(id, sourceRowId);
          }
          continue;
        }
        updatedRows.push(id);
      }
      if (!sourceFound || !targetFound) {
        return state;
      }
      return (0, _extends2.default)({}, state, {
        rows: (0, _extends2.default)({}, state.rows, {
          tree: (0, _extends2.default)({}, state.rows.tree, {
            [_gridRowsUtils.GRID_ROOT_GROUP_ID]: (0, _extends2.default)({}, group, {
              children: updatedRows
            })
          })
        })
      });
    });
    apiRef.current.publishEvent('rowsSet');
  }, [apiRef]);
  const setRowIndex = React.useCallback((rowId, targetIndex) => {
    const node = (0, _gridRowsSelector.gridRowNodeSelector)(apiRef, rowId);
    if (!node) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X Data Grid: No row with id "${rowId}" found. ` + 'The row to reorder does not exist in the grid. ' + 'Verify the row id is correct and the row exists.' : (0, _formatErrorMessage2.default)(97, rowId));
    }
    if (node.type !== 'leaf') {
      throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: Row reordering does not support reordering of footer or grouping rows. ' + 'Only leaf (data) rows can be reordered. ' + 'Ensure you are only reordering data rows.' : (0, _formatErrorMessage2.default)(98));
    }
    apiRef.current.setState(state => {
      const group = (0, _gridRowsSelector.gridRowTreeSelector)(apiRef)[_gridRowsUtils.GRID_ROOT_GROUP_ID];
      const allRows = group.children;
      const oldIndex = allRows.findIndex(row => row === rowId);
      if (oldIndex === -1 || oldIndex === targetIndex) {
        return state;
      }
      const updatedRows = [...allRows];
      updatedRows.splice(targetIndex, 0, updatedRows.splice(oldIndex, 1)[0]);
      return (0, _extends2.default)({}, state, {
        rows: (0, _extends2.default)({}, state.rows, {
          tree: (0, _extends2.default)({}, state.rows.tree, {
            [_gridRowsUtils.GRID_ROOT_GROUP_ID]: (0, _extends2.default)({}, group, {
              children: updatedRows
            })
          })
        })
      });
    });
    apiRef.current.publishEvent('rowsSet');
  }, [apiRef]);
  return {
    setRowIndex,
    setRowPosition
  };
};
exports.useGridRowsOverridableMethods = useGridRowsOverridableMethods;