// src/components/Loader.tsx
import React from "react";
import { Circles } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Circles
        height="80"
        width="80"
        color="#FFEDDF"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
