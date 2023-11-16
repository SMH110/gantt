import { PlotData, Node } from "../types";

export function calculateHeight(node: Node, data: PlotData) {
  var height = 0;

  for (let key of Object.keys(node.rows)) {
    height += node.rows[key].height;
  }
  for (let child of Object.keys(node.children)) {
    height += calculateHeight(data[child], data);
  }

  return height;
}
