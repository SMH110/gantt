import {
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  createContext,
  useContext,
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
  // Access the group context to determine if current node is a child of another node
  var groupContext = useContext(GroupContext);

  useEffect(() => {
    dispatch({
      type: GlobalContextActions.createNode,
      payload: {
        nodeId: props.id,
        nodeIndex: props.index,
        parentId: groupContext.groupId,
      },
    });
  }, [dispatch, props.id, props.index, groupContext.groupId]);
  var yPosition = useNodeHeight(props.previousNodeIds);

  // update state to add this node as child to another node
  useEffect(() => {
    var groupId: string = groupContext.groupId;
    if (!groupId) return;

    var parent = state.plotData[groupId];
    if (parent.children[props.id]) return;

    // if we have group id in the group context that means we are a child so we need
    // to add ourself to the parent
    var children = { ...parent.children };
    children[props.id] = props.id;

    dispatch({
      type: GlobalContextActions.setNodeChildren,
      payload: { children, groupId: groupId },
    });
  }, [dispatch, props.id, groupContext.groupId, state.plotData]);

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
