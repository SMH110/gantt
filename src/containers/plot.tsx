import { useGlobalContext } from "../hooks";

export default function Plot() {
  const { state } = useGlobalContext();

  return <svg width={state.plotWidth}></svg>;
}
