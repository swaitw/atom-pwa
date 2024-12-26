import * as React from "react";
import { ElementContext } from "#src/contexts/ElementContext";

export function useElements() {
  return React.useContext(ElementContext);
}
