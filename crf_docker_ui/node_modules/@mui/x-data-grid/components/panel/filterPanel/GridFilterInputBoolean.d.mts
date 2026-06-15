import type { TextFieldProps } from "../../../models/gridBaseSlots.mjs";
import type { GridFilterInputValueProps } from "../../../models/gridFilterInputComponent.mjs";
export type GridFilterInputBooleanProps = GridFilterInputValueProps<TextFieldProps>;
declare function GridFilterInputBoolean(props: GridFilterInputBooleanProps): import("react/jsx-runtime").JSX.Element;
declare namespace GridFilterInputBoolean {
  var propTypes: any;
}
export declare function sanitizeFilterItemValue(value: any): boolean | undefined;
export { GridFilterInputBoolean };