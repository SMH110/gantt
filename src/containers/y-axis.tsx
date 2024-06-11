/* eslint-disable eqeqeq */
import { useEffect, useMemo } from "react";
import {} from "../helpers/nodes";
import { useGlobalContext } from "../hooks";
import { PlotData, Node, GlobalContextActions } from "../types";
import { sum } from "../helpers/sum";

export default function YAxis(props: {
  width: number;
  children: (
    items: { id: string; height: number }[],
    options: { getRectProps: (index: number) => { transform: string } }
  ) => any;
}) {
  var { state, dispatch } = useGlobalContext();
  var { plotData } = state;

  var items = useMemo(() => {
    return getOrderedYAxisItems(plotData);
  }, [plotData]);

  console.log("%c items of y axis", "color:pink", items);
  var children = props.children;

  function getRectProps(index: number) {
    return {
      transform: `translate(0, ${getYPosition(items, index)})`,
    };
  }

  useEffect(() => {
    dispatch({
      type: GlobalContextActions.setYAxisWidth,
      payload: props.width,
    });
  }, [props.width]);

  return (
    <svg height={sum(items.map((x) => x.height))} width={props.width}>
      {children(
        items.map((x) => ({
          height: x.height,
          id: x.id,
        })),
        { getRectProps }
      )}
    </svg>
  );
}

function getYPosition(items: Node[], index: number): number {
  var before = items.slice(0, index);
  return sum(before.map((x) => x.height));
}

function getOrderedYAxisItems(data: PlotData) {
  var parents = Object.values(data)
    .filter((x) => !x.parent)
    .sort((x) => x.index);

  var items: Node[] = [];

  while (parents.length) {
    let first = parents.shift() as Node;
    items.push(first);
    collectChildren(data, first, items);
  }

  return items;
}

function collectChildren(data: PlotData, node: Node, items: Node[] = []) {
  var children = Object.keys(node.children)
    .map((x) => data[x])
    .sort((a, b) => a.index - b.index);

  while (children.length) {
    let first = children.shift() as Node;
    items.push(first);
    if (Object.keys(first.children).length) {
      collectChildren(data, first);
    }
  }

  return items;
}
