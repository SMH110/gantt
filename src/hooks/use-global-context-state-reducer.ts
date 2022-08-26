import { useReducer, useMemo } from "react";
import { initialGlobalContext } from "../contexts";
import { globalContextStateReducer } from "../reducers";
import { useSafeDispatch } from "./use-safe-dispatch";

export function useGlobalContextStateReducer(initialState = initialGlobalContext , reducer = globalContextStateReducer) {
  const [state, d] = useReducer(
    reducer,
    initialState
  );

  const dispatch: typeof d = useSafeDispatch(d);

  return useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [dispatch, state]);
}
