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

  /* Plot Data used to create the activities + children */
  plotData: PlotData;

  yAxisWidth: number;
  xAxisHTMLRef: HTMLElement | null;
};

export type PlotData = Record<string, Node>;

export type Node = {
  height: number;
  index: number;
  children: Record<string, string>;
  parent: null | string | number;
  rows: Record<string, Row>;
  id: any;
};
export type Row = {
  height: number;
};

export enum GlobalContextActions {
  partialStateUpdate = "partial-state-update",
  setRootElementSize = "set-root-element-size",
  setScale = "set-scale",
  setPlotWidth = "set-plot-width",
  updateRowHeight = "update-plot-group-height",
  setNodeChildren = "set-node-child",
  createNode = "create-node",
  setYAxisWidth = "set-y-axis-width",
  setXAxisHTMLRef = "set-x-axis-html-ref",
}

/* 

A                       |   ----- ------
                        | --------------------------------------   ---
  - Child               | ---- --- --------------------
          - Grand Child |   -------------------------   --- ----- 



          
data = {
    A : {

    }
}
*/

const data: any = {
  A: {
    index: 0,
    height: 300,
    rows: [{ height: 100 }, { height: 100 }],
    children: {
      height: 100,
      items: {
        Child: {
          index: 0,
          height: 100,
          rows: [
            {
              height: 100,
            },
          ],
        },
      },
    },
  },
};

const data2 = {
  A: {
    index: 0,
    parent: null,
    height: 200,
    rows: [{ height: 100 }, { height: 100 }],
    children: ["child1"],
  },
  child1: {
    index: 0,
    parent: "A",
    height: 300,
    rows: [{ height: 150 }, { height: 150 }],
    children: [],
  },
};
