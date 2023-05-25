import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HistoryChartProps {
  averageWeight: {
    date: any;
    average: number;
    reps: number;
  }[];
}

const HistoryChart: FC<HistoryChartProps> = ({ averageWeight }) => {
  const chartData = {
    labels: averageWeight.map((item) =>
      new Date(item.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Weight in kg",
        data: averageWeight.map((item) => item.average),
        fill: false,
        borderColor: "black",
        tension: 0.5,
      },
      {
        label: "Reps",
        data: averageWeight.map((item) => item.reps),
        fill: false,
        borderColor: "green",
        tension: 0.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart of weight and reps by training day",
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default HistoryChart;
