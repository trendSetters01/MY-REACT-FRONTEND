import React from "react";

const Roadmap = () => {
  const milestones = [
    {
      title: "Phantom Pals Nft Launch",
      date: "N/A",
      description: "Launch of Phantom Pals, introduction of basic features.",
      status: "completed", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "NFT Web Platform Launch Phase",
      date: "N/A",
      description: "Alpha launch of the platform",
      status: "completed", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "NFT Catalogue",
      date: "N/A",
      description: "Catalogue of Phantom Pals NFT's for sale.",
      status: "in-progress", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "View Account Information",
      date: "N/A",
      description: "Introduction to Web3 Wallets and Account Information.",
      status: "in-progress", // other statuses could be "in-progress", "upcoming"
    },
    {
      title: "Phantom Pals NFT Staking",
      date: "N/A",
      description: "Phantom Pals NFT Staking to be introduced.",
      status: "completed",
    },
    {
      title: "Introduction of Phantom Pals Council System",
      date: "TBA",
      description: "Phantom Pals Council System to be introduced.",
      status: "in-future",
    },
    {
      title: "Introduction of Phantom Pals Economy",
      date: "N/A",
      description: "First Phantom token utility to be introduced.",
      status: "completed",
    },
    // Add more milestones as needed
  ];
  const statusColors = {
    completed: "from-green-500 to-green-800",
    "in-progress": "from-yellow-500 to-yellow-800",
    "in-future": "from-red-500 to-red-800",
    completed: "from-green-500 to-green-800",
  };

  return (
    <div className="my-10 px-4 py-8 text-white bg-gradient-to-r from-black to-gray-500">
      <h2 className="text-3xl font-bold text-center mb-8">Roadmap</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 bg-gradient-to-br ${
              statusColors[milestone.status]
            }`}
          >
            <div
              className="p-6"
              style={{
                fontFamily: "Bahnschrift",
                fontWeight: "bold",
                fontSize: "large",
              }}
            >
              <h3 className="font-semibold text-xl mb-2">{milestone.title}</h3>
              <p className="text-sm mb-4">{milestone.date}</p>
              <p className="mb-4">{milestone.description}</p>
            </div>
            <div className="px-6 py-2 bg-red bg-opacity-25">
              <span className="text-xs font-bold py-1 px-2 rounded bg-white bg-opacity-50">
                {milestone.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
