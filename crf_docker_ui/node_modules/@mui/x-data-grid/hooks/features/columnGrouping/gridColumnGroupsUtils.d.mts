import { type GridColumnGroupingModel, type GridColumnNode, type GridColumnGroup } from "../../../models/gridColumnGrouping.mjs";
import type { GridColDef } from "../../../models/colDef/index.mjs";
import type { GridColumnGroupLookup, GridGroupingStructure } from "./gridColumnGroupsInterfaces.mjs";
type UnwrappedGroupingModel = {
  [key: GridColDef['field']]: GridColumnGroup['groupId'][];
};
export declare const createGroupLookup: (columnGroupingModel: GridColumnNode[]) => GridColumnGroupLookup;
/**
 * This is a function that provide for each column the array of its parents.
 * Parents are ordered from the root to the leaf.
 * @param columnGroupingModel The model such as provided in DataGrid props
 * @returns An object `{[field]: groupIds}` where `groupIds` is the parents of the column `field`
 */
export declare const unwrapGroupingColumnModel: (columnGroupingModel?: GridColumnGroupingModel) => UnwrappedGroupingModel;
export declare const getColumnGroupsHeaderStructure: (orderedColumns: string[], unwrappedGroupingModel: UnwrappedGroupingModel, pinnedFields: {
  right?: string[];
  left?: string[];
}) => GridGroupingStructure[][];
export {};