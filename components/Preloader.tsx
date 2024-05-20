import React from "react";
import { Loader } from "@mantine/core";

const Preloader = () => {
  return (
    <div className="flex justify-center items-center h-28">
      <Loader color="rgba(224, 224, 224, 1)" />
    </div>
  );
};

export default Preloader;
