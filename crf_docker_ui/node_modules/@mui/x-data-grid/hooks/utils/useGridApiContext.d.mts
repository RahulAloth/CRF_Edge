import type { RefObject } from '@mui/x-internals/types';
import type { GridApiCommon } from "../../models/api/gridApiCommon.mjs";
import type { GridApiCommunity } from "../../models/api/gridApiCommunity.mjs";
export declare function useGridApiContext<Api extends GridApiCommon = GridApiCommunity>(): RefObject<Api>;