import {
  PropsWithChildren,
  Children,
  ReactElement,
  useMemo,
  useEffect,
} from "react";
import { Activity, ActivityProps } from "./activity";
import { defaultActivityHeight } from "../constants";
import { useGlobalContext } from "../hooks";
import { GlobalContextActions } from "../types";
import { sum } from "d3";

export function Row(
  props: PropsWithChildren<{
    index?: number;
    groupId?: any;
    groupIndex?: number;
  }>
) {
  const { dispatch, state } = useGlobalContext();
  const height = useMemo(() => {
    const activities: ReactElement<ActivityProps>[] = [];
    Children.forEach(props.children, (c) => {
      const child = c as ReactElement<ActivityProps>;
      if (child.type === Activity) {
        activities.push(child);
      }
    });

    const activitiesWithHeight = activities
      .filter((x) => x.props.height != null)
      .map((x) => x.props.height) as number[];

    return activitiesWithHeight.length
      ? Math.max(...activitiesWithHeight)
      : defaultActivityHeight;
  }, [props.children]);

  useEffect(() => {
    dispatch({
      type: GlobalContextActions.updateRowHeight,
      payload: {
        height,
        groupId: props.groupId,
        index: props.index,
        groupIndex: props.groupIndex,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  const rows = state.plotData[props.groupId]?.rows || [];
  const yPosition = sum(rows.slice(0, props.index).map((x) => x.height));

  return <g transform={`translate(0, ${yPosition})`}>{props.children}</g>;
}
