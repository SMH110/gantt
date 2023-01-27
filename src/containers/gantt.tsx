import { PropsWithChildren, useEffect, useRef } from "react";
import { GlobalContext } from "../contexts";
import { useGlobalContextStateReducer } from "../hooks";
import { GlobalContextActions } from "../types";

export function Gantt(props: PropsWithChildren) {
  const globalContextReducer = useGlobalContextStateReducer();
  const rootElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      globalContextReducer.dispatch({
        type: GlobalContextActions.setRootElementSize,
        payload: entries[0].contentRect,
      });
    });

    const element = rootElement.current!;
    resizeObserver.observe(element);
    return () => {
      resizeObserver.unobserve(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%" }} ref={rootElement}>
      <GlobalContext.Provider value={globalContextReducer}>
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
}
