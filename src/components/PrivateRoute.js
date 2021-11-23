import React from "react";
import Loading from "./Loading";

const PrivateRoute = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    </div>
  );
};

export default PrivateRoute;
