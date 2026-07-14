import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl border p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-4xl font-bold mt-3">{value}</h2>
        </div>

        <div className="w-14 h-14 rounded-xl bg-black text-white flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
