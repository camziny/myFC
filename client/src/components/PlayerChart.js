import React from "react";
import { Bar } from "react-google-charts";

const PlayerChart = (props) => {
  const PlayerTile = ({ id, goals, assists }) => {
    return (
      <div className="playerChart">
        <Link to={`/players/${id}`}></Link>

        <Bar
          data={{
            labels: ["Goals", "Assists"],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  };
};

export default PlayerChart;
