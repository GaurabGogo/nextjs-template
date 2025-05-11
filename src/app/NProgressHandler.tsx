"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgressHandler = () => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#c71f37"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NProgressHandler;
