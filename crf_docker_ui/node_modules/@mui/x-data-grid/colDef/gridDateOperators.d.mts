import { type GridFilterInputDateProps } from "../components/panel/filterPanel/GridFilterInputDate.mjs";
import type { GridFilterOperator } from "../models/gridFilterOperator.mjs";
export declare const getGridDateOperators: (showTime?: boolean) => GridFilterOperator<any, Date, any, GridFilterInputDateProps>[];