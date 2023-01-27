import { GlobalContextActions, GlobalState, ReducerAction } from "../types";

export function globalContextStateReducer(
  state: GlobalState,
  action: ReducerAction<GlobalContextActions>
): GlobalState {
  switch (action.type) {
    case GlobalContextActions.setRootElementSize: {
      return {
        ...state,
        rootElementSize: action.payload,
      };
    }
  }
  return state;
}
