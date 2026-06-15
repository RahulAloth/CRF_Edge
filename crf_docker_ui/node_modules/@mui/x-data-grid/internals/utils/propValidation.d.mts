import type { DataGridProcessedProps } from "../../models/props/DataGridProps.mjs";
export type PropValidator<TProps> = (props: TProps) => string | undefined;
export declare const propValidatorsDataGrid: PropValidator<DataGridProcessedProps>[];
export declare function validateProps<TProps>(props: TProps, validators: PropValidator<TProps>[]): void;