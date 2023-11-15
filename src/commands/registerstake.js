export default {
  name: "registerstake",
  description: "Register your NFT for staking",
  options: [
    {
      name: "address",
      type: 3, // String type
      description: "Your Algorand address",
      required: true,
    },
    {
      name: "assetid",
      type: 3, // String type
      description: "The Asset ID of your NFT",
      required: true,
    },
    {
      name: "durationtype",
      type: 3, // String type
      description: "The unit of duration (e.g., days, weeks, months)",
      required: true,
      choices: [
        {
          name: "days",
          value: "days",
        },
        {
          name: "weeks",
          value: "weeks",
        },
        {
          name: "months",
          value: "months",
        },
      ],
    },
    {
      name: "duration",
      type: 4, // Integer type
      description: "Staking duration",
      required: true,
    },
  ],
};
