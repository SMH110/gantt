import { ReducerAction } from "./reducer-action.type";
import { XAxisZoomItem } from "./index";

export type GlobalContextType = {
  dispatch<TPayload = any>(
    action: ReducerAction<GlobalContextActions, TPayload>
  ): void;
  state: GlobalState;
};

export type GlobalState = {
  xAxisZoomItems: XAxisZoomItem[];
  // Track the width and height of the root element
  rootElementSize: {
    width: number;
    height: number;
  };
};
export enum GlobalContextActions {
  setRootElementSize = "set-root-element-size",
}
