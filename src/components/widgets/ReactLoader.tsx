import React from "react";
import ReactLoading from "react-loading";

const ReactLoader = () => {
  return (
    <ReactLoading
      type="spin"
      color="#cc0100"
      height={50}
      width={50}
      className="mx-auto min-h-[24rem] flex items-center justify-center"
    />
  );
};

export default ReactLoader;
