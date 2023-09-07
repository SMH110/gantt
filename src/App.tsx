import { Gantt, Tick, XAxis } from "./containers";
import { Row } from "./containers/row";
import { Activity } from "./containers/activity";
import Plot from "./containers/plot";
import Group from "./containers/group";
import { FixedRows } from "./containers/fixed-rows";

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
                  {(options) => (
                    <text
                      x={options.width / 2}
                      y={options.height / 2}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fill="red"
                    >
                      AA
                    </text>
                  )}
                </Activity>
                <Activity
                  start={new Date(2023, 0, 6, 2).getTime()}
                  end={new Date(2023, 0, 8).getTime()}
                  fill="orange"
                  stroke="#000"
                >
                  {(options: any) => (
                    <text
                      x={options.width / 2 + options.startTime}
                      y={options.height / 2}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fill="blue"
                    >
                      B Activity
                    </text>
                  )}
                </Activity>
              </Row>
              <Row>
                <Activity
                  start={new Date(2023, 0, 1).getTime()}
                  end={new Date(2023, 0, 6).getTime()}
                  fill="lightblue"
                  stroke="#000"
                >
                  {(options: any) => (
                    <text
                      x={options.width / 2 + options.startTime}
                      y={options.height / 2}
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      fill="blue"
                    >
                      C Activity
                    </text>
                  )}
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
