'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { NotRendered } from "../utils/assert.mjs";
import { useGridSelector } from "../hooks/utils/useGridSelector.mjs";
import { useGridApiContext } from "../hooks/utils/useGridApiContext.mjs";
import { useGridRootProps } from "../hooks/utils/useGridRootProps.mjs";
import { gridPaginationModelSelector, gridPaginationRowCountSelector, gridPageCountSelector } from "../hooks/features/pagination/gridPaginationSelector.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
const GridPaginationRoot = styled(NotRendered, {
  slot: 'internal'
})({
  maxHeight: 'calc(100% + 1px)',
  // border width
  flexGrow: 1
});
function GridPagination() {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const rowCount = useGridSelector(apiRef, gridPaginationRowCountSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const {
    paginationMode,
    loading
  } = rootProps;
  const unknownRowCount = rowCount == null || rowCount === -1;
  const disabled = unknownRowCount && paginationMode === 'server' && loading;
  const lastPage = React.useMemo(() => Math.max(0, pageCount - 1), [pageCount]);
  const computedPage = React.useMemo(() => {
    if (unknownRowCount) {
      return paginationModel.page;
    }
    return paginationModel.page <= lastPage ? paginationModel.page : lastPage;
  }, [lastPage, paginationModel.page, unknownRowCount]);
  const handlePageSizeChange = React.useCallback(pageSize => {
    apiRef.current.setPageSize(pageSize);
  }, [apiRef]);
  const handlePageChange = React.useCallback((_, page) => {
    apiRef.current.setPage(page);
  }, [apiRef]);
  const isPageSizeIncludedInPageSizeOptions = pageSize => {
    for (let i = 0; i < rootProps.pageSizeOptions.length; i += 1) {
      const option = rootProps.pageSizeOptions[i];
      if (typeof option === 'number') {
        if (option === pageSize) {
          return true;
        }
      } else if (option.value === pageSize) {
        return true;
      }
    }
    return false;
  };
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const warnedOnceMissingInPageSizeOptions = React.useRef(false);
    const pageSize = rootProps.paginationModel?.pageSize ?? paginationModel.pageSize;
    if (!warnedOnceMissingInPageSizeOptions.current && !rootProps.autoPageSize && !isPageSizeIncludedInPageSizeOptions(pageSize)) {
      console.warn([`MUI X: The page size \`${paginationModel.pageSize}\` is not present in the \`pageSizeOptions\`.`, `Add it to show the pagination select.`].join('\n'));
      warnedOnceMissingInPageSizeOptions.current = true;
    }
  }
  const pageSizeOptions = isPageSizeIncludedInPageSizeOptions(paginationModel.pageSize) ? rootProps.pageSizeOptions : [];
  return /*#__PURE__*/_jsx(GridPaginationRoot, _extends({
    as: rootProps.slots.basePagination,
    count: rowCount ?? -1,
    page: computedPage,
    rowsPerPageOptions: pageSizeOptions,
    rowsPerPage: paginationModel.pageSize,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handlePageSizeChange,
    disabled: disabled
  }, rootProps.slotProps?.basePagination));
}
process.env.NODE_ENV !== "production" ? GridPagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  component: PropTypes.elementType
} : void 0;
export { GridPagination };