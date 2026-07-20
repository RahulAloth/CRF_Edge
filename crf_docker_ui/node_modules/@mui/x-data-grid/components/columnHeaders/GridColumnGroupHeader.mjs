'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import useId from '@mui/utils/useId';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '@mui/utils/capitalize';
import { useRtl } from '@mui/system/RtlProvider';
import { useGridPrivateApiContext } from "../../hooks/utils/useGridPrivateApiContext.mjs";
import { doesSupportPreventScroll } from "../../utils/doesSupportPreventScroll.mjs";
import { getDataGridUtilityClass } from "../../constants/gridClasses.mjs";
import { useGridRootProps } from "../../hooks/utils/useGridRootProps.mjs";
import { gridColumnGroupsLookupSelector } from "../../hooks/features/columnGrouping/gridColumnGroupsSelector.mjs";
import { useGridSelector } from "../../hooks/utils/useGridSelector.mjs";
import { GridGenericColumnHeaderItem } from "./GridGenericColumnHeaderItem.mjs";
import { isEventTargetInPortal } from "../../utils/domUtils.mjs";
import { PinnedColumnPosition } from "../../internals/constants.mjs";
import { attachPinnedStyle } from "../../internals/utils/index.mjs";
import { usePinnedScrollOffset } from "../../hooks/utils/usePinnedScrollOffset.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes,
    headerAlign,
    isDragging,
    isLastColumn,
    showLeftBorder,
    showRightBorder,
    groupId,
    pinnedPosition
  } = ownerState;
  const slots = {
    root: ['columnHeader', headerAlign && `columnHeader--align${capitalize(headerAlign)}`, isDragging && 'columnHeader--moving', showRightBorder && 'columnHeader--withRightBorder', showLeftBorder && 'columnHeader--withLeftBorder', 'withBorderColor', groupId === null ? 'columnHeader--emptyGroup' : 'columnHeader--filledGroup', pinnedPosition === PinnedColumnPosition.LEFT && 'columnHeader--pinnedLeft', pinnedPosition === PinnedColumnPosition.RIGHT && 'columnHeader--pinnedRight', isLastColumn && 'columnHeader--last'],
    draggableContainer: ['columnHeaderDraggableContainer'],
    titleContainer: ['columnHeaderTitleContainer', 'withBorderColor'],
    titleContainerContent: ['columnHeaderTitleContainerContent']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridColumnGroupHeader(props) {
  const {
    groupId,
    width,
    depth,
    maxDepth,
    fields,
    height,
    colIndex,
    hasFocus,
    tabIndex,
    isLastColumn,
    pinnedPosition,
    pinnedOffset
  } = props;
  const apiRef = useGridPrivateApiContext();
  const rootProps = useGridRootProps();
  const isRtl = useRtl();
  const headerCellRef = React.useRef(null);
  const columnGroupsLookup = useGridSelector(apiRef, gridColumnGroupsLookupSelector);
  const group = groupId ? columnGroupsLookup[groupId] : {};
  const {
    headerName = groupId ?? '',
    description = '',
    headerAlign = undefined
  } = group;
  let headerComponent;
  const render = groupId && columnGroupsLookup[groupId]?.renderHeaderGroup;
  const renderParams = React.useMemo(() => ({
    groupId,
    headerName,
    description,
    depth,
    maxDepth,
    fields,
    colIndex,
    isLastColumn
  }), [groupId, headerName, description, depth, maxDepth, fields, colIndex, isLastColumn]);
  if (groupId && render) {
    headerComponent = render(renderParams);
  }
  const ownerState = _extends({}, props, {
    classes: rootProps.classes,
    headerAlign,
    depth,
    isDragging: false
  });
  const label = headerName ?? groupId;
  const id = useId();
  const elementId = groupId === null ? `empty-group-cell-${id}` : groupId;
  const classes = useUtilityClasses(ownerState);
  React.useLayoutEffect(() => {
    if (hasFocus) {
      const focusableElement = headerCellRef.current.querySelector('[tabindex="0"]');
      const elementToFocus = focusableElement || headerCellRef.current;
      if (!elementToFocus) {
        return;
      }
      if (doesSupportPreventScroll()) {
        elementToFocus.focus({
          preventScroll: true
        });
      } else {
        const scrollPosition = apiRef.current.getScrollPosition();
        elementToFocus.focus();
        apiRef.current.scroll(scrollPosition);
      }
    }
  }, [apiRef, hasFocus]);
  const publish = React.useCallback(eventName => event => {
    // Ignore portal
    // See https://github.com/mui/mui-x/issues/1721
    if (isEventTargetInPortal(event)) {
      return;
    }
    apiRef.current.publishEvent(eventName, renderParams, event);
  },
  // For now this is stupid, because renderParams change all the time.
  // Need to move it's computation in the api, such that for a given depth+columnField, I can get the group parameters
  [apiRef, renderParams]);
  const mouseEventsHandlers = React.useMemo(() => ({
    onKeyDown: publish('columnGroupHeaderKeyDown'),
    onFocus: publish('columnGroupHeaderFocus'),
    onBlur: publish('columnGroupHeaderBlur')
  }), [publish]);
  const headerClassName = typeof group.headerClassName === 'function' ? group.headerClassName(renderParams) : group.headerClassName;
  const pinnedScrollOffset = usePinnedScrollOffset(apiRef, pinnedPosition);
  const style = React.useMemo(() => attachPinnedStyle(_extends({}, props.style), isRtl, pinnedPosition, pinnedOffset !== undefined ? pinnedOffset + pinnedScrollOffset : undefined), [pinnedPosition, pinnedOffset, pinnedScrollOffset, props.style, isRtl]);
  return /*#__PURE__*/_jsx(GridGenericColumnHeaderItem, _extends({
    ref: headerCellRef,
    classes: classes,
    columnMenuOpen: false,
    colIndex: colIndex,
    height: height,
    isResizing: false,
    sortDirection: null,
    hasFocus: false,
    tabIndex: tabIndex,
    isDraggable: false,
    headerComponent: headerComponent,
    headerClassName: headerClassName,
    description: description,
    elementId: elementId,
    width: width,
    columnMenuIconButton: null,
    columnTitleIconButtons: null,
    resizable: false,
    label: label,
    "aria-colspan": fields.length
    // The fields are wrapped between |-...-| to avoid confusion between fields "id" and "id2" when using selector data-fields~=
    ,
    "data-fields": `|-${fields.join('-|-')}-|`,
    style: style
  }, mouseEventsHandlers));
}
export { GridColumnGroupHeader };