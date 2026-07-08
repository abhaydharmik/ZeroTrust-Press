import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="border rounded-2xl p-6 bg-white">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
  );
};

export default StatsCard;
