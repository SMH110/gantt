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
    case GlobalContextActions.partialStateUpdate: {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
  return state;
}
