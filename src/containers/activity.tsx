import { useGlobalContext } from "../hooks";

export type ActivityProps = {
  start: number;
  end: number;
  height?: number;
} & React.SVGProps<SVGRectElement>;
export function Activity({ start, end, height, ...props }: ActivityProps) {
  const { state } = useGlobalContext();
  const startTime = state.scale(start);
  const width = state.scale(end) - startTime;

  return <rect {...props} height={height || 30} x={startTime} width={width} />;
}
