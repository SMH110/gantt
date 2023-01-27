import { render, screen } from "@testing-library/react";
import { Gantt } from "../gantt";

describe(`${Gantt.name}`, () => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  it("Renders children props", () => {
    render(
      <Gantt
        start={new Date(2021, 0, 1).getTime()}
        end={new Date(2021, 2, 1).getTime()}
      >
        foo
      </Gantt>
    );
    screen.getByText("foo");
  });
});
