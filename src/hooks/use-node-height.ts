import { useMemo } from "react";
import { calculateHeight } from "../helpers/nodes";
import { useGlobalContext } from "./use-global-context";

export function useNodeHeight(previousNodeIds: string[] | void) {
  var { state } = useGlobalContext();

  return useMemo(() => {
    return previousNodeIds?.reduce((accumulator, nodeId) => {
      var node = state.plotData[nodeId];
      if (node) {
        accumulator += calculateHeight(node, state.plotData);
      }
      return accumulator;
    }, 0);
  }, [previousNodeIds, state.plotData]);
}
