import { PropsWithChildren, ReactNode, useEffect, useMemo } from "react";
import { useGlobalContext } from "../hooks";
import { container } from "tsyringe";
import { DateTimeHelper } from "../helpers";
import { GlobalContextActions, GlobalState, XAxisZoomItem } from "../types";
import { scaleTime } from "d3";

const dateTimeHelper = container.resolve(DateTimeHelper);

export function XAxis(props: any) {
  const { state, dispatch } = useGlobalContext();
  const selected = state.xAxisZoomItems.find(
    (x) => x.selected
  ) as XAxisZoomItem;
  const { start, end } = state;
  const ticks = useMemo(() => {
    /* 
      let's us first find how many ticks we need to render based on the selected zoom
      ticks can be based on days/years/months ..etc 
    
    */

    const ticks = dateTimeHelper.getTicks(start, end, selected.type);
    const plotWidth = ticks * selected.size;
    const scale = scaleTime()
      .domain([start, end])
      .range([0, ticks * selected.size]);
    const tickIntervals = scale.ticks(ticks);
    console.log(selected, ticks);

    dispatch({ type: GlobalContextActions.setPlotWidth, payload: plotWidth });
    dispatch({ type: GlobalContextActions.setScale, payload: scale });
    return tickIntervals;
  }, [selected, start, end, , dispatch]);

  return (
    <svg width={state.plotWidth}>
      {typeof props.children === "function" && props.children(ticks)}
    </svg>
  );
}

export function Tick(
  props: {
    start: Date;
    marginTop?: number;
  } & React.SVGProps<SVGTextElement>
) {
  const { state } = useGlobalContext();
  const selected = state.xAxisZoomItems.find(
    (x) => x.selected
  ) as XAxisZoomItem;
  const value = state.scale(props.start);
  const marginTop = props.marginTop || 20;
  const children: any = props.children;
  return (
    <text x={value} y={marginTop}>
      {typeof children === "function" && children(value)}
      {dateTimeHelper.formatDate(
        dateTimeHelper.getTimeFormatterSpecifier(selected.type),
        props.start
      )}
    </text>
  );
}
