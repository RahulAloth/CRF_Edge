import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
export const useGridLocaleText = (apiRef, props) => {
  const getLocaleText = React.useCallback(key => {
    if (props.localeText[key] == null) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: Missing translation for key ${key}.` : _formatErrorMessage(64, key));
    }
    return props.localeText[key];
  }, [props.localeText]);
  apiRef.current.register('public', {
    getLocaleText
  });
};