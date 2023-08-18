import { ReducerAction } from "./reducer-action.type";
import { XAxisZoomItem } from "./index";
import { ScaleTime } from "d3";

export type GlobalContextType = {
  dispatch<TPayload = any>(
    action: ReducerAction<GlobalContextActions, TPayload>
  ): void;
  state: GlobalState;
};

export type GlobalState = {
  /**
   * The start and the end horizon
   */
  start: number;
  end: number;

  xAxisZoomItems: XAxisZoomItem[];
  // Track the width and height of the root element
  rootElementSize: {
    width: number;
    height: number;
  };

  /**
   * The width of plot area (x-axis and activities)
   */
  plotWidth: number;
  /**
   * Flag used to check if we should start
   * watching the root element width and setting
   * the plot area size.
   * the idea here to only calculate the width of the
   *  plot area in one component
   *
   */
  plotSizeCalculatorRegistered: boolean;

  // D3 scale
  scale: ScaleTime<number, number>;
};
export enum GlobalContextActions {
  partialStateUpdate = "partial-state-update",
  setRootElementSize = "set-root-element-size",
  setScale = "set-scale",
  setPlotWidth = "set-plot-width",
}
