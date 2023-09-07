import { PropsWithChildren, createContext } from "react";

export const GroupContext = createContext<{ groupId: any; groupIndex: number }>(
  { groupId: "", groupIndex: 0 }
);

export default function Group(
  props: PropsWithChildren<{ id: string; index?: number }>
) {
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
