import { createContext } from "react";
import { GlobalContextType } from "../types/";

export const initialGlobalContext: GlobalContextType = {
  dispatch: (() => {}) as any,
  state: {},
};
export const GlobalContext =
  createContext<GlobalContextType>(initialGlobalContext);
