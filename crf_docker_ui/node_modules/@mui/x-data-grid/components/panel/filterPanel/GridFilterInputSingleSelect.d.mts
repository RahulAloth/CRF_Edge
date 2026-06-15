import type { TextFieldProps } from "../../../models/gridBaseSlots.mjs";
import type { GridFilterInputValueProps } from "../../../models/gridFilterInputComponent.mjs";
export type GridFilterInputSingleSelectProps = GridFilterInputValueProps<TextFieldProps> & {
  type?: 'singleSelect';
};
declare function GridFilterInputSingleSelect(props: GridFilterInputSingleSelectProps): import("react/jsx-runtime").JSX.Element | null;
declare namespace GridFilterInputSingleSelect {
  var propTypes: any;
}
export { GridFilterInputSingleSelect };