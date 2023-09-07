import { Children, PropsWithChildren, ReactElement, cloneElement } from "react";
import { Row } from "./row";

export function FixedRows({ children }: PropsWithChildren<{}>) {
  let index = 0;
  const items = Children.map(children, (child) => {
    const item = child as ReactElement<PropsWithChildren<{ index: number }>>;
    if (item.type === Row) {
      const newChild = cloneElement(item, { ...item.props, index: index++ });
      return newChild;
    }

    return child;
  });

  return <g>{items}</g>;
}
