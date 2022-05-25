import React from "react";
import { Chart } from "react-google-charts";

const PlayerChart = (props) => {
  let data = [
    ["Goals", "Assists"],
    [{ goals }, { assists }],
  ];
  return (
    <div>
      <Chart
        chartType="LineChart"
        data={data}
        options={{}}
        graph_id="LineChart"
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
};

export default PlayerChart;
