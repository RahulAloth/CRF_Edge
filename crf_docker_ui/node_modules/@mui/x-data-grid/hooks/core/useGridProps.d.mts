import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommon } from "../../models/api/gridApiCommon.mjs";
import type { GridStateProps } from "../../models/gridStateCommunity.mjs";
import type { GridStateInitializer } from "../utils/useGridInitializeState.mjs";
export declare const propsStateInitializer: GridStateInitializer<GridStateProps>;
export declare const useGridProps: <PrivateApi extends GridPrivateApiCommon>(apiRef: RefObject<PrivateApi>, props: GridStateProps) => void;