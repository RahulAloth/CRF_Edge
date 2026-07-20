import type { GridConfiguration } from "../../models/configuration/gridConfiguration.mjs";
import type { GridPrivateApiCommon } from "../../models/api/gridApiCommon.mjs";
import type { GridPrivateApiCommunity } from "../../models/api/gridApiCommunity.mjs";
export declare const useGridConfiguration: <Api extends GridPrivateApiCommon = GridPrivateApiCommunity>() => GridConfiguration<Api>;