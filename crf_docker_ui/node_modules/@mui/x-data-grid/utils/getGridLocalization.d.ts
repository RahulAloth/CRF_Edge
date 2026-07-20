import type { GridLocaleText } from "../models/api/gridLocaleTextApi.js";
export interface Localization {
  components: {
    MuiDataGrid: {
      defaultProps: {
        localeText: Partial<GridLocaleText>;
      };
    };
  };
}
export declare const getGridLocalization: (gridTranslations: Partial<GridLocaleText>) => Localization;
export declare const formatNumber: (value: number | string, locale?: string) => string;
export declare const buildLocaleFormat: (locale: string) => (value: number | string) => string;