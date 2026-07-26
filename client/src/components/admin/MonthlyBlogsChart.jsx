import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthlyBlogsChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(
      (item) => `${monthsNames[item._id.month - 1]} ${item._id.year}`,
    ),
    datasets: [
      {
        label: "Blogs",
        data: data.map((item) => item.count),
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Monthly Blogs</h2>

      {data.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-gray-500">
          No monthly data available.
        </div>
      ) : (
        <div className="h-72">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MonthlyBlogsChart;
