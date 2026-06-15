import { gridFilterModelSelector } from "../filter/gridFilterSelector.mjs";
import { gridSortModelSelector } from "../sorting/gridSortingSelector.mjs";
import { gridPaginationModelSelector } from "../pagination/gridPaginationSelector.mjs";
import { createSelector } from "../../../utils/createSelector.mjs";
export const gridGetRowsParamsSelector = createSelector(gridFilterModelSelector, gridSortModelSelector, gridPaginationModelSelector, (filterModel, sortModel, paginationModel) => ({
  groupKeys: [],
  paginationModel,
  sortModel,
  filterModel,
  start: paginationModel.page * paginationModel.pageSize,
  end: paginationModel.page * paginationModel.pageSize + paginationModel.pageSize - 1
}));