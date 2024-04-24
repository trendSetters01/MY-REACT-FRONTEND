import React from "react";
import Stats from "../Stats/index.js";

const Dashboard = ({ accountAddress }) => {
  return (
    <div
      style={{
        wordWrap: "break-word",
        maxHeight: "100vh",
        minHeight: "71vh",
        maxWidth: "100vw",
        minWidth: "80vw",
      }}
      className="flex flex-col items-center justify-center text-white"
    >
      <div className="grid grid-cols-12 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 lg:p-10">
        <Stats accountAddress={accountAddress} />
      </div>
    </div>
  );
};

export default Dashboard;
