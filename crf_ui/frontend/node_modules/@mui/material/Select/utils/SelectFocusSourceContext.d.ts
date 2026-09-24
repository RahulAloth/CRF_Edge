import * as React from 'react';
declare function useSelectFocusSource(): "keyboard" | "mouse" | "touch" | null;
declare const SelectFocusSourceProvider: React.Provider<"keyboard" | "mouse" | "touch" | null>;
export { useSelectFocusSource, SelectFocusSourceProvider };