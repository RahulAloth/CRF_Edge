import _extends from "@babel/runtime/helpers/esm/extends";
import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
import { gridRowTreeSelector, gridRowNodeSelector } from "./gridRowsSelector.mjs";
import { gridExpandedSortedRowIndexLookupSelector } from "../filter/gridFilterSelector.mjs";
import { GRID_ROOT_GROUP_ID } from "./gridRowsUtils.mjs";
export const useGridRowsOverridableMethods = apiRef => {
  const setRowPosition = React.useCallback((sourceRowId, targetRowId, position) => {
    const sourceNode = gridRowNodeSelector(apiRef, sourceRowId);
    const targetNode = gridRowNodeSelector(apiRef, targetRowId);
    if (!sourceNode) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: No row with id #${sourceRowId} found.` : _formatErrorMessage(89, sourceRowId));
    }
    if (!targetNode) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: No row with id #${targetRowId} found.` : _formatErrorMessage(89, targetRowId));
    }
    if (sourceNode.type !== 'leaf') {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: The row reordering does not support reordering of footer or grouping rows.` : _formatErrorMessage(93));
    }
    if (position === 'inside') {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: The 'inside' position is only supported for tree data. Use 'above' or 'below' for flat data.` : _formatErrorMessage(94));
    }

    // Resolve positions in the filtered view to detect visible-order no-ops.
    const sortedFilteredRowIndexLookup = gridExpandedSortedRowIndexLookupSelector(apiRef);
    const targetFilteredIndex = sortedFilteredRowIndexLookup[targetRowId];
    const sourceFilteredIndex = sortedFilteredRowIndexLookup[sourceRowId];
    if (targetFilteredIndex === undefined) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: Target row with id #${targetRowId} not found in current view.` : _formatErrorMessage(95, targetRowId));
    }
    if (sourceFilteredIndex === undefined) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: Source row with id #${sourceRowId} not found in current view.` : _formatErrorMessage(96, sourceRowId));
    }

    // No-op when the requested drop would not change the visible order.
    // Mutating the backing tree here would silently reshuffle filtered-out
    // rows around the source without any visible feedback.
    if (sourceFilteredIndex === targetFilteredIndex || position === 'above' && sourceFilteredIndex === targetFilteredIndex - 1 || position === 'below' && sourceFilteredIndex === targetFilteredIndex + 1) {
      return;
    }
    apiRef.current.setState(state => {
      const group = gridRowTreeSelector(apiRef)[GRID_ROOT_GROUP_ID];
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
      return _extends({}, state, {
        rows: _extends({}, state.rows, {
          tree: _extends({}, state.rows.tree, {
            [GRID_ROOT_GROUP_ID]: _extends({}, group, {
              children: updatedRows
            })
          })
        })
      });
    });
    apiRef.current.publishEvent('rowsSet');
  }, [apiRef]);
  const setRowIndex = React.useCallback((rowId, targetIndex) => {
    const node = gridRowNodeSelector(apiRef, rowId);
    if (!node) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X Data Grid: No row with id "${rowId}" found. ` + 'The row to reorder does not exist in the grid. ' + 'Verify the row id is correct and the row exists.' : _formatErrorMessage(97, rowId));
    }
    if (node.type !== 'leaf') {
      throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: Row reordering does not support reordering of footer or grouping rows. ' + 'Only leaf (data) rows can be reordered. ' + 'Ensure you are only reordering data rows.' : _formatErrorMessage(98));
    }
    apiRef.current.setState(state => {
      const group = gridRowTreeSelector(apiRef)[GRID_ROOT_GROUP_ID];
      const allRows = group.children;
      const oldIndex = allRows.findIndex(row => row === rowId);
      if (oldIndex === -1 || oldIndex === targetIndex) {
        return state;
      }
      const updatedRows = [...allRows];
      updatedRows.splice(targetIndex, 0, updatedRows.splice(oldIndex, 1)[0]);
      return _extends({}, state, {
        rows: _extends({}, state.rows, {
          tree: _extends({}, state.rows.tree, {
            [GRID_ROOT_GROUP_ID]: _extends({}, group, {
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