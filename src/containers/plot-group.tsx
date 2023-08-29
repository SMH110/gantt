import { useEffect, useRef } from "react";

export default function PlotGroup() {
  const id = useRef();
  useEffect(() => {}, []);

  return <g id={id.current}></g>;
}
