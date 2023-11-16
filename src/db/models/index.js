import { User } from "./user.js";
import { AddressSet } from "./addressSet.js";
import { StakingSet } from "./stakingSet.js";

// Define the relationships
User.hasMany(AddressSet, { foreignKey: "userId" }); // One User has many AddressSets
AddressSet.belongsTo(User, { foreignKey: "userId" }); // Each AddressSet is related to one User

User.hasMany(StakingSet, { foreignKey: "userId" }); // One User has many StakingSets
StakingSet.belongsTo(User, { foreignKey: "userId" }); // Each StakingSet is related to one User

export { User, AddressSet, StakingSet };
