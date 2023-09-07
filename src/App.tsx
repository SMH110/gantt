import { Gantt, Tick, XAxis } from "./containers";
import { Row } from "./containers/row";
import Plot from "./containers/plot";
import Group from "./containers/group";
import { FixedRows } from "./containers/fixed-rows";
import Activity from "./containers/activity";
import { useLayoutEffect, useRef } from "react";

function Text({ width, startTime, height, children }: any) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const current = ref.current as unknown as SVGTextElement;
    if (current) {
      const elementWidth = current.getBoundingClientRect().width;
      if (elementWidth > width) {
        current.style.display = "none";
      }
    }
  }, [width]);

  return (
    <text
      ref={ref}
      x={width / 2 + startTime}
      y={height / 2}
      alignmentBaseline="middle"
      textAnchor="middle"
      fontSize={12}
      fontFamily="Arial"
    >
      {children}
    </text>
  );
}

function App() {
  return (
    <div className="App" style={{ marginTop: 10 }}>
      <Gantt
        start={new Date(2023, 0, 1).getTime()}
        end={new Date(2023, 2, 3).getTime()}
      >
        <XAxis height={35}>
          {(ticks: any) => {
            return ticks.map((x: Date, i: number) => (
              <Tick key={i} start={x} alignmentBaseline="hanging"></Tick>
            ));
          }}
        </XAxis>
        <Plot style={{ border: "1px solid #ccc" }}>
          <Group id="1">
            <FixedRows>
              <Row>
                <Activity
                  start={new Date(2023, 0, 1).getTime()}
                  end={new Date(2023, 0, 6).getTime()}
                  fill="lightblue"
                  stroke="#000"
                >
                  {(options) => {
                    return <Text {...options}>A</Text>;
                  }}
                </Activity>
                <Activity
                  start={new Date(2023, 0, 6, 2).getTime()}
                  end={new Date(2023, 0, 8).getTime()}
                  fill="orange"
                  stroke="#000"
                >
                  {(options) => {
                    return <Text {...options}>Long Text Long Long</Text>;
                  }}
                </Activity>
              </Row>
              <Row>
                <Activity
                  start={new Date(2023, 0, 1).getTime()}
                  end={new Date(2023, 0, 6).getTime()}
                  fill="lightblue"
                  stroke="#000"
                  height={40}
                >
                  {(options) => {
                    return <Text {...options}>A</Text>;
                  }}
                </Activity>
              </Row>
            </FixedRows>
          </Group>
        </Plot>
      </Gantt>
    </div>
  );
}

export default App;
