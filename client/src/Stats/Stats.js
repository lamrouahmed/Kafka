import axios from "axios";
import { useState } from "react";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./stats.module.scss"

ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
  labels: ["No Data"],
  datasets: [
    {
      label: "# of clicks",
      data: [1],
      backgroundColor: ["#3d3e40cc"],
      borderColor: ["#FFF"],
      borderWidth: 2,
    },
  ],
};



const colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const Stats = () => {
    
    const [chartData, setChartData] = useState(data);

    setInterval(async () => {
      let stats = await axios.get("http://localhost:3003/getstats");
      let res = await stats.data;


      let deez = {};

      if (data.labels.join("") === "No Data") {
        data.labels = [];
        data.datasets[0].backgroundColor = [];
      }

      res.forEach(d => { 
          if (isNaN(deez[d.country.name]) || deez[d.country.name] === undefined ) deez[d.country.name] = 0;
          deez[d.country.name]++;
      })

      data.labels = Object.keys(deez);
      data.datasets[0].data = Object.values(deez);
      data.datasets[0].backgroundColor = Array(data.labels.length).fill().map((e, i) => colorArray[i]);
      //console.log(data);
      setChartData(data);
    }, 3000);

  return (
    <div className={styles.chart}>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "white",
              }
            }
          }
        }}
        width={"30%"}
        height={"30%"}
      />
    </div>
  );
}




export default Stats;
