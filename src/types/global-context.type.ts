import { ReducerAction } from "./reducer-action.type";

export type GlobalContextType = {
  dispatch(action: ReducerAction<GlobalContextActions, any>): void;
  state: {};
};

export enum GlobalContextActions {}
