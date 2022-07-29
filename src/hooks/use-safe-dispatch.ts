import { useCallback, useEffect, useRef } from "react";

export function useSafeDispatch(dispatch: any) {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args: any[]) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}
