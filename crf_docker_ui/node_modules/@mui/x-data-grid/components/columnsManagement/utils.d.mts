import type { GridColumnVisibilityModel } from "../../hooks/features/columns/gridColumnsInterfaces.mjs";
import type { GridColumnsManagementProps } from "./GridColumnsManagement.mjs";
export declare const checkColumnVisibilityModelsSame: (a: GridColumnVisibilityModel, b: GridColumnVisibilityModel) => boolean;
export declare const defaultSearchPredicate: NonNullable<GridColumnsManagementProps['searchPredicate']>;