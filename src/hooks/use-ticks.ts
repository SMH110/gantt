import { useMemo } from "react";
import { useGlobalContext } from "./use-global-context";
import { container } from "tsyringe";
import { DateTimeHelper } from "../helpers";
import { XAxisZoomItem } from "../types";

const dateTimeHelper = container.resolve(DateTimeHelper);

export default function useTicks() {
  const { state } = useGlobalContext();
  const { start, end } = state;
  const selected = state.xAxisZoomItems.find(
    (x) => x.selected
  ) as XAxisZoomItem;

  const ticks = useMemo(() => {
    const ticks = dateTimeHelper.getTicks(start, end, selected.type);

    const tickIntervals = state.scale?.ticks(ticks) || [];

    return tickIntervals;
  }, [start, end, selected.type, state.scale]);

  return ticks;
}
