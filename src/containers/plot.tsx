import { useGlobalContext } from "../hooks";
import {
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useRef,
} from "react";
import Group from "./group";
import { sum } from "../helpers/sum";

export default function Plot({
  width,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  const { state } = useGlobalContext();

  var index = 0;
  var previousNodeIds: string[] = [];
  var ref = useRef(null);

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
    <div style={{ width: `calc(100% - ${state.yAxisWidth}px)` }}>
      <div
        style={{ width: "100%", overflowX: "auto" }}
        ref={ref}
        onScroll={() => {
          var container = ref.current as unknown as HTMLElement;
          if (container && state.xAxisHTMLRef) {
            state.xAxisHTMLRef.scrollLeft = container.scrollLeft;
          }
        }}
      >
        <svg width={state.plotWidth} {...props} height={height}>
          {children}
        </svg>
      </div>
    </div>
  );
}
