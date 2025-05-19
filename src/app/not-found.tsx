import Image from "next/image";
import React from "react";
import "@/styles/main.scss";

const NotFound: React.FC = () => {
  return (
    <div className="w-full bg-background flex items-center justify-center ">
      <div className="flex flex-col justify-center gap-4">
        <h1 className=" text-5xl font-extrabold">404.</h1>
        <h2 className=" text-2xl font-semibold text-grey-500">
          Sorry, page not found
        </h2>
        <p className=" text-2xl">
          The Page you are looking for does not exist or an other error
          occurred! That&apos;s all we know.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
