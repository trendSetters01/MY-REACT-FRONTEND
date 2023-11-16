import { DB, DataTypes } from "../config/index.js";

// User model
const User = DB.define("User", {
  userId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export { User };
