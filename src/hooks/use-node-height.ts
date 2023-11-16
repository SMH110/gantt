import { useMemo } from "react";
import { calculateHeight } from "../helpers/nodes";
import { useGlobalContext } from "./use-global-context";

export function useNodeHeight(previousNodeIds: string[] | void) {
  var { state } = useGlobalContext();

  return useMemo(() => {
    return previousNodeIds?.reduce((accumulator, nodeId) => {
      if (nodeId.startsWith("fixed-rows-")) {
        var rows = state.plotData[nodeId.split("-")[2]].rows;
        var height = 0;
        for (let key of Object.keys(rows)) {
          height += rows[key].height;
        }
        return accumulator + height;
      }
      var node = state.plotData[nodeId];
      if (node) {
        accumulator += calculateHeight(node, state.plotData);
      }
      return accumulator;
    }, 0);
  }, [previousNodeIds, state.plotData]);
}
