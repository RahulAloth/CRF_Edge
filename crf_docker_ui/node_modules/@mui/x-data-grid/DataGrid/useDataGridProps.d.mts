import type { DataGridProcessedProps, DataGridProps } from "../models/props/DataGridProps.mjs";
import type { GridValidRowModel } from "../models/index.mjs";
export declare const useDataGridProps: <R extends GridValidRowModel>(inProps: DataGridProps<R>) => DataGridProcessedProps<R>;