import { setuserNFTChoice } from "../../state/index.js";
import { handleNFTVerification } from "../../utils/handleNFTVerification.js";

const PHANTOM_ROLE = process.env["PHANTOM_ROLE"];

async function handleVerifynft(interaction) {
  await interaction.deferReply();

  const userId = interaction.user.id;
  const userChoice = interaction.options.getString("choice");

  setuserNFTChoice(userId, userChoice);

  const { verifynftEmbed, isValid } = await handleNFTVerification(
    interaction,
    userChoice
  );

  if (isValid) {
    try {
      await interaction.member.roles.add("1145372070553845770");
    } catch (error) {
      console.log("attempted role add failed", error);
    }
  }

  try {
    await interaction.followUp({ embeds: [verifynftEmbed] });
  } catch (error) {
    console.log("embed", verifynftEmbed, error);
  }
}

export { handleVerifynft };
