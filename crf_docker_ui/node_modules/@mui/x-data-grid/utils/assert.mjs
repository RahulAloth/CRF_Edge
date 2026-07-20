import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
export function NotRendered(_props) {
  throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X: Failed assertion: should not be rendered' : _formatErrorMessage(57));
}