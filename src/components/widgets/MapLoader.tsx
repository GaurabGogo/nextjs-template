import React from "react";
import ReactLoading from "react-loading";

const MapLoader = () => {
  return (
    <div className="flex items-center justify-center mx-auto">
      <ReactLoading type="spin" color="#cc0100" height={50} width={50} />
    </div>
  );
};

export default MapLoader;
