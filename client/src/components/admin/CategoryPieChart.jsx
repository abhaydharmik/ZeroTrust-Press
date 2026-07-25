import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.total),
        backgroundColor: data.map((item) => item.color || "#6B7280"),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Blogs by Category</h2>

      {data.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-gray-500">
          No category data available.
        </div>
      ) : (
        <div className="mx-auto h-72 max-w-sm">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
