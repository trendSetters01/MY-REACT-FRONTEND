

function createSetAddressSuccessEmbed(address) {
  // return (
  //   new EmbedBuilder()
  //     .setColor(5763719) // This color represents a shade of green;
  //     .setTitle("Algorand Address Registered Successfully")
  //     .setDescription(
  //       `Your Algorand address has been successfully registered as:\n\`${address}\`\n\n Please use the following command:\n\`/verifynft\`\n\nThis will initiate the process for you to verify your Phantom NFT. Thank you for your participation!`
  //     )
  // );
}

function createSetAddressFailureEmbed(reason) {
  // return new EmbedBuilder()
  //   .setColor(16711680) // This color represents a shade of red;
  //   .setTitle("Operation Failed")
  //   .setDescription(
  //     `Unfortunately, we encountered an issue while processing your request. Here's what happened:\n\n**Reason:** ${reason}\n\nPlease try again or contact us on the questions channel for assistance.`
  //   );
}

export { createSetAddressSuccessEmbed, createSetAddressFailureEmbed };
