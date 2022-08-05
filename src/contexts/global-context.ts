import { createContext } from "react";
import {
  GlobalContextActions,
  GlobalContextType,
  ReducerAction,
} from "../types/";

export const initialGlobalContext: GlobalContextType = {
  dispatch: ((_action: ReducerAction<GlobalContextActions, any>) => {}) as any,
  state: {},
};
export const GlobalContext =
  createContext<GlobalContextType>(initialGlobalContext);
