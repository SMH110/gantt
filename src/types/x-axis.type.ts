export type XAxisZoomItem = {
    size : number;
    type : XAxisZoomItemType,
    selected: boolean;
}


export enum XAxisZoomItemType  {
    year = "YEAR",
    month = "MONTH",
    week = "WEEK",
    day = "DAY",
    hour = "HOUR",
    minute = "MINUTE",
    second = "SECOND"
}