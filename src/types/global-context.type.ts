import { ReducerAction } from "./reducer-action.type";

export type GlobalContextType = {
  dispatch(): React.Dispatch<ReducerAction<GlobalContextActions, any>>;
  state: {};
};

export enum GlobalContextActions {}
