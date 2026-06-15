'use client';

import * as React from 'react';
import { useGridApiMethod } from "../../utils/useGridApiMethod.mjs";
import { useGridRegisterStrategyProcessor } from "../../core/strategyProcessing/useGridRegisterStrategyProcessor.mjs";
import { useGridEvent as addEventHandler } from "../../utils/useGridEvent.mjs";
import { useGridDataSourceBase } from "./useGridDataSourceBase.mjs";
/**
 * Community version of the data source hook. Contains implementation of the `useGridDataSourceBase` hook.
 */
export const useGridDataSource = (apiRef, props) => {
  const {
    api,
    strategyProcessor,
    events,
    setStrategyAvailability
  } = useGridDataSourceBase(apiRef, props);
  useGridApiMethod(apiRef, api.public, 'public');
  useGridRegisterStrategyProcessor(apiRef, strategyProcessor.strategyName, strategyProcessor.group, strategyProcessor.processor);
  Object.entries(events).forEach(([event, handler]) => {
    addEventHandler(apiRef, event, handler);
  });
  React.useEffect(() => {
    setStrategyAvailability();
  }, [setStrategyAvailability]);
};