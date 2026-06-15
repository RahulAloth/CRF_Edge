"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridLocalization = exports.formatNumber = exports.buildLocaleFormat = void 0;
const getGridLocalization = gridTranslations => ({
  components: {
    MuiDataGrid: {
      defaultProps: {
        localeText: gridTranslations
      }
    }
  }
});
exports.getGridLocalization = getGridLocalization;
const formatNumber = (value, locale) => {
  const numValue = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(numValue)) {
    return String(value);
  }
  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    try {
      return new Intl.NumberFormat(locale).format(numValue);
    } catch {
      return String(numValue);
    }
  }
  return String(numValue);
};

// Helper to create formatNumber with a specific locale
exports.formatNumber = formatNumber;
const buildLocaleFormat = locale => {
  return value => formatNumber(value, locale);
};
exports.buildLocaleFormat = buildLocaleFormat;