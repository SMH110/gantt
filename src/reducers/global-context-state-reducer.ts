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
    case GlobalContextActions.setScale: {
      return {
        ...state,
        scale: action.payload,
      };
    }
    case GlobalContextActions.setPlotWidth: {
      return {
        ...state,
        plotWidth: action.payload,
      };
    }
  }
  return state;
}
