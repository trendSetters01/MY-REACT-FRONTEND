// import { EmbedBuilder } from "discord.js";

function createVerifyV2NFTSuccessEmbed(address) {
  // return new EmbedBuilder()
  //   .setColor(5763719) // This color represents a shade of green;
  //   .setTitle("NFT verified Successfully")
  //   .setDescription(
  //     `Congratulations! Your Phantom NFT has been successfully verified\n\nYou're now eligible to claim exclusive rewards! To proceed, please use the following command:\n\`/chooserewardwallet\`\n\nThis will initiate the process for you to setting up your reward wallet for your Byte city playable NFT. Thank you for your participation!`
  //   );
}

function createVerifyV1NFTSuccessEmbed(address) {
  // return new EmbedBuilder()
  //   .setColor(5763719) // This color represents a shade of green;
  //   .setTitle("NFT verified Successfully")
  //   .setDescription(
  //     `Congratulations! Your Phantom NFT has been successfully verified`
  //   );
}

function createVerifyNFTFailureEmbed(reason) {
  // return new EmbedBuilder()
  //   .setColor(16711680) // This color represents a shade of red;
  //   .setTitle("NFT verification Failed")
  //   .setDescription(
  //     `Unfortunately, we encountered an issue while processing your request.${
  //        "\n\n Ensure your address has a phantom nft"
  //     } ${
  //       reason ? reason : ""
  //     }\n\nPlease try again or contact us on the questions channel for assistance.`
  //   );
}

export {
  createVerifyV2NFTSuccessEmbed,
  createVerifyV1NFTSuccessEmbed,
  createVerifyNFTFailureEmbed,
};
