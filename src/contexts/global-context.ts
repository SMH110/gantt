import { GlobalState } from "./../types/global-context.type";
import { createContext } from "react";
import { GlobalContextType, XAxisZoomItemType } from "../types/";

export const defaultState: GlobalState = {
  start: 0,
  end: 0,

  plotSizeCalculatorRegistered: false,
  rootElementSize: {
    width: 0,
    height: 0,
  },
  plotWidth: 0,
  xAxisZoomItems: [
    {
      type: XAxisZoomItemType.year,
      size: 40,
      selected: false,
    },
    {
      type: XAxisZoomItemType.month,
      size: 60,
      selected: false,
    },
    {
      type: XAxisZoomItemType.week,
      size: 40,
      selected: false,
    },
    {
      type: XAxisZoomItemType.day,
      size: 60,
      selected: true,
    },
    {
      type: XAxisZoomItemType.hour,
      size: 40,
      selected: false,
    },
    {
      type: XAxisZoomItemType.minute,
      size: 40,
      selected: false,
    },
    {
      type: XAxisZoomItemType.second,
      size: 40,
      selected: false,
    },
  ],
  scale: null as any,
};
export const GlobalContext = createContext<GlobalContextType>({
  state: defaultState,
  dispatch: () => {},
});
