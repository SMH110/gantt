import { useReducer, useMemo } from "react";
import { initialGlobalContext } from "../contexts";
import { globalContextStateReducer } from "../reducers";
import { useSafeDispatch } from "./use-safe-dispatch";

export function useGlobalContextStateReducer() {
  const [state, d] = useReducer(
    globalContextStateReducer,
    initialGlobalContext
  );

  const dispatch: typeof d = useSafeDispatch(d);

  return useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [dispatch, state]);
}
