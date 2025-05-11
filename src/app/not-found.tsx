import Image from "next/image";
import React from "react";
import "@/styles/main.scss";

const NotFound: React.FC = () => {
  return (
    <div className="h-screen w-full bg-grey-50 ">
      <div className="flex items-center justify-center h-full max-w-[140rem] mx-auto">
        <div className="flex items-center justify-center gap-8">
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
          <div className="w-full flex items-center justify-center ">
            <Image
              src={"/assets/images/not-found.jpg"}
              alt=""
              width={646}
              height={200}
              className="h-[600px] block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
