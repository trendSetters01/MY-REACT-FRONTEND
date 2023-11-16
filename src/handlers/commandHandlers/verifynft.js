import { setuserNFTChoice } from "../../state/index.js";
import { handleNFTVerification } from "../../utils/handleNFTVerification.js";

const PHANTOM_ROLE = process.env["PHANTOM_ROLE"];

async function handleVerifynft({ userId = 0, userChoice = "" }) {
  // const userId = 0;
  // const userChoice = "";

  setuserNFTChoice(userId, userChoice);

  const { verifynftEmbed, isValid } = await handleNFTVerification({
    userId,
    userChoice,
  });

  if (isValid) {
    try {
    } catch (error) {
      console.log("attempted role add failed", error);
    }
  }

  try {
  } catch (error) {
    console.log("embed", verifynftEmbed, error);
  }
}

export { handleVerifynft };
