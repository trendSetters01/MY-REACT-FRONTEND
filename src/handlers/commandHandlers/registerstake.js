import { User, AddressSet, StakingSet } from "../../db/models/index.js";
import { DB } from "../../db/config/index.js";

import { verifySpecificPhntmNFT } from "../../algorand/verifyNFT.js";
import { userAddressRegistration } from "../../utils/index.js";

async function handleRegisterStake({ address="", assetId="", durationType="", duration=10000, userId=0 }) {
  // const address = "";
  // const assetId = "";
  // const durationType = "";
  // const duration = 10000;
  // const userId = 0;

  // Start a transaction
  const t = await DB.transaction();

  try {
    // Verify that the user owns the specified NFT
    const ownsNFT = await verifySpecificPhntmNFT(address, assetId);
    if (!ownsNFT) {
      throw new Error("You do not own the specified NFT.");
    }

    // Find or create a user and address set in your database
    const [user, userCreated] = await User.findOrCreate({
      where: { userId: userId },
      transaction: t,
    });

    const [addressSet, addressSetCreated] = await AddressSet.findOrCreate({
      where: { userId: user.id, algorandAddress: address },
      defaults: { algorandAddress: address },
      transaction: t,
    });

    // Check if a staking set already exists for the given asset ID
    let stakingSet = await StakingSet.findOne({
      where: { userId: user.id, assetId: assetId },
      transaction: t,
    });

    if (stakingSet) {
      // Update existing staking set
      stakingSet.duration = duration;
      stakingSet.durationType = durationType;
      stakingSet.status = "active"; // Set status to 'active' for existing staking set
      await stakingSet.save({ transaction: t });
    } else {
      // Create a new staking set with 'active' status
      stakingSet = await StakingSet.create(
        {
          userId: user.id,
          assetId: assetId,
          duration: duration,
          durationType: durationType,
          status: "active",
        },
        { transaction: t }
      );
    }

    //   // Commit the transaction
    await t.commit();

    // Log the address
    await userAddressRegistration(userId, address);
  } catch (error) {
    console.error("Error in staking registration:", error);

    // Roll back the transaction
    await t.rollback();
  }
}

export default handleRegisterStake;
