import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HistoryChartProps {
  averageWeight: {
    date: any;
    average: number;
    reps: number
  }[];
}

const HistoryChart: FC<HistoryChartProps> = ({ averageWeight }) => {
  const chartData = {
    labels: averageWeight.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Ciężar',
        data: averageWeight.map((item) => item.average),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Powtórzenia',
        data: averageWeight.map((item) => item.reps),
        fill: false,
        borderColor: 'rgba(75, 192, 122, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default HistoryChart;