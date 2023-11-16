import {
  PropsWithChildren,
  Children,
  ReactElement,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { Activity, ActivityProps } from "./activity";
import { defaultActivityHeight } from "../constants";
import { useGlobalContext } from "../hooks";
import { GlobalContextActions } from "../types";
import { sum } from "d3";
import { GroupContext } from "./group";

export function Row(
  props: PropsWithChildren<{
    index?: number;
  }>
) {
  const { dispatch, state } = useGlobalContext();
  const { groupId, groupIndex } = useContext(GroupContext);

  const height = useMemo(() => {
    const activities: ReactElement<ActivityProps>[] = [];
    Children.forEach(props.children, (c) => {
      const child = c as ReactElement<ActivityProps> | any;

      if (child.type === Activity || child.type["type"] === Activity) {
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

  var node = state.plotData[groupId];
  var rows = node?.rows;

  useEffect(() => {
    rows &&
      dispatch({
        type: GlobalContextActions.updateRowHeight,
        payload: {
          height,
          groupId: groupId,
          index: props.index,
          groupIndex: groupIndex,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, rows]);

  var yPosition = useMemo(() => {
    if (node && rows) {
      var slicedRows = Object.keys(rows)
        .sort()
        .slice(0, props.index)
        .map((x) => rows[x as any]);
      var yPosition = sum(
        slicedRows.slice(0, props.index).map((x) => x.height)
      );

      return yPosition;
    }
    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, rows]);

  return <g transform={`translate(0, ${yPosition})`}>{props.children}</g>;
}
