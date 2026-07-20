import type { TextFieldProps } from "../../../models/gridBaseSlots.mjs";
import type { GridFilterItem } from "../../../models/gridFilterItem.mjs";
import type { GridFilterInputValueProps } from "../../../models/gridFilterInputComponent.mjs";
export type GridTypeFilterInputValueProps = GridFilterInputValueProps<TextFieldProps> & {
  type?: 'text' | 'number' | 'date' | 'datetime-local';
};
export type ItemPlusTag = GridFilterItem & {
  fromInput?: string;
};
declare function GridFilterInputValue(props: GridTypeFilterInputValueProps): import("react/jsx-runtime").JSX.Element;
declare namespace GridFilterInputValue {
  var propTypes: any;
}
export { GridFilterInputValue };