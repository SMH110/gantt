import { useEffect } from "react";
import { useGlobalContext } from "./use-global-context";
import { GlobalContextActions, ReducerAction, XAxisZoomItem } from "../types";
import { scaleTime } from "d3";
import { container } from "tsyringe";
import { DateTimeHelper } from "../helpers";

const dateTimeHelper = container.resolve(DateTimeHelper);

export default function useSetScale(
  start: number,
  end: number,
  dispatch: (value: ReducerAction<GlobalContextActions>) => void
) {
  const { state } = useGlobalContext();
  const selected = state.xAxisZoomItems.find(
    (x) => x.selected
  ) as XAxisZoomItem;

  useEffect(() => {
    if (!start || !end) return;

    if (typeof state.scale === "function") return;

    const ticks = dateTimeHelper.getTicks(start, end, selected.type);
    const plotWidth = ticks * selected.size;
    const scale = scaleTime().domain([start, end]).range([0, plotWidth]);

    dispatch({ type: GlobalContextActions.setPlotWidth, payload: plotWidth });
    dispatch({ type: GlobalContextActions.setScale, payload: scale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end, state.scale]);
}
