import type { AutocompleteProps } from "../../../models/gridBaseSlots.mjs";
import type { GridFilterInputValueProps } from "../../../models/gridFilterInputComponent.mjs";
import type { ValueOptions } from "../../../models/colDef/gridColDef.mjs";
export type GridFilterInputMultipleSingleSelectProps = GridFilterInputValueProps<Omit<AutocompleteProps<ValueOptions, true, false, true>, 'options'>> & {
  type?: 'singleSelect';
};
declare function GridFilterInputMultipleSingleSelect(props: GridFilterInputMultipleSingleSelectProps): import("react/jsx-runtime").JSX.Element | null;
declare namespace GridFilterInputMultipleSingleSelect {
  var propTypes: any;
}
export { GridFilterInputMultipleSingleSelect };