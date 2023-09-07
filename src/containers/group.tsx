import { Children, PropsWithChildren, ReactElement, cloneElement } from "react";
import { Row } from "./row";

export default function Group(
  props: PropsWithChildren<{ id: string; index?: number }>
) {
  let index = 0;
  const children = Children.map(props.children, (c) => {
    const child = c as ReactElement<any>;

    if (child.type === Row) {
      const newRow = cloneElement(child, {
        index: index++,
        groupId: props.id,
        groupIndex: props.index,
      });
      return newRow;
    }
    return child;
  });

  return <g>{children}</g>;
}
