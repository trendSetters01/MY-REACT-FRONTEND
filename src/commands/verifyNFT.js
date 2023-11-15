export default {
  name: "verifynft",
  description: "Verify Your Phantom NFT",
  options: [
    {
      name: "choice",
      type: 3,
      description: "Your choice for Phantom Version",
      required: true,
      choices: [
        { name: "V1", value: "versionOne" },
        // { name: "V2", value: "versionTwo" },
      ],
    }
  ],
};
