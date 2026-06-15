import type { AutocompleteProps } from "../../../models/gridBaseSlots.mjs";
import type { GridFilterInputValueProps } from "../../../models/gridFilterInputComponent.mjs";
export type GridFilterInputMultipleValueProps = GridFilterInputValueProps<Omit<AutocompleteProps<string, true, false, true>, 'options'>> & {
  type?: 'text' | 'number' | 'date' | 'datetime-local';
};
declare function GridFilterInputMultipleValue(props: GridFilterInputMultipleValueProps): import("react/jsx-runtime").JSX.Element;
declare namespace GridFilterInputMultipleValue {
  var propTypes: any;
}
export { GridFilterInputMultipleValue };