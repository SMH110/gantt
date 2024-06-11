import { sum } from "d3";
import {
  GlobalContextActions,
  GlobalState,
  ReducerAction,
  Node,
} from "../types";

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
    case GlobalContextActions.updateRowHeight: {
      const { height, groupId, index } = action.payload;

      const group = state.plotData[groupId];
      const rows = group.rows;
      const row = rows[index] || {};
      rows[index] = { ...row, height };

      const groupHeight = sum(Object.values(rows).map((x) => x.height));
      let x = {
        ...state,
        plotData: {
          ...state.plotData,
          [groupId]: {
            ...group,
            height: groupHeight,
            rows,
          },
        },
      };
      return x;
    }

    case GlobalContextActions.setNodeChildren: {
      const { groupId, children } = action.payload;

      const group = state.plotData[groupId];

      let x = {
        ...state,
        plotData: {
          ...state.plotData,
          [groupId]: {
            ...group,
            children,
          },
        },
      };
      return x;
    }

    case GlobalContextActions.createNode: {
      const { nodeId, nodeIndex, parentId } = action.payload;
      const node: Node = {
        children: {},
        height: 0,
        index: nodeIndex,
        parent: parentId,
        rows: {},
        id: nodeId,
      };

      let newState = {
        ...state,
        plotData: {
          ...state.plotData,
          [nodeId]: node,
        },
      };
      return newState;
    }
    case GlobalContextActions.setYAxisWidth: {
      return {
        ...state,
        yAxisWidth: action.payload,
      };
    }

    case GlobalContextActions.setXAxisHTMLRef: {
      return {
        ...state,
        xAxisHTMLRef: action.payload,
      };
    }
  }
}
