import { timeFormat } from "d3";
import { XAxisZoomItem, XAxisZoomItemType } from "../types";
import { IDateTimeHelper } from "./date-time.interface";
import { DateTime } from "luxon";
import { injectable } from "tsyringe";

@injectable()
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

  getTicks(start: number, end: number, dateType: XAxisZoomItemType): number {
    const s = DateTime.fromMillis(start);
    const e = DateTime.fromMillis(end);
    const unit = this.mapDateTypeToUnit(dateType);
    const difference = e.diff(s, unit)[unit];
    return difference;
  }

  getTimeFormatterSpecifier(dateType: XAxisZoomItemType) {
    switch (dateType) {
      case XAxisZoomItemType.minute:
        return "%I %p";
      case XAxisZoomItemType.hour:
        return "%H";
      case XAxisZoomItemType.day:
        return "%d %b";
      case XAxisZoomItemType.week:
        return "%b %d";
      case XAxisZoomItemType.month:
        return "%B";
      case XAxisZoomItemType.year:
        return "%Y";

      default:
        return "%d %b";
    }
  }

  formatDate(specifier: string, date: Date) {
    return timeFormat(specifier)(date);
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
