import { useMemo } from "react";
import { useGlobalContext } from "./use-global-context";
import { container } from "tsyringe";
import { DateTimeHelper } from "../helpers";
import { GlobalContextActions, XAxisZoomItem } from "../types";
import { scaleTime } from "d3";

const dateTimeHelper = container.resolve(DateTimeHelper);

export default function useTicks() {
  const { state, dispatch } = useGlobalContext();
  const { start, end } = state;

  const selected = state.xAxisZoomItems.find(
    (x) => x.selected
  ) as XAxisZoomItem;

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

    dispatch({ type: GlobalContextActions.setPlotWidth, payload: plotWidth });
    dispatch({ type: GlobalContextActions.setScale, payload: scale });
    return tickIntervals;
  }, [selected, start, end, dispatch]);

  return ticks;
}
