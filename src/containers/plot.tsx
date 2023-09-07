import { useGlobalContext } from "../hooks";
import { Children, PropsWithChildren, ReactElement, cloneElement } from "react";
import Group from "./group";

export default function Plot({
  width,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  const { state } = useGlobalContext();

  let index = 0;
  const children = Children.map(props.children, (child) => {
    const item = child as ReactElement<PropsWithChildren<any>>;
    if (item.type === Group) {
      const newChild = cloneElement(item, { ...item.props, index: index++ });
      return newChild;
    }

    return child;
  });

  return (
    <svg width={state.plotWidth} {...props}>
      {children}
    </svg>
  );
}
