import { useGlobalContext } from "../hooks";

export default function Plot({
  width,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  const { state } = useGlobalContext();
  return <svg width={state.plotWidth} {...props}></svg>;
}
