import { useContext } from "react";
import { GlobalContext } from "../contexts/";

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("Missing global context");
  return context;
}
