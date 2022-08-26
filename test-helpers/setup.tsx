import { GlobalContext } from "../src/contexts";
import { useGlobalContextStateReducer } from "../src/hooks";
import React, { FunctionComponent } from "react";

export function setup(Component: FunctionComponent, reducer, initialState, props) {
  const globalContextReducer = useGlobalContextStateReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={globalContextReducer}>
      <Component {...props} />
    </GlobalContext.Provider>
  );
}
