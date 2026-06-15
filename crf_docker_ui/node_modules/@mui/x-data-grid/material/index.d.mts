import type { GridIconSlotsComponent } from "../models/index.mjs";
import type { GridBaseSlots } from "../models/gridSlotsComponent.mjs";
import "./augmentation.mjs";
export { useMaterialCSSVariables } from "./variables.mjs";
declare const materialSlots: GridBaseSlots & GridIconSlotsComponent;
export default materialSlots;