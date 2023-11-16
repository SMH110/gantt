import {
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useMemo,
} from "react";
import { Row } from "./row";
import { calculateHeight } from "../helpers/nodes";
import { useGlobalContext } from "../hooks";
import { useNodeHeight } from "../hooks/use-node-height";

export function FixedRows({
  children,
  previousNodeIds,
}: PropsWithChildren<{ previousNodeIds?: string[] }>) {
  let index = 0;
  const items = Children.map(children, (child) => {
    const item = child as ReactElement<PropsWithChildren<{ index: number }>>;
    if (item.type === Row) {
      const newChild = cloneElement(item, { ...item.props, index: index++ });
      return newChild;
    }

    return child;
  });

  var yPosition = useNodeHeight(previousNodeIds);

  return <g transform={`translate(0, ${yPosition})`}>{items}</g>;
}
