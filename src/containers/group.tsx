import {
  Children,
  PropsWithChildren,
  ReactElement,
  createContext,
} from "react";
import { FixedRows } from "./fixed-rows";

export const GroupContext = createContext<{ groupId: any; groupIndex: number }>(
  { groupId: "", groupIndex: 0 }
);

export default function Group(
  props: PropsWithChildren<{ id: string; index?: number }>
) {
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

  return (
    <g>
      <GroupContext.Provider
        value={{ groupId: props.id, groupIndex: props.index as number }}
      >
        {props.children}
      </GroupContext.Provider>
    </g>
  );
}
