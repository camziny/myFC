import React from "react"
import Chart from "react-google-charts"

const BarChart = ({ selectedPlayer, selectedStats, isSelected }) => {
    const [selected, setSelected] = useState(false);
    const toggle = () => {
      setSelected(!selected);
      return (
        <div>
            <div className={`card-section ${isSelected ? "selected" : ""}`}></div>
          <button
            onClick={() => {
              toggle();
              handleColumnChart(id, selectedPlayer, selectedStats);
            }}
            className={"toggle-button" + (selected ? "toggle-selected" : "")}
          >
            {selected ? "Player Selected" : "Show Column Chart"}
          </button>
        </div>
      );
    };
  };

export default BarChart