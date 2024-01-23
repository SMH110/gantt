import { Gantt, Tick, XAxis } from "./containers";
import { Row } from "./containers/row";
import Plot from "./containers/plot";
import Group from "./containers/group";
import { FixedRows } from "./containers/fixed-rows";
import Activity from "./containers/activity";
import { useLayoutEffect, useRef } from "react";
import YAxis from "./containers/y-axis";

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
        <div>
          <YAxis>
            {(items, options) => {
              return items.map((item, index) => (
                <g key={item.id} {...options.getRectProps(index)}>
                  <text
                    alignmentBaseline="hanging"
                    textAnchor="start"
                    x={0}
                    y={item.height / 2}
                  >
                    {item.id}
                  </text>
                </g>
              ));
            }}
          </YAxis>
          <div>
            <Plot style={{ border: "1px solid #ccc" }}>
              <Group id="parent">
                <FixedRows>
                  <Row>
                    <Activity
                      start={new Date(2023, 0, 1).getTime()}
                      end={new Date(2023, 0, 6).getTime()}
                      fill="#F198AF"
                      stroke="#000"
                      strokeOpacity={0.3}
                    >
                      {(options) => {
                        return <Text {...options}>A - Row 1</Text>;
                      }}
                    </Activity>
                    <Activity
                      start={new Date(2023, 0, 6, 2).getTime()}
                      end={new Date(2023, 0, 8).getTime()}
                      fill="#EBB2D6"
                      stroke="#000"
                      strokeOpacity={0.3}
                    >
                      {(options) => {
                        return <Text {...options}>A - Row 1 </Text>;
                      }}
                    </Activity>
                  </Row>
                  <Row>
                    <Activity
                      start={new Date(2023, 0, 1).getTime()}
                      end={new Date(2023, 0, 6).getTime()}
                      fill="#9F81CD"
                      stroke="#000"
                      height={50}
                      strokeOpacity={0.3}
                    >
                      {(options) => {
                        return <Text {...options}>A - Row 2 </Text>;
                      }}
                    </Activity>
                  </Row>
                </FixedRows>
                <Group id="child" index={0}>
                  <FixedRows>
                    <Row>
                      <Activity
                        start={new Date(2023, 0, 1).getTime()}
                        end={new Date(2023, 0, 6).getTime()}
                        fill="#FBD1D3"
                        stroke="#000"
                        strokeOpacity={0.3}
                      >
                        {(options) => {
                          return <Text {...options}>A - Child 1- Row 1</Text>;
                        }}
                      </Activity>
                    </Row>
                  </FixedRows>
                </Group>
                <Group id="child2" index={1}>
                  <FixedRows>
                    <Row>
                      <Activity
                        start={new Date(2023, 0, 1).getTime()}
                        end={new Date(2023, 0, 6).getTime()}
                        fill="#FBD1D3"
                        stroke="#000"
                        strokeOpacity={0.3}
                      >
                        {(options) => {
                          return <Text {...options}>A - Child 2- Row 1</Text>;
                        }}
                      </Activity>
                    </Row>
                  </FixedRows>
                </Group>
              </Group>
              <Group id="parent2">
                <FixedRows>
                  <Row>
                    <Activity
                      start={new Date(2023, 0, 1).getTime()}
                      end={new Date(2023, 0, 6).getTime()}
                      fill="#F198AF"
                      stroke="#000"
                      strokeOpacity={0.3}
                    >
                      {(options) => {
                        return <Text {...options}>Parent 2</Text>;
                      }}
                    </Activity>
                  </Row>
                </FixedRows>
                <Group id="parent2 - child 1" index={1}>
                  <FixedRows>
                    <Row>
                      <Activity
                        start={new Date(2023, 0, 1).getTime()}
                        end={new Date(2023, 0, 6).getTime()}
                        fill="#F198AF"
                        stroke="#000"
                        strokeOpacity={0.3}
                      >
                        {(options) => {
                          return <Text {...options}>Parent 2 - child</Text>;
                        }}
                      </Activity>
                    </Row>
                  </FixedRows>
                </Group>
              </Group>
            </Plot>
          </div>
        </div>
      </Gantt>
    </div>
  );
}

export default App;
