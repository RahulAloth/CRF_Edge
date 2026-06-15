import type { GridFilterOperator } from "../models/gridFilterOperator.mjs";
import type { GridFilterInputValueProps } from "../models/gridFilterInputComponent.mjs";
import type { GetApplyQuickFilterFn } from "../models/colDef/gridColDef.mjs";
export declare const getGridNumericQuickFilterFn: GetApplyQuickFilterFn<any, number | string | null>;
export declare const getGridNumericOperators: () => GridFilterOperator<any, number | string | null, any, GridFilterInputValueProps & {
  type?: "number";
}>[];