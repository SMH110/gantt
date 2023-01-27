import { XAxisZoomItem, XAxisZoomItemType } from "../types";
import { IDateTimeHelper } from "./date-time.interface";
import { DateTime } from "luxon";

export class DateTimeHelper implements IDateTimeHelper {
  getZoomLevel(
    start: number,
    end: number,
    zoomLevelItems: XAxisZoomItem[],
    width: number
  ): { zoomLevel: XAxisZoomItem; totalTicksWidth: number } {
    const s = DateTime.fromMillis(start);
    const e = DateTime.fromMillis(end);
    zoomLevelItems = zoomLevelItems.slice();

    let totalSize = Number.MIN_SAFE_INTEGER;
    let current: XAxisZoomItem;

    do {
      current = zoomLevelItems.shift() as XAxisZoomItem;

      const unit = this.mapDateTypeToUnit(current.type);
      const difference = Math.floor(e.diff(s, unit).toObject()[unit] as number);
      totalSize = (difference + 1) * current.size;
    } while (totalSize < width);
    return {
      zoomLevel: current,
      totalTicksWidth: totalSize,
    };
  }

  private mapDateTypeToUnit(dateType: XAxisZoomItemType) {
    switch (dateType) {
      case XAxisZoomItemType.year:
        return "years";
      case XAxisZoomItemType.month:
        return "months";
      case XAxisZoomItemType.week:
        return "weeks";
      case XAxisZoomItemType.day:
        return "days";
      case XAxisZoomItemType.hour:
        return "hours";
      case XAxisZoomItemType.minute:
        return "minutes";
      case XAxisZoomItemType.second:
        return "seconds";

      default:
        throw new Error("Date is not supported");
    }
  }
}
