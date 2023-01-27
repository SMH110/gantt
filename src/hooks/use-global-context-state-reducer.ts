import { useReducer, useMemo } from "react";
import { defaultState } from "../contexts";
import { globalContextStateReducer } from "../reducers";
import { useSafeDispatch } from "./use-safe-dispatch";

export function useGlobalContextStateReducer(
  initialState = defaultState,
  reducer = globalContextStateReducer
) {
  const [state, d] = useReducer(reducer, initialState);

  const dispatch: typeof d = useSafeDispatch(d);

  return useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [dispatch, state]);
}
