import type { RefObject } from '@mui/x-internals/types';
import type { EventListenerOptions } from '@mui/x-internals/EventManager';
import type { GridEventListener, GridEvents } from "../../models/events/index.mjs";
import { TimerBasedCleanupTracking } from "../../utils/cleanupTracking/TimerBasedCleanupTracking.mjs";
import { FinalizationRegistryBasedCleanupTracking } from "../../utils/cleanupTracking/FinalizationRegistryBasedCleanupTracking.mjs";
import type { GridApiCommon } from "../../models/index.mjs";
export declare function useGridEvent<Api extends GridApiCommon, E extends GridEvents>(apiRef: RefObject<Api>, eventName: E, handler?: GridEventListener<E>, options?: EventListenerOptions): void;
export declare function useGridEventPriority<Api extends GridApiCommon, E extends GridEvents>(apiRef: RefObject<Api>, eventName: E, handler?: GridEventListener<E>): void;
export declare function unstable_resetCleanupTracking(): void;
export declare const internal_registryContainer: {
  current: TimerBasedCleanupTracking | FinalizationRegistryBasedCleanupTracking;
};