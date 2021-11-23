import React from "react";
import { CircleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircleLoader loading size={10} />
    </div>
  );
};

export default Loading;
