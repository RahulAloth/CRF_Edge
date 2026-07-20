import type { GetApplyQuickFilterFn } from "../models/colDef/gridColDef.mjs";
import type { GridFilterOperator } from "../models/gridFilterOperator.mjs";
export declare const getGridStringQuickFilterFn: GetApplyQuickFilterFn<any, unknown>;
export declare const getGridStringOperators: (disableTrim?: boolean) => GridFilterOperator<any, number | string | null, any>[];