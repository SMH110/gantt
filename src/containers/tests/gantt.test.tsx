import { render, screen } from "@testing-library/react";
import { Gantt } from "../gantt";

describe(`${Gantt.name}`, () => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  it("Renders children props", () => {
    render(<Gantt>foo</Gantt>);
    screen.getByText("foo");
  });
});
