import { ReducerAction } from "./reducer-action.type";
import { XAxisZoomItem } from "./index";

export type GlobalContextType = {
  dispatch(action: ReducerAction<GlobalContextActions, any>): void;
  state: {
    xAxisZoomItems: XAxisZoomItem[];
  };
};

export enum GlobalContextActions {}
