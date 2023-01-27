import { XAxisZoomItem } from "../types";

export interface IDateTimeHelper {
  /**
   * Calculates the zoom level based on the `start` and `end` using the given `width` 
   * Returns the zoom level item that is greater or equal to given `width`
  /**
   *
   *
   * @param {number} start
   * @param {number} end
   * Sorted array i.e. year > months > weeks ...etc
   * @param {XAxisZoomItem[]} zoomLevelItems
   * @param {number} width
   * @return {*}  {{ zoomLevel: XAxisZoomItem; totalTicksWidth: number }}
   * @memberof IDateTimeHelper
   */
  getZoomLevel(
    start: number,
    end: number,
    /**  * Sorted array i.e. year > months > weeks ...etc*/
    zoomLevelItems: XAxisZoomItem[],
    width: number
  ): { zoomLevel: XAxisZoomItem; totalTicksWidth: number };
}
