import { useGlobalContext } from "../hooks";
import { container } from "tsyringe";
import { DateTimeHelper } from "../helpers";
import { XAxisZoomItem } from "../types";
import useTicks from "../hooks/use-ticks";

const dateTimeHelper = container.resolve(DateTimeHelper);

export type XAxisProps = {
  height?: number;
  children(ticks: Date[]): React.ReactNode;
};
export function XAxis(props: XAxisProps) {
  const { state } = useGlobalContext();
  const height = props.height || 30;

  const ticks = useTicks();
  return (
    <svg width={state.plotWidth} height={height}>
      {typeof props.children === "function" && props.children(ticks)}
    </svg>
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
