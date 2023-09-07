import { memo } from "react";
import { useGlobalContext } from "../hooks";

export type ChildrenFunction = (options: {
  width: number;
  height: number;
  startTime: number;
  endTime: number;
}) => JSX.Element;

type RectPropsWithChildren = Omit<React.SVGProps<SVGRectElement>, "children">;
export type ActivityProps = {
  start: number;
  end: number;
  height?: number;
  children?: ChildrenFunction;
} & RectPropsWithChildren;
export function Activity({
  start,
  end,
  height,
  children,
  ...props
}: ActivityProps) {
  const { state } = useGlobalContext();
  const startTime = state.scale(start);
  const endTime = state.scale(end);
  const width = endTime - startTime;
  const rectHeight = height || 30;

  const newChildren =
    typeof children === "function"
      ? children({ width, height: rectHeight, startTime, endTime })
      : null;

  return (
    <>
      <rect {...props} height={height || 30} x={startTime} width={width} />
      {newChildren}
    </>
  );
}

export default memo(Activity);
