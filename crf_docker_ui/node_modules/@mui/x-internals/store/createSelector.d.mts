import { OverrideMemoizeOptions, UnknownMemoizer } from 'reselect';
import type { CreateSelectorFunction } from "./createSelectorType.mjs";
export type { CreateSelectorFunction } from "./createSelectorType.mjs";
/**
 * Creates a selector function that can be used to derive values from the store's state.
 *
 * The combiner function can have up to three additional parameters, but it **cannot have optional or default parameters**.
 *
 * This function accepts up to six functions and combines them into a single selector function.
 * The resulting selector will take the state from the combined selectors and any additional parameters required by the combiner.
 *
 * The return type of the resulting selector is determined by the return type of the combiner function.
 *
 * @example
 * const selector = createSelector(
 *  (state) => state.disabled
 * );
 *
 * @example
 * const selector = createSelector(
 *   (state) => state.disabled,
 *   (state) => state.open,
 *   (disabled, open) => ({ disabled, open })
 * );
 */
export declare const createSelector: CreateSelectorFunction;
export declare const createSelectorMemoizedWithOptions: (options?: OverrideMemoizeOptions<UnknownMemoizer>) => CreateSelectorFunction;
/**
 * Creates a memoized selector function that can be used to derive values from the store's state.
 * This is useful for selectors that produce non-primitive values, such as objects or arrays, where memoization can help prevent unnecessary re-renders in React components.
 *
 * The memoization is implemented in a way that only the most recent selector result is cached.
 * This is suitable for cases where the selector is called with the same state and arguments repeatedly,
 * but may not be ideal for selectors that are called with a wide variety of states and arguments.
 *
 * The combiner function can have up to three additional parameters, but it **cannot have optional or default parameters**.
 *
 * This function accepts up to six functions and combines them into a single selector function.
 * The resulting selector will take the state from the combined selectors and any additional parameters required by the combiner.
 *
 * The return type of the resulting selector is determined by the return type of the combiner function.
 *
 * @example
 * const selector = createSelectorMemoized(
 *  (state) => state.disabled
 * );
 *
 * @example
 * const selector = createSelectorMemoized(
 *   (state) => state.disabled,
 *   (state) => state.open,
 *   (disabled, open) => ({ disabled, open })
 * );
 */
export declare const createSelectorMemoized: CreateSelectorFunction;