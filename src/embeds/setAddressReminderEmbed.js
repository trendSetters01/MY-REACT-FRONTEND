// import { EmbedBuilder } from "discord.js";

async function sendSetAddressReminderEmbed(interaction) {
  // const pleaseSetAddressEmbed = new EmbedBuilder()
  //   .setColor(15277667)
  //   .setTitle('🚫 Algorand Address')
  //   .setDescription("Please set your Algorand address (on using the `/setaddress` command before verifying");
}

function sendSetAddressReminderForNFTVerificationEmbed(interaction) {
  // return new EmbedBuilder()
  //   .setColor(15277667)
  //   .setTitle("🚫 Algorand Address")
  //   .setDescription(
  //     "Please set your Algorand address ( using the `/setaddress` command before verifying )"
  //   );
}

export {
  sendSetAddressReminderEmbed,
  sendSetAddressReminderForNFTVerificationEmbed,
};
