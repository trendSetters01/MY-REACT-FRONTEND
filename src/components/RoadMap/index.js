import React from "react";

const Roadmap = () => {
  const milestones = [
    {
      title: "Phantom Pals Nft Launch",
      date: "Q2 2023",
      description: "Launch of Phantom Pals, introduction of basic features.",
      status: "completed", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "NFT Web Platform Launch Phase",
      date: "Q3 2023",
      description: "Alpha launch of the platform",
      status: "completed", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "Phantom V2 Nft Introduction",
      date: "Q4 2023",
      description: "Introduction to first  few Phantom V2 NFT's.",
      status: "in-progress", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "View Account Information",
      date: "Q4 2023",
      description: "Introduction to Web3 Wallets and Account Information.",
      status: "in-progress", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "NFT Catalogue",
      date: "Q4 2023",
      description: "Catalogue of Phantom NFT's for sale.",
      status: "in-progress",
    },
    {
      title: "Register Your Address",
      date: "Q4 2023",
      description:
        "Register your address to participate in Phantom activities.",
      status: "in-progress", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "NFT Staking",
      date: "Q4 2023",
      description: "NFT Staking to be introduced.",
      status: "in-future",
    },
    {
      title: "Introduction of Phantom Council System",
      date: "Q1 2024",
      description: "Phantom Council System to be introduced.",
      status: "in-future",
    },
    {
      title: "Introduction of Phantom Economy",
      date: "Q1 2024",
      description: "First Phantom token utility to be introduced.",
      status: "in-future",
    },
    // Add more milestones as needed
  ];
  return (
    <div className="my-10 p-4 text-black">
      <h2 className="text-white text-2xl font-bold text-center mb-6">
        Roadmap
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg shadow-md"
          >
            <h3 className="font-semibold text-lg">{milestone.title}</h3>
            <p className="text-sm text-black">{milestone.date}</p>
            <p>{milestone.description}</p>
            <span
              className={`text-xs font-bold py-1 px-2 rounded ${
                milestone.status === "completed"
                  ? "bg-green-200 text-green-800"
                  : milestone.status === "in-progress"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              {milestone.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
