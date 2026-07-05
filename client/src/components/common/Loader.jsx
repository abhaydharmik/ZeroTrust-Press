import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
    </div>
  );
};

export default Loader;
