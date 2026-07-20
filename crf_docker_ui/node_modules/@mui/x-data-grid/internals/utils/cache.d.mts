import type { GridGetRowsParams, GridGetRowsResponse } from "../../models/gridDataSource.mjs";
export declare class TestCache {
  private cache;
  constructor();
  set(key: GridGetRowsParams, value: GridGetRowsResponse): void;
  get(key: GridGetRowsParams): GridGetRowsResponse | undefined;
  size(): number;
  clear(): void;
}