import { XAxisZoomItem, XAxisZoomItemType } from "../../types";
import { DateTimeHelper } from "../date-time";

describe(`${DateTimeHelper.name}`, () => {
  const helper = new DateTimeHelper();
  const zoomLevelItems: XAxisZoomItem[] = [
    {
      size: 40,
      type: XAxisZoomItemType.year,
      selected: false,
    },
    {
      size: 60,
      type: XAxisZoomItemType.month,
      selected: false,
    },
    {
      size: 40,
      type: XAxisZoomItemType.week,
      selected: false,
    },
  ];

  describe("getZoomLevel", () => {
    it.each([
      {
        start: new Date(2022, 1, 1),
        end: new Date(2024, 1, 1),
        width: 120,
        expectedTotalWidth: 120,
        expectedZoomLevelDateType: XAxisZoomItemType.year,
      },
      {
        start: new Date(2022, 1, 1),
        end: new Date(2024, 1, 1),
        width: 121,
        expectedTotalWidth: 1500,
        expectedZoomLevelDateType: XAxisZoomItemType.month,
      },
    ])(
      "Calculates the zoom level between two dates",
      ({
        start,
        end,
        width,
        expectedTotalWidth,
        expectedZoomLevelDateType,
      }) => {
        // Arrange
        // Act
        const actualZoomLevel = helper.getZoomLevel(
          start.getTime(),
          end.getTime(),
          zoomLevelItems,
          width
        );

        // Assert
        expect(actualZoomLevel.zoomLevel.type).toEqual(
          expectedZoomLevelDateType
        );

        expect(actualZoomLevel.totalTicksWidth).toEqual(expectedTotalWidth);
      }
    );
  });
});
