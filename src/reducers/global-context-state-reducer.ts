import { sum } from "d3";
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
    case GlobalContextActions.updateRowHeight: {
      const { height, groupId, index, groupIndex } = action.payload;

      const group = state.plotData[groupId] || { index: groupIndex };
      const rows = group.rows?.slice() || [];
      const row = rows[index] || {};
      rows[index] = { ...row, height };

      const groupHeight = sum(rows.map((x) => x.height));

      return {
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
    }
  }
}
