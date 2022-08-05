import { render, screen } from "@testing-library/react";
import { Gantt } from "../gantt";

describe(`${Gantt.name}`, () => {
  it("Renders children props", () => {
    render(<Gantt>foo</Gantt>);
    screen.getByText("foo");
  });
});
