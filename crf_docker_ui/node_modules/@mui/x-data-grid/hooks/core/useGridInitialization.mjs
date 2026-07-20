import { useGridRefs } from "./useGridRefs.mjs";
import { useGridIsRtl } from "./useGridIsRtl.mjs";
import { useGridLoggerFactory } from "./useGridLoggerFactory.mjs";
import { useGridLocaleText } from "./useGridLocaleText.mjs";
import { useGridPipeProcessing } from "./pipeProcessing/index.mjs";
import { useGridStrategyProcessing } from "./strategyProcessing/index.mjs";
import { useGridStateInitialization } from "./useGridStateInitialization.mjs";
import { useGridProps } from "./useGridProps.mjs";

/**
 * Initialize the technical pieces of the DataGrid (logger, state, ...) that any DataGrid implementation needs
 */
export const useGridInitialization = (privateApiRef, props) => {
  useGridRefs(privateApiRef);
  useGridProps(privateApiRef, props);
  useGridIsRtl(privateApiRef);
  useGridLoggerFactory(privateApiRef, props);
  useGridStateInitialization(privateApiRef);
  useGridPipeProcessing(privateApiRef);
  useGridStrategyProcessing(privateApiRef);
  useGridLocaleText(privateApiRef, props);
  privateApiRef.current.register('private', {
    rootProps: props
  });
};