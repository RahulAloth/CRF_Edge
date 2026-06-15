import type { RefObject } from '@mui/x-internals/types';
import type { Logger } from "../../models/logger.mjs";
import type { GridPrivateApiCommon } from "../../models/api/gridApiCommon.mjs";
export declare function useGridLogger<PrivateApi extends GridPrivateApiCommon>(privateApiRef: RefObject<PrivateApi>, name: string): Logger;