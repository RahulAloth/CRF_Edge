import * as React from 'react';
import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommon } from "../../models/api/gridApiCommon.mjs";
import type { GridPrivateApiCommunity } from "../../models/api/gridApiCommunity.mjs";
export declare const GridPrivateApiContext: React.Context<unknown>;
export declare function useGridPrivateApiContext<PrivateApi extends GridPrivateApiCommon = GridPrivateApiCommunity>(): RefObject<PrivateApi>;