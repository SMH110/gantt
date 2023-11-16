import { useGlobalContext } from "../hooks";
import { Children, PropsWithChildren, ReactElement, cloneElement } from "react";
import Group from "./group";
import { sum } from "../helpers/sum";

export default function Plot({
  width,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  const { state } = useGlobalContext();

  var index = 0;
  var previousNodeIds: string[] = [];

  var children = Children.map(props.children, (child) => {
    var item = child as ReactElement<PropsWithChildren<any>>;
    if (item.type === Group) {
      const newChild = cloneElement(item, {
        ...item.props,
        index: index++,
        previousNodeIds: previousNodeIds.slice(),
      });
      if (item.props.id != null) {
        previousNodeIds.push(item.props.id);
      }
      return newChild;
    }

    return child;
  });

  var height = sum(
    Object.values(state.plotData)
      .map((node) => Object.values(node.rows).map((x) => x.height))
      .flat()
  );
  return (
    <svg width={state.plotWidth} {...props} height={height}>
      {children}
    </svg>
  );
}
