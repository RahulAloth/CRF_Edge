import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../models/api/gridApiCommunity.mjs";
export declare function getPublicApiRef<PrivateApi extends GridPrivateApiCommunity>(apiRef: RefObject<PrivateApi>): RefObject<ReturnType<PrivateApi["getPublicApi"]>>;