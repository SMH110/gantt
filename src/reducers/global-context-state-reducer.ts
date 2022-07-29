import {
  GlobalContextActions,
  GlobalContextType,
  ReducerAction,
} from "../types";

export function globalContextStateReducer(
  state: GlobalContextType,
  action: ReducerAction<GlobalContextActions>
): GlobalContextType {
  return state;
}
