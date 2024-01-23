import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../contexts";
import { useGlobalContextStateReducer } from "../hooks";
import { GlobalContextActions, GlobalState } from "../types";
import { GanttProps } from "../types/gantt.type";
import useSetScale from "../hooks/use-set-scale";

export function Gantt(props: PropsWithChildren<GanttProps>) {
  const globalContextReducer = useGlobalContextStateReducer();
  const rootElement = useRef<HTMLDivElement>(null);
  const [renderChildren, setRenderChildren] = useState(false);
  console.log("data", globalContextReducer.state.plotData);
  useEffect(() => {
    const payload: Partial<GlobalState> = {
      start: props.start,
      end: props.end,
    };

    globalContextReducer.dispatch({
      type: GlobalContextActions.partialStateUpdate,
      payload,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.start, props.end]);

  useSetScale(props.start, props.end, globalContextReducer.dispatch);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      globalContextReducer.dispatch({
        type: GlobalContextActions.setRootElementSize,
        payload: entries[0].contentRect,
      });
    });

    const element = rootElement.current!;
    if (element) {
      resizeObserver.observe(element);
      setRenderChildren(true);
    } else {
      throw new Error("Couldn't find root element");
    }

    return () => {
      resizeObserver.unobserve(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%" }} ref={rootElement}>
      {renderChildren ? (
        <GlobalContext.Provider value={globalContextReducer}>
          {props.children}
        </GlobalContext.Provider>
      ) : null}
    </div>
  );
}
