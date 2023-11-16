import {
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  createContext,
  useEffect,
} from "react";
import { FixedRows } from "./fixed-rows";
import { useGlobalContext } from "../hooks";
import { GlobalContextActions } from "../types";
import { useNodeHeight } from "../hooks/use-node-height";

export const GroupContext = createContext<{
  groupId: any;
  groupIndex: number;
}>({ groupId: "", groupIndex: 0 });

export default function Group(
  props: PropsWithChildren<{
    id: string;
    index?: number;
    previousNodeIds?: string[] | void;
  }>
) {
  const { dispatch, state } = useGlobalContext();

  const fixedRowsAndChildren = [];
  let fixedRows = 0;
  Children.forEach(props.children, (child) => {
    const item = child as ReactElement<PropsWithChildren<{ index: number }>>;
    if (item.type === FixedRows) {
      fixedRowsAndChildren.push(item);
      if (++fixedRows > 1)
        throw new Error("You can have multi " + FixedRows.name + " component");
    }
  });

  /* 
  
  
           I need a way to position fixed rows before collapsible 
  
  */
  var previousNodeIds: string[] = [];
  const newChildren = Children.map(props.children, (child, index) => {
    const item = child as ReactElement<
      PropsWithChildren<{
        index: number;
        id?: string;
        previousNodeIds?: string[];
      }>
    >;
    if (item.type === FixedRows) {
      let newChild = cloneElement(item, {
        ...item.props,
        previousNodeIds: previousNodeIds.slice(),
      });
      previousNodeIds.push("fixed-rows-" + props.id);
      return newChild;
    }

    if (item.type === Group) {
      const newChild = cloneElement(item, {
        ...item.props,
        previousNodeIds: previousNodeIds.slice(),
      });

      if (item.props.id != null) {
        previousNodeIds.push(item.props.id);
      }
      return newChild;
    }

    return child;
  });

  useEffect(() => {
    dispatch({
      type: GlobalContextActions.createNode,
      payload: { nodeId: props.id, nodeIndex: props.index },
    });
  }, [dispatch, props.id, props.index]);
  var yPosition = useNodeHeight(props.previousNodeIds);
  console.log({ yPosition, prpevious: props.previousNodeIds, id: props.id });

  if (!state.plotData[props.id]) return null;

  return (
    <g transform={`translate(0, ${yPosition})`}>
      <GroupContext.Provider
        value={{
          groupId: props.id,
          groupIndex: props.index as number,
        }}
      >
        {newChildren}
      </GroupContext.Provider>
    </g>
  );
}
