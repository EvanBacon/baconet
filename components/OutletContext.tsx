// Basic React context for sending values down to children

import React from "react";

export const OutletContext = React.createContext<unknown>(null);

export function useOutletContext<Context = unknown>(): Context {
  return React.useContext(OutletContext) as Context;
}
