'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useStoreEffect } from '@mui/x-internals/store';
import { useGridEventPriority } from "../../utils/useGridEvent.mjs";
import { useGridApiMethod } from "../../utils/useGridApiMethod.mjs";
import { createSelector } from "../../../utils/createSelector.mjs";
import { useGridLogger } from "../../utils/useGridLogger.mjs";
import { gridColumnPositionsSelector, gridVisibleColumnDefinitionsSelector, gridVisiblePinnedColumnDefinitionsSelector } from "../columns/index.mjs";
import { gridDimensionsSelector } from "./gridDimensionsSelectors.mjs";
import { gridDensityFactorSelector } from "../density/index.mjs";
import { getValidRowHeight, rowHeightWarning } from "../rows/gridRowsUtils.mjs";
import { getTotalHeaderHeight } from "../columns/gridColumnsUtils.mjs";
import { DATA_GRID_PROPS_DEFAULT_VALUES } from "../../../constants/dataGridPropsDefaultValues.mjs";
import { roundToDecimalPlaces } from "../../../utils/roundToDecimalPlaces.mjs";
import { isJSDOM } from "../../../utils/isJSDOM.mjs";
const EMPTY_SIZE = {
  width: 0,
  height: 0
};
const EMPTY_DIMENSIONS = {
  isReady: false,
  root: EMPTY_SIZE,
  viewportOuterSize: EMPTY_SIZE,
  viewportInnerSize: EMPTY_SIZE,
  contentSize: EMPTY_SIZE,
  minimumSize: EMPTY_SIZE,
  hasScrollX: false,
  hasScrollY: false,
  scrollbarSize: 0,
  headerHeight: 0,
  groupHeaderHeight: 0,
  headerFilterHeight: 0,
  rowWidth: 0,
  rowHeight: 0,
  columnsTotalWidth: 0,
  leftPinnedWidth: 0,
  rightPinnedWidth: 0,
  headersTotalHeight: 0,
  topContainerHeight: 0,
  bottomContainerHeight: 0,
  autoHeight: false,
  minimalContentHeight: undefined
};
export const dimensionsStateInitializer = (state, props, apiRef) => {
  const dimensions = EMPTY_DIMENSIONS;
  const density = gridDensityFactorSelector(apiRef);
  const dimensionsWithStatic = _extends({}, dimensions, getStaticDimensions(props, apiRef, density, gridVisiblePinnedColumnDefinitionsSelector(apiRef)));
  apiRef.current.store.state.dimensions = dimensionsWithStatic;
  return _extends({}, state, {
    dimensions: dimensionsWithStatic
  });
};
const columnsTotalWidthSelector = createSelector(gridVisibleColumnDefinitionsSelector, gridColumnPositionsSelector, (visibleColumns, positions) => {
  const colCount = visibleColumns.length;
  if (colCount === 0) {
    return 0;
  }
  return roundToDecimalPlaces(positions[colCount - 1] + visibleColumns[colCount - 1].computedWidth, 1);
});
export function useGridDimensions(apiRef, props) {
  const getRootDimensions = React.useCallback(() => gridDimensionsSelector(apiRef), [apiRef]);
  const apiPublic = {
    getRootDimensions
  };
  const apiPrivate = {
    updateDimensions: () => {
      return apiRef.current.virtualizer.api.updateDimensions();
    },
    getViewportPageSize: () => {
      return apiRef.current.virtualizer.api.getViewportPageSize();
    }
  };
  useGridApiMethod(apiRef, apiPublic, 'public');
  useGridApiMethod(apiRef, apiPrivate, 'private');
  const handleRootMount = root => {
    setCSSVariables(root, gridDimensionsSelector(apiRef));
  };
  useGridEventPriority(apiRef, 'rootMount', handleRootMount);
  useGridEventPriority(apiRef, 'debouncedResize', props.onResize);
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable react-hooks/rules-of-hooks */
    const logger = useGridLogger(apiRef, 'useResizeContainer');
    const errorShown = React.useRef(false);
    useGridEventPriority(apiRef, 'resize', size => {
      if (!getRootDimensions().isReady) {
        return;
      }
      if (size.height === 0 && !errorShown.current && !props.autoHeight && !isJSDOM) {
        logger.error(['The parent DOM element of the Data Grid has an empty height.', 'Please make sure that this element has an intrinsic height.', 'The grid displays with a height of 0px.', '', 'More details: https://mui.com/r/x-data-grid-no-dimensions.'].join('\n'));
        errorShown.current = true;
      }
      if (size.width === 0 && !errorShown.current && !isJSDOM) {
        logger.error(['The parent DOM element of the Data Grid has an empty width.', 'Please make sure that this element has an intrinsic width.', 'The grid displays with a width of 0px.', '', 'More details: https://mui.com/r/x-data-grid-no-dimensions.'].join('\n'));
        errorShown.current = true;
      }
    });
    /* eslint-enable react-hooks/rules-of-hooks */
  }
  useStoreEffect(apiRef.current.store, s => s.dimensions, (previous, next) => {
    if (!next.isReady) {
      return;
    }
    if (apiRef.current.rootElementRef.current) {
      setCSSVariables(apiRef.current.rootElementRef.current, next);
    }
    const virtualScroller = apiRef.current.virtualScrollerRef?.current;
    if (virtualScroller) {
      const maxScrollLeft = Math.max(0, next.rowWidth - next.viewportOuterSize.width);
      const currentScrollLeft = Math.abs(virtualScroller.scrollLeft);
      if (currentScrollLeft > maxScrollLeft) {
        apiRef.current.scroll({
          left: maxScrollLeft
        });
      }
    }
    if (!areElementSizesEqual(next.viewportInnerSize, previous.viewportInnerSize)) {
      apiRef.current.publishEvent('viewportInnerSizeChange', next.viewportInnerSize);
    }
    apiRef.current.publishEvent('debouncedResize', next.root);
  });
}
function setCSSVariables(root, dimensions) {
  const set = (k, v) => root.style.setProperty(k, v);
  set('--DataGrid-hasScrollX', `${Number(dimensions.hasScrollX)}`);
  set('--DataGrid-hasScrollY', `${Number(dimensions.hasScrollY)}`);
  set('--DataGrid-scrollbarSize', `${dimensions.scrollbarSize}px`);
  set('--DataGrid-rowWidth', `${dimensions.rowWidth}px`);
  set('--DataGrid-columnsTotalWidth', `${dimensions.columnsTotalWidth}px`);
  set('--DataGrid-leftPinnedWidth', `${dimensions.leftPinnedWidth}px`);
  set('--DataGrid-rightPinnedWidth', `${dimensions.rightPinnedWidth}px`);
  set('--DataGrid-headerHeight', `${dimensions.headerHeight}px`);
  set('--DataGrid-headersTotalHeight', `${dimensions.headersTotalHeight}px`);
  set('--DataGrid-topContainerHeight', `${dimensions.topContainerHeight}px`);
  set('--DataGrid-bottomContainerHeight', `${dimensions.bottomContainerHeight}px`);
  set('--DataGrid-horizontalFiller', `${Math.max(0, dimensions.viewportOuterSize.width - dimensions.columnsTotalWidth)}px`);
  set('--height', `${dimensions.rowHeight}px`);
}
function getStaticDimensions(props, apiRef, density, pinnedColumnns) {
  const validRowHeight = getValidRowHeight(props.rowHeight, DATA_GRID_PROPS_DEFAULT_VALUES.rowHeight, rowHeightWarning);
  return {
    rowHeight: Math.floor(validRowHeight * density),
    headerHeight: Math.floor(props.columnHeaderHeight * density),
    groupHeaderHeight: Math.floor((props.columnGroupHeaderHeight ?? props.columnHeaderHeight) * density),
    headerFilterHeight: Math.floor((props.headerFilterHeight ?? props.columnHeaderHeight) * density),
    columnsTotalWidth: columnsTotalWidthSelector(apiRef),
    headersTotalHeight: getTotalHeaderHeight(apiRef, props),
    leftPinnedWidth: pinnedColumnns.left.reduce((w, col) => w + col.computedWidth, 0),
    rightPinnedWidth: pinnedColumnns.right.reduce((w, col) => w + col.computedWidth, 0)
  };
}
function areElementSizesEqual(a, b) {
  return a.width === b.width && a.height === b.height;
}