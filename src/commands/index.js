
import setAddress from './setAddress.js';
import invite from './invite.js';
import stepsAfterMint from './stepsAfterMint.js';
import howitworks from './howitworks.js';
import verifynft from './verifyNFT.js'
import registerstake from './registerStake.js'
// import "dotenv/config";

const commands = [
  setAddress,
  // invite,
  // stepsAfterMint,
  // howitworks,
  verifynft,
  // registerstake
];

const rest = new REST({
  version: "10",
}).setToken(token);

(async () => {
  try {
    console.log("Registering global slash commands");
    await rest.put(Routes.applicationCommands(clientID), {
      body: commands,
    });
    console.log("Slash commands were registered succesfully");
  } catch (error) {
    console.log("Error registering slash commands");
    console.log(`${error}`);
  }
})();

