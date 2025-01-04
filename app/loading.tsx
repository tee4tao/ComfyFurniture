import React from "react";

const loading = () => {
  return (
    <div className="h-screen flex flex-center">
      <div className="loading">
        <div className="bounceball"></div>
        <div className="text">NOW LOADING</div>
      </div>
    </div>
  );
};

export default loading;
