import { useGlobalContext } from "../hooks";
import { container } from "tsyringe";
import { DateTimeHelper } from "../helpers";
import { GlobalContextActions, XAxisZoomItem } from "../types";
import useTicks from "../hooks/use-ticks";
import { useLayoutEffect, useRef } from "react";

const dateTimeHelper = container.resolve(DateTimeHelper);

export type XAxisProps = {
  height?: number;
  children(ticks: Date[]): React.ReactNode;
};
export function XAxis(props: XAxisProps) {
  const { state, dispatch } = useGlobalContext();
  var ref = useRef(null);
  const height = props.height || 30;

  useLayoutEffect(() => {
    dispatch({
      type: GlobalContextActions.setXAxisHTMLRef,
      payload: ref.current,
    });
  }, [ref.current]);

  const ticks = useTicks();
  return (
    <div
      ref={ref}
      style={{
        width: `calc(100% - ${state.yAxisWidth}px)`,
        overflowX: "hidden",
        marginLeft: state.yAxisWidth,
      }}
    >
      <div>
        <svg width={state.plotWidth} height={height}>
          {typeof props.children === "function" && props.children(ticks)}
        </svg>
      </div>
    </div>
  );
}

export function Tick(
  props: {
    start: Date;
    marginTop?: number;
  } & React.SVGProps<SVGTextElement>
) {
  const { state } = useGlobalContext();
  const selected = state.xAxisZoomItems.find(
    (x) => x.selected
  ) as XAxisZoomItem;
  const value = state.scale(props.start);
  const marginTop = props.marginTop || 20;
  const children: any = props.children;
  return (
    <text x={value} y={marginTop}>
      {typeof children === "function" && children(value)}
      {dateTimeHelper.formatDate(
        dateTimeHelper.getTimeFormatterSpecifier(selected.type),
        props.start
      )}
    </text>
  );
}
