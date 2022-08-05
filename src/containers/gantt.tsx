import { PropsWithChildren } from "react";
import { GlobalContext } from "../contexts";
import { useGlobalContextStateReducer } from "../hooks";

export function Gantt(props: PropsWithChildren) {
  const globalContextReducer = useGlobalContextStateReducer();
  return (
    <div style={{ width: "100%" }}>
      <GlobalContext.Provider value={globalContextReducer}>
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
}
