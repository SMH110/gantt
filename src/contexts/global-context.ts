import { createContext } from "react";
import {
  GlobalContextActions,
  GlobalContextType,
  ReducerAction,
  XAxisZoomItemType,
} from "../types/";

export const initialGlobalContext: GlobalContextType = {
  dispatch: ((_action: ReducerAction<GlobalContextActions, any>) => {}) as any,
  state: {
    xAxisZoomItems: [
      {
        type: XAxisZoomItemType.year,
        size: 40,
        selected: false,
      },
    ],
  },
};
export const GlobalContext =
  createContext<GlobalContextType>(initialGlobalContext);
