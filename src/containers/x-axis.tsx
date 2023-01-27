import { useEffect } from "react";
import { useGlobalContext } from "../hooks";
import { container } from "tsyringe";
import { DateTimeHelper } from "../helpers";
import { GlobalContextActions, GlobalState } from "../types";

const dateTimeHelper = container.resolve(DateTimeHelper);

export function XAxis() {
  const { state, dispatch } = useGlobalContext();
  useEffect(() => {
    if (!state.plotSizeCalculatorRegistered && state.rootElementSize.width) {
      const { totalTicksWidth, zoomLevel } = dateTimeHelper.getZoomLevel(
        state.start,
        state.end,
        state.xAxisZoomItems,
        state.rootElementSize.width
      );

      const payload: Partial<GlobalState> = {
        plotWidth: totalTicksWidth,
        xAxisZoomItems: [
          ...state.xAxisZoomItems,
          { ...zoomLevel, selected: true },
        ],
      };

      dispatch({ type: GlobalContextActions.partialStateUpdate, payload });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, state.plotSizeCalculatorRegistered, state.rootElementSize.width]);

  return <div></div>;
}
